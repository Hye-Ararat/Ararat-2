import { PrismaClient } from "@prisma/client";
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    //@ts-ignore-error
    if (!global.prisma) {
        //@ts-ignore-error
        global.prisma = new PrismaClient();
    }
    //@ts-ignore-error
    prisma = global.prisma;
}


export default prisma;