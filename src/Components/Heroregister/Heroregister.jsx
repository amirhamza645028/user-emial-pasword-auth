import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import auth from "../../Fribase/Fribase.config";


const Heroregister = () => {
    const [heroregistersuccess, setheroregistersuccess] = useState('');
    const [heroregistererror, setheroregistererror] = useState('');
    //fast start coding 
    const handelheroregister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const Accecpt = e.target.terms.checked;
        console.log(Accecpt, email, password);
        if (password.length < 6) {
            setheroregistererror('please provde e 6 char pw')
            return;
        } else if (!/[A-Z]/.test(password)) {
            setheroregistererror('please provide upercase')
            return;
        } else if (!Accecpt) {
            setheroregistererror('accecept please')
            return;
        }
        //reset form""" theard coding
        setheroregistererror('')
        setheroregistersuccess('')
        //second coding
        createUserWithEmailAndPassword(auth, email, password)
            //er maddhome success er jonno ekta message and error jonno ekta message deoya hoy
            .then(result => {
                console.log(result.user)
                setheroregistersuccess('HeroRegister Successfully')
            })
            .catch(error => {
                console.log(error)
                setheroregistererror(error.message)
            })

    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                        <form onSubmit={handelheroregister}
                            //fast start coding 
                            className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder=" Eenter email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder=" Enter password" name="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <input type="checkbox" name="terms" id="terms" />
                            <lebel className=" ml-2" htmlFor="terms"> Accept our<a href=""> Terms and condition man</a></lebel>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" >Submit</button>
                            </div>

                        </form>

                        {
                            heroregistersuccess && <p className="text-green-500 font-medium ">{heroregistersuccess}</p>
                        }{
                            heroregistererror && <p className="text-red-500 font-medium border-2 border-l-pink-800">{heroregistererror}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Heroregister;