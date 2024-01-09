import Link from "next/link"
import RegisterForm from "../Componenets/register"




const Register=()=>{
    return(
        <div className="flex w-full h-screen flex-col justify-center items-center">
        <RegisterForm/>
        <Link href={'/login'}>
            <p className="mt-6 text-blue-600 hover:underline cursor-pointer">
            Already a user
            </p>
        </Link>
        </div>
    )
}
export default Register