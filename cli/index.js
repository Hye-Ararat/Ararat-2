#! /usr/bin/env node

const yargs = require("yargs");
const { PrismaClient } = require("@prisma/client");
let prisma = new PrismaClient();
const prompts = require("prompts");
const { execSync, spawn, exec } = require("child_process");
const axios = require("axios");
const { mkdirSync, rmSync, cpSync, rmdirSync, writeFileSync } = require("fs");
yargs.scriptName("ararat").usage("$0 <cmd> [args]")
    .command("user:create [firstName] [lastName] [email] [username] [password] [language]", "Create User", (yargs) => {
        yargs.positional("firstName", {
            type: "string",
            describe: "First name of user"
        }).demandOption("firstName")
        yargs.positional("lastName", {
            type: "string",
            describe: "Last name of user"
        }).demandOption("lastName")
        yargs.positional("email", {
            type: "string",
            describe: "Email of user"
        }).demandOption("email")
        yargs.positional("username", {
            type: "string",
            describe: "Username of user"
        }).demandOption("username")
        yargs.positional("password", {
            type: "string",
            describe: "Password of user"
        }).demandOption("password")
        yargs.positional("language", {
            type: "string",
            default: "english",
            describe: "Language of user"
        })
    }, async (argv) => {
        console.log("Creating User...");
        const bcrypt = require("bcryptjs");
        let genSalt = bcrypt.genSaltSync;
        let hash = bcrypt.hashSync;
        let salt;
        let hashedPassword;
        try {
            salt = genSalt(10);
            hashedPassword = hash(argv.password, salt)
        } catch (error) {

        }
        let user = await prisma.user.create({
            data: {
                firstName: argv.firstName,
                lastName: argv.lastName,
                email: argv.email,
                language: argv.language,
                username: argv.username,
                password: hashedPassword

            }
        })
        console.log("User Created!")
    }
    )
    .command("user:delete [email]", "Deletes a user", (yargs) => {
        yargs.positional("email", {
            type: "string",
            describe: "Email of the user you want to delete"
        }).demandOption("email")
    }, async (argv) => {
        console.log("Deleting User...")
        let deleted = await prisma.user.delete({
            where: {
                email: argv.email
            }
        })
        console.log("User Deleted!");
    })
    .command("users", "List users", () => { }, async () => {
        console.log("Fetching users...")
        let time = Date.now();
        let users = await prisma.user.findMany();
        let timeEnd = Date.now();
        console.table(users, ["id", "email", "username", "firstName", "lastName", "language"])
        console.log("Fetched " + users.length + " users in " + `${timeEnd - time} milliseconds`)
    })
    .command("setupnode", "Sets up node (internal command)", () => { }, async () => {
        console.log("Installing Dependency: caddy...");
        execSync("apt-get install -y debian-keyring debian-archive-keyring apt-transport-https");
        execSync("curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --batch --yes --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg");
        execSync("curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list");
        execSync("sudo apt-get update -y")
        execSync("sudo apt-get install caddy -y")
        console.log("✅ Dependency caddy successfully installed")
        let useDomain = await prompts({
            type: "confirm",
            name: "value",
            message: "Is this Ararat install going to use a domain? If so, please point your domain to this install before proceeding."
        });
        let address = await prompts({
            type: "text",
            name: "value",
            message: `Enter the ${useDomain.value ? "domain" : "ip address"} of this node ${useDomain.value ? "(ex: us-dal-1.hye.gg)" : "(ex: 8.8.8.8)"}`
        });
        let port = await prompts({
            type: "number",
            name: "value",
            message: `Enter the port you would like this node to listen on. (443 is reccomended)`
        })
        console.log("Setting up web server...")
        let caddyConfig = {
            "apps": {
              "http": {
                "servers": {
                  "ararat": {
                    "listen": [`:${port.value}`],
                    "routes": [
                      {
                        "match": [
                          {
                            "host": [
                              address.value
                            ]
                          }
                        ],
                        "handle": [
                          {
                           
                                    "handler": "reverse_proxy",
                                    "upstreams": [
                                      {
                                        "dial": "localhost:3000"
                                      }
                                    ]
                               
                          }
                        ]
                      }
                    ]
                  }
                }
              },
            }
          }
        let newConf = await axios.post("http://localhost:2019/load", caddyConfig)
        console.log("✅ Web Server Setup Successful")
        console.log("Installing dependency: cockroachdb")
        try {
            mkdirSync("./cockroach")
        } catch {
            
        }
        execSync("curl https://binaries.cockroachdb.com/cockroach-v22.2.2.linux-amd64.tgz -o cockroach/cockroach.tgz")
        execSync("tar -xf cockroach.tgz", {cwd: "./cockroach"})
        try {
            rmSync("/usr/local/lib/cockroach");
            execSync("mkdir -p /usr/local/lib/cockroach")
            cpSync("./cockroach/cockroach-v22.2.2.linux-amd64/lib/libgeos.so /usr/local/lib/cockroach/libgeos.so")
            cpSync("./cockroach/cockroach-v22.2.2.linux-amd64/lib/libgeos_c.so /usr/local/lib/cockroach/libgeos_c.so")
        } catch {
            
        }
        rmSync("./cockroach", {recursive: true, force: true})
        console.log("✅ Dependency cockroachdb successfully installed")
        try {
            rmSync("./ca", {recursive: true});
            rmSync("./certs", {recursive: true});
        } catch (error) {
            
        }
        try {
            mkdirSync("./certs");
            mkdirSync("./ca")   
        } catch {
            
        }

        console.log("Generating Ararat CA");
        execSync(`cockroach cert create-ca --certs-dir=certs --ca-key=ca/ca.key`)
        console.log("✅ CA Generated");
        let publicIp = await prompts({
            type: "text",
            message: "What is this node's accessible IP address?",
            name: "value"
        });
        console.log("Generating Certificates...");
        let hosts = "localhost 127.0.0.1";
        hosts += " " + address.value;
        if (publicIp.value != address.value) hosts+=` ${publicIp.value}`
        execSync(`cockroach cert create-node ${hosts} --certs-dir=certs --ca-key=ca/ca.key`);
        execSync(`cockroach cert create-client root --certs-dir=certs --ca-key=ca/ca.key`);
        console.log("✅ Certificates Generated");
        console.log("Preparing Database for Cluster...")
        try {
            rmSync("/var/lib/cockroach", {recursive: true})
        } catch {
            
        }
        execSync("mkdir /var/lib/cockroach");
        execSync("mv certs /var/lib/cockroach");
        try {
            execSync("useradd cockroach");
        } catch {
            
        }
        execSync("chown -R cockroach /var/lib/cockroach")
        let cockroachSystemd = `
[Unit]
Description=Cockroach Database cluster node
Requires=network.target
[Service]
Type=notify
WorkingDirectory=/var/lib/cockroach
ExecStart=/usr/local/bin/cockroach start --certs-dir=certs --advertise-addr=${address.value} --join=${address.value} --cache=.25 --max-sql-memory=.25
TimeoutStopSec=300
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=cockroach
User=cockroach
[Install]
WantedBy=default.target
`
    writeFileSync("/etc/systemd/system/cockroachdb.service", cockroachSystemd);
    console.log("Initializing Cluster...")
    execSync("systemctl daemon-reload");
    try {
        execSync("systemctl stop cockroachdb")
    } catch {
        
    }
    execSync("systemctl start cockroachdb");
    execSync(`cockroach init --certs-dir=/var/lib/cockroach/certs --host=${address.value}`)
    execSync("systemctl enable cockroachdb");
    console.log("✅ Cluster Initialized");
    let dbUsername = await prompts({
        type: "text",
        name: "value",
        message: "What would you like your database account's username to be?"
    })
    let dbPassword = await prompts({
        type: "password",
        name: "value",
        message: "What should the password to this database account be?"
    })
    //for tomorrow
    //let cockroachSql = execSync(`cockroach sql --certs-dir=/var/lib/cockroach/certs --host=development.hye.gg --execute"CREATE USER ${dbUsername.value} WITH PASSWORD '${dbPassword.value}'"`);
    console.log("You're node has been setup! You can now navigate to it using the URL you specified earlier in your web browser.")
    }
    )
    .help().argv
