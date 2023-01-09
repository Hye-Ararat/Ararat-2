import { NextApiRequest, NextApiResponse } from "next";
import {genSalt, hash} from "bcryptjs";
import prisma from "../../../lib/prisma";
import { errorResponse, standardResponse } from "../../../lib/responses";
import { decode } from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {method} = req;
    if (method == "POST") {
        const {email, password, firstName, lastName, username, language} = req.body;
        if (!password || !email || !firstName || !lastName || !language || !username) return res.status(400).send(errorResponse(400, 400, "You must provide an email and password}"))
        let salt;
        let hashedPassword;
        try {
            salt = await genSalt(10)
            hashedPassword = await hash(password, salt);
        } catch (error) {
            return res.status(500).send(errorResponse(500, 500, "An Internal Server Error Has Occured"))
        }
        let user;
        try {
            user = await prisma.user.create({
                data: {
                    email,
                    firstName,
                    lastName,
                    language,
                    password: hashedPassword,
                    username
                }
            })
        } catch (error) {
            //to me in 5 years, i am sorry for doing such bad error handling, i have the deepest regrets. please fix.
            return res.status(500).send(errorResponse(500, 500, "An Internal Server Error Has Occured"))
        }
        //hello me in 15 years. I had no idea what i was doing when i wrote this, but it got rid of a wierd typescript error i didnt understand. prolly just me being stupid.
        let sentUser : {password?: string} = user;
        delete sentUser.password;
        return res.status(201).send(standardResponse(201, 201, sentUser))
  

        
    }
}