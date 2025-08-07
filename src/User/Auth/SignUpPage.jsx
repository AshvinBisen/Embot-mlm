import  { useState } from 'react';
import { FaGoogle, FaApple } from 'react-icons/fa';
import loginimg from "../../assets/userImages/images/loginimg.webp";
import logo from "../../assets/userImages/Logo/logo_lght.png";
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        referral: '',
        otp: '',
    });

    const navigate  = useNavigate()
    const [errors, setErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        if (!formData.otp.trim()) newErrors.otp = 'OTP is required';
        return newErrors;
    };

    const handleSendOtp = () => {
        if (!formData.email.trim()) {
            setErrors((prev) => ({ ...prev, email: 'Enter a valid email first' }));
            return;
        }
        setOtpSent(true);
        alert("OTP sent to " + formData.email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        navigate("/user/login")
        // alert("Signup successful with data: " + JSON.stringify(formData, null, 2));
    };

    return (
        <div className="w-full h-fit md:h-screen   overflow-hidden shadow-xl flex flex-col-reverse md:flex-row">
            <div className="w-full h-screen md:w-1/2 bg-[#1a152d] relative">
                <img src={loginimg} alt="Placeholder" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
                    <button className="self-end text-sm text-white bg-white/10 px-4 py-1 rounded-full backdrop-blur-md">
                        Back to website →
                    </button>
                    <div>
                        <p className="text-xl font-medium">Join the Community,</p>
                        <p className="text-xl font-medium">Grow with us</p>
                        <div className="mt-3 flex space-x-1">
                            <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                            <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full  h-full overflow-y-auto md:min-h-auto flex justify-center md:w-1/2 p-8 md:p-12">
                <div className="w-full max-w-xl">
                    <div className="mb-5">
                        <img src={logo} className='w-20' alt="Logo" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Create your account</h2>
                    <p className="text-sm text-gray-400 mb-6">
                        Join us and get started on your journey. Fill in the details below to sign up.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className="w-full px-4 py-3 rounded-md bg-secondary/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                        </div>

                        <div className='w-full relative rounded-md bg-secondary/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary'>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="bg-transparent h-full px-4 py-3 w-full"
                            />
                            <button
                                type="button"
                                onClick={handleSendOtp}
                                className={` ${otpSent ?"bg-green-600":""} absolute right-3 top-1/2 transform -translate-y-1/2 text-nowrap border border-slate-600 px-2 rounded-full text-xs py-1`}>
                                {otpSent ? "Resend OTP" : "Send OTP"}
                            </button>
                        </div>
                        {errors.email && <p className="text-red-500 text-xs -mt-3">{errors.email}</p>}

                        <div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-md bg-secondary/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <input
                            type="text"
                            name="referral"
                            value={formData.referral}
                            onChange={handleChange}
                            placeholder="Referral Code or Wallet Address (optional)"
                            className="w-full px-4 py-3 rounded-md bg-secondary/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                        <div>
                            <input
                                type="text"
                                name="otp"
                                value={formData.otp}
                                onChange={handleChange}
                                placeholder="Enter OTP"
                                className="w-full px-4 py-3 rounded-md bg-secondary/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-md bg-gradient-to-br from-[#2298d341] to-[#05CE99] hover:opacity-90 transition-colors font-semibold">
                            Sign Up
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <hr className="flex-1 border-gray-600" />
                        <span className="text-gray-400 text-sm">
                            Already have an account? <Link to="/user/login" className='text-secondary underline-offset-4 hover:underline text-nowrap '>Sign In</Link>
                        </span>
                        <hr className="flex-1 border-gray-600" />
                    </div>

                    <div className="my-6 flex items-center gap-4">
                        <hr className="flex-1 border-gray-600" />
                        <span className="text-gray-400 text-sm">Or sign up with</span>
                        <hr className="flex-1 border-gray-600" />
                    </div>

                    <div className="flex gap-4 pb-10 ">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary/10 border border-white/10 rounded-md hover:bg-white/10 transition-colors">
                            <FaGoogle /> Google
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary/10 border border-white/10 rounded-md hover:bg-white/10 transition-colors">
                            <FaApple /> Apple
                        </button>
                    </div>
                     
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
