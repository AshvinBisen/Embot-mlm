import  { useState } from 'react';
import loginimg from "../../assets/userImages/images/loginimg.webp";
import logo from "../../assets/userImages/Logo/logo_lght.png";
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Clear error on change
        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address.';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;
        console.log('Login Data:', formData);
        navigate("/user/dashboard")
        //  api h
    };

    return (
        <div className="w-full h-fit md:h-screen   overflow-hidden shadow-xl flex flex-col-reverse md:flex-row">
            {/* Left Image Panel */}
            <div className="w-full md:w-1/2 bg-[#1a152d] relative">
                <img
                    src={loginimg}
                    alt="Login"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
                    <Link to="/" className="self-end text-sm text-white bg-white/10 px-4 py-1 rounded-full backdrop-blur-md">
                        Back to website →
                    </Link>
                    <div>
                        <p className="text-xl font-medium">Capturing Moments,</p>
                        <p className="text-xl font-medium">Creating Memories</p>
                        <div className="mt-3 flex space-x-1">
                            <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                            <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Login Form */}
            <div className="w-full relative min-h-screen md:min-h-auto flex items-center justify-center md:w-1/2 p-8 md:p-12">
                <Link to="/" className=" absolute  top-5 right-5  text-xs text-white bg-white/10 px-4 py-1 rounded-full backdrop-blur-md">
                    Back to website →
                </Link>
                <div className="w-full max-w-xl">
                    <div className="mb-5">
                        <img src={logo} className="w-20" alt="Logo" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Sign in to your account</h2>
                    <p className="text-sm text-gray-400 mb-6">
                        Welcome back! Please enter your credentials to continue.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-md bg-secondary/10 border ${errors.email ? 'border-red-500' : 'border-white/10'
                                    } focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-primary'
                                    }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-md bg-secondary/10 border ${errors.password ? 'border-red-500' : 'border-white/10'
                                    } focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-primary'
                                    }`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-300">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="accent-primary"
                                />
                                Remember me
                            </label>
                            <Link to="/user/forgot-password" className="text-secondary hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-md bg-gradient-to-br from-[#2298d341] to-[#05CE99] hover:opacity-90 transition-colors font-semibold"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <hr className="flex-1 border-gray-600" />
                        <span className="text-gray-400 text-sm">
                            Want to create an account?{' '}
                            <Link
                                to="/user/signup"
                                className="text-secondary text-nowrap underline-offset-4 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </span>
                        <hr className="flex-1 border-gray-600" />
                    </div>

                    
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
