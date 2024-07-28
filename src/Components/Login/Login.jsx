import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../Fribase/Fribase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
    const [LoginError, setLoginError] = useState('');
    const [success, setsuccess] = useState('');
    const [showpassword, setshowpassword] = useState(false)
    const emailRef = useRef(null)
    const loginahandelar = e => {
        e.preventDefult();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        //    reset error
        setLoginError('');
        setsuccess('');
        //   create user 
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if (result.user.emailVerified) {
                    setsuccess('Login  Successfully')
                }
                else {
                    alert('chek your varification email')
                }

            })

            .cath(error => {
                console.error(error);
                setLoginError(error.message)
            })
    }
    const handelForgetPassword = () => {
        const email = emailRef.current.value;
        // e.preventDefault ();
        if (!email) {
            // jodi email na thake
            console.log('send reset password', emailRef.current.value)
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log('please wright valid email')
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('check your email')
            })
            .catch((error) => {
                console.log(error)

            });
    }


    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={loginahandelar}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    name="email"
                                    placeholder="email"
                                    ref={emailRef}
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                
                                    <input  type={showpassword ? "text" : "password"} name="password"
                                        placeholder="password"
                                        className="input input-bordered relative" required />
                              
                                <span className="absolute right-4  bottom-44 left-80" onClick={() => setshowpassword(!showpassword)}>{showpassword ? <FaEye /> : <FaEyeSlash />}</span>
                                <label className="label">
                                    <a onClick={handelForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {LoginError && <p className="text-red-500 font-medium border-2 border-l-pink-800">{LoginError}</p>
                            // registerError&& <p>Kire vai ek email koto bar dibi</p>
                        }{
                            success && <h3 className="text-green-500 font-medium ">{success}</h3>
                        }
                        <p>please before <Link to={"/resister"}><span className=" font-bold text-green-500">Register</span></Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;