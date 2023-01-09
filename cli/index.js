#! /usr/bin/env node

const yargs = require("yargs");
const { PrismaClient } = require("@prisma/client");
let prisma = new PrismaClient();

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
    .command("users", "List users", () => {}, async () => {
        console.log("Fetching users...")
        let time = Date.now();
        let users = await prisma.user.findMany();
        let timeEnd = Date.now();
        console.table(users, ["id", "email", "username", "firstName", "lastName", "language"])
        console.log("Fetched " + users.length + " users in " + `${timeEnd - time} milliseconds`)
    })
    .help().argv
