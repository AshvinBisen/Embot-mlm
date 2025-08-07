import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginimg from "../../assets/userImages/images/loginimg.webp";
import logo from "../../assets/userImages/Logo/logo_lght.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [timer, setTimer] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Countdown timer
    useEffect(() => {
        let countdown;
        if (timer > 0) {
            countdown = setTimeout(() => setTimer(timer - 1), 1000);
        }
        return () => clearTimeout(countdown);
    }, [timer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.otp.trim()) newErrors.otp = 'OTP is required';

        if (!formData.newPassword.trim()) newErrors.newPassword = 'New password is required';
        if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        return newErrors;
    };

    const handleSendOtp = () => {
        if (!formData.email.trim()) {
            setErrors((prev) => ({ ...prev, email: 'Enter a valid email first' }));
            return;
        }
        setOtpSent(true);
        setTimer(60);
        toast.success(`OTP sent to ${formData.email}`);
    };

    const handleVerifyOtp = () => {
        if (!formData.otp.trim()) {
            setErrors((prev) => ({ ...prev, otp: 'Enter OTP' }));
            return;
        }
        // Simulate successful verification
        setOtpVerified(true);
        toast.success("OTP Verified");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        toast.success("Password reset successful");
        navigate("/user/login");
    };

    return (
        <div className="w-full h-fit md:h-screen overflow-hidden shadow-xl flex flex-col-reverse md:flex-row">
            <div className="w-full h-screen md:w-1/2 bg-[#1a152d] relative">
                <img src={loginimg} alt="Placeholder" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
                    <Link to="/" className="self-end text-sm text-white bg-white/10 px-4 py-1 rounded-full backdrop-blur-md">
                        Back to website →
                    </Link>
                    <div>
                        <p className="text-xl font-medium">Forgot Your Password?</p>
                        <p className="text-xl font-medium">Reset It Safely</p>
                        <div className="mt-3 flex space-x-1">
                            <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                            <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full relative min-h-screen md:h-full overflow-y-auto flex items-center justify-center md:w-1/2 p-8 md:p-12">
                <Link to="/" className=" absolute  top-5 right-5  text-xs text-white bg-white/10 px-4 py-1 rounded-full backdrop-blur-md">
                    Back to website →
                </Link>
                <div className="w-full max-w-xl">

                    <div className="mb-5">
                        <img src={logo} className='w-20' alt="Logo" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Reset Your Password</h2>
                    <p className="text-sm text-gray-400 mb-6">Enter your email to receive OTP and set a new password.</p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Email + Send OTP */}
                        <div>
                            <div className="w-full relative rounded-md bg-secondary/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary">
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
                                    disabled={timer > 0}
                                    onClick={handleSendOtp}
                                    className={`absolute  right-3 top-1/2 transform -translate-y-1/2 text-nowrap border px-3 rounded-full text-xs py-1 transition-all duration-200 ${timer > 0
                                        ? "cursor-not-allowed bg-gray-500 text-white border-gray-500"
                                        : "bg-slate-900  border-slate-600 hover:bg-white "
                                        }`}
                                >
                                    {otpSent
                                        ? timer > 0
                                            ? `Resend OTP (${timer}s)`
                                            : "Resend OTP"
                                        : "Send OTP"}
                                </button>
                            </div>
                            {errors.email && <p className="text-red-500 text-xs  ">{errors.email}</p>}
                        </div>

                        {/* OTP + Verify */}
                        <div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    placeholder="Enter OTP"
                                    className="w-full px-4 py-3 rounded-md bg-secondary/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button
                                    type="button"
                                    onClick={handleVerifyOtp}
                                    className="whitespace-nowrap px-3 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700"
                                >
                                    Verify OTP
                                </button>
                            </div>
                            {errors.otp && <p className="text-red-500 text-xs">{errors.otp}</p>}
                        </div>

                        {/* New Password Fields - Only after OTP verified */}
                        {otpVerified && (
                            <>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        placeholder="New Password"
                                        className="w-full px-4 py-3 rounded-md bg-secondary/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-lg"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
                                </div>

                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm Password"
                                        className="w-full px-4 py-3 rounded-md bg-secondary/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-lg"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>
                            </>
                        )}
                        <div className="my-6 flex items-center gap-4">
                            <hr className="flex-1 border-gray-600" />
                            <span className="text-gray-400 text-sm">
                                I remember my password <Link to="/user/login" className='text-secondary underline-offset-4 hover:underline text-nowrap '>Sign In</Link>
                            </span>
                            <hr className="flex-1 border-gray-600" />
                        </div>

                        {/* Final Submit */}
                        {otpVerified && (
                            <button
                                type="submit"
                                className="w-full py-3 rounded-md bg-gradient-to-br from-[#2298d341] to-[#05CE99] hover:opacity-90 transition-colors font-semibold">
                                Reset Password
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
