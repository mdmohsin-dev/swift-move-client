import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const GoogleLogin = () => {
    const { googleSignIn } = useAuth()
    const axiosSecure = useAxiosSecure()

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {

                const userInfo = {
                    dsplayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL
                }

                axiosSecure.post("/users", userInfo)
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