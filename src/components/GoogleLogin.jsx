import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const GoogleLogin = () => {
    const { googleSignIn } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const location = useLocation()

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL
                }

                axiosSecure.post("/users", userInfo)
                    .then(() => {
                        const destination = location.state || "/"
                        navigate(destination, { replace: true })
                    })
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