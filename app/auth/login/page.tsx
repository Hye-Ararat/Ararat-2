"use client";
import { useState } from "react";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import TextInput from "../../../components/TextInput";
import { Login } from "../../../lib/api/authentication"





export default function LoginPage() {
    const [error, setError] = useState(null);
    function validateEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    return (false)
}
    async function doLogin() {
        let email = (document.getElementById("email") as any).value;
        if (!validateEmail(email)) return setError("Please enter a valid email address" as any);
        let results;
        try {
            if (email == null || document.getElementById("password") == null) return;
            results = await Login(email.value, (document.getElementById("password") as any).value)
        } catch (error) {
            setError(JSON.stringify(error) as any)
        }
        console.log(results)
    }
    if (document) {
        document.onkeydown = (ev) => {
            if (ev.key === "Enter") doLogin();
        }
    }
 
    return (
        <>
            <div className="container mx-auto">
                <img className="h-20 rounded-lg m-auto mt-64" src="https://cloud.hye.gg/logo.png" alt="image description" />

                <p className="text-sm dark:text-white text-center mt-4 mb-3.5">Welcome to Ararat! Please login with your account.</p>
                {error ?
                    <Alert color="warning" title="That didn't work." className="mx-auto w-1/4">
                        {error}
                    </Alert>
                    : ""}
                <form className="flex flex-col gap-4 w-1/4 mx-auto mt-30">
                    <div>
                        <TextInput id="email" type="email" placeholder="Email" required />
                    </div>
                    <div>
                        <TextInput id="password" type="password" placeholder="Password" required />
                    </div>
                    <div className="block">
                        <Button onClick={() => doLogin()} className="w-full">Login</Button>
                    </div>
                </form>
            </div>
        </>
    )
}