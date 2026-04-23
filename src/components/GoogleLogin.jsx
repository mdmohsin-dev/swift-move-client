import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";

const GoogleLogin = () => {
    const { googleSignIn } = useAuth()

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="flex justify-center pt-4">
            <button onClick={handleGoogleLogin}
                className="btn"><FcGoogle size={25}></FcGoogle>Google</button>
        </div>
    );
};

export default GoogleLogin;