"use client";
import { useEffect, useState } from "react";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import TextInput from "../../../components/TextInput";
import { Login } from "../../../lib/api/authentication"
import { useRouter } from 'next/navigation';




export default function LoginPage() {
    const [error, setError] = useState(null);
    const [loggingIn, setLoggingIn] = useState(false);
    const router = useRouter()
    useEffect(() => {
        document.onkeydown = (ev) => {
            if (ev.key === "Enter") doLogin();
        }
    }, [])
    async function doLogin() {
        setLoggingIn(true)
        let email = (document.getElementById("email") as any).value;
        let results;
        try {
            if (email == null || document.getElementById("password") == null) return;
            results = await Login(email, (document.getElementById("password") as any).value)
        } catch (error) {
            setError(error as any)
            setLoggingIn(false);
            return;
        }
        document.cookie += `authorization=${results.authorization};path=/;max-age=604800;`;
        router.push("/")
        setLoggingIn(false);
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
                        <Button loading={loggingIn} onClick={() => doLogin()} className="w-full">Login</Button>
                    </div>
                </form>
            </div>
        </>
    )
}