import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router";

const signUpSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    password_confirmation: z.string()
    }).refine(data => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"]
});

type SignUpFormData = z.infer<typeof signUpSchema>;

function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema)
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            setIsSubmitting(true);
            setApiError(null);
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/register`, data);
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setApiError(error.response?.data.message || 'Registration failed');
            } else {
                setApiError('An unexpected error occurred');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg max-w-2xl w-full">
            <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-[#093f87] text-center">
                Create Your Account
            </h1>

            {apiError && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {apiError}
                </div>
            )}

            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </label>
                <input
                    {...register("name")}
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#093f87] focus:ring-2 focus:ring-[#093f87]/20"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#093f87] focus:ring-2 focus:ring-[#093f87]/20"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <div className="relative">
                    <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#093f87] focus:ring-2 focus:ring-[#093f87]/20"
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#093f87]"
                    >
                    {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                        <EyeIcon className="w-5 h-5" />
                    )}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                    {...register("password_confirmation")}
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#093f87] focus:ring-2 focus:ring-[#093f87]/20"
                    />
                    <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#093f87]"
                    >
                    {showConfirmPassword ? (
                        <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                        <EyeIcon className="w-5 h-5" />
                    )}
                    </button>
                </div>
                {errors.password_confirmation && (
                    <p className="text-red-500 text-sm mt-1">{errors.password_confirmation.message}</p>
                )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 text-white rounded-lg transition-colors ${
                    isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#093f87] hover:bg-[#082f6a]'
                }`}
                >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
                
                <Link
                to="/login"
                className="w-full px-6 py-3 border border-[#093f87] text-[#093f87] hover:bg-[#093f87]/10 rounded-lg text-center"
                >
                Already have an account? Login
                </Link>
            </div>
            </div>
        </form>
        </div>
    );
}

export default SignUp;