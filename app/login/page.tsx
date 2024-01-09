import LoginForm from "../Componenets/login"
import Link from "next/link"

const Login=()=>{
    return(
        < div className="flex justify-center flex-col items-center h-screen w-full">
        <LoginForm/>
        <Link href={'/register'}>
            <p className="mt-6 text-blue-600 hover:underline cursor-pointer">
            Create an Account
            </p>
        </Link>
        </div>
    )
}
export default Login