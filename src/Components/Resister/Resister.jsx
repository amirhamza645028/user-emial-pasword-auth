import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Fribase/Fribase.config";
import { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth/cordova";

const Resister = () => {
    const [registerError, setregisterError] = useState('');
    // this is success message
    const [success, setsuccess] = useState('');
    const [showpassword, setshowpassword] = useState(false);
    const handelregister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const Accecpt = e.target.terms.checked;
        console.log(email, password,Accecpt);
        if (password.length < 6) {
            setregisterError('please providemore 6 char')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setregisterError('plz uper case')
            return;
        }
        else if(!Accecpt){
            setregisterError("please accept our terms and conditon")
            return;
        }
        //    reset error
        setregisterError('');
        setsuccess('');
        //   create user 
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setsuccess('Register Successfully')
                 //send verification email
                 sendEmailVerification(result.user)
                 .then(() =>{
                     alert('chek your varification email')
                 })
            })
            .catch(error => {
                console.error(error);
                setregisterError(error.message)
            })
    }
    return (
        <div>
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl "> This is Resister</h2>
                <form onSubmit={handelregister}>
                    <input className="rounded-xl border-2 border-b-red-500 mb-4 w-3/4 py-2 px-4" type="email" name="email" placeholder="Your Email" id="" required /> <br />
                    <div className="relative ">

                        <input className="rounded-xl border-2 border-b-red-500 w-3/4 py-2 px-4" type={showpassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password" id="" required /> <span className="absolute top-4 left-96  "  onClick={() => setshowpassword(!showpassword)}>{showpassword ? <FaRegEye></FaRegEye> : <FaEyeSlash></FaEyeSlash>}</span>

                    </div>
                    <br />
                    <input type="checkbox" name="terms" id="terms" />
                    <lebel className=" ml-2" htmlFor="terms"> Accept our<a href=""> Terms and condition man</a></lebel>
                    <input className="rounded-xl border-2 btn-error mb-4 w-3/4 py-2 px-4" type="submit" value='Register' />
                </form>
                {
                    registerError && <p className="text-red-500 font-medium border-2 border-l-pink-800">{registerError}</p>
                    // registerError&& <p>Kire vai ek email koto bar dibi</p>
                }{
                    success && <h3 className="text-green-500 font-medium ">{success}</h3>
                }
                <p>If you have already account so pleasse<Link to={"/login"}><span className="font-bold pl-1 text-green-500">Login</span></Link> </p>

            </div>
        </div>
    );
};

export default Resister;