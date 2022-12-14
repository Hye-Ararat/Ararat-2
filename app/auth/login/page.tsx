import Button from "../../../components/Button";
import Label from "../../../components/Label";
import TextInput from "../../../components/TextInput";

export default function Login() {
    return (
        <>
        <div className="container mx-auto">
        <img className="h-20 rounded-lg m-auto mt-64" src="https://cloud.hye.gg/logo.png" alt="image description" />
        <p className="text-sm dark:text-white text-center mt-4 mb-3.5">Welcome to Ararat! Please login with your account.</p>
<form className="flex flex-col gap-4 w-1/4 mx-auto mt-30">
    <div>
        <TextInput id="email" type="email" placeholder="Email" required />
    </div>
    <div>
        <TextInput id="password" type="password" placeholder="Password" required />
    </div>
    <div className="block">
    <Button className="w-full">Login</Button>
    </div>
    </form>
    </div>
        </>
    )
}