"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SmoothImage } from "@/components/ui/Smooth";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

export default function LoginPage() {
    const router = useRouter();
    const loginStore = useAuthStore((state) => state.login);

    const [formData, setFormData] = useState({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage("");
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await authService.login(formData);

            if (response.success) {
                localStorage.setItem("token", response.access_token);

                loginStore({
                    id: response.user.id,
                    name: response.user.name,
                    email: response.user.username,
                    role: response.user.role,
                });
                router.push("/");
            }
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                setErrorMessage(
                    error.response?.data?.message || "Username atau password salah."
                );
            } else {
                setErrorMessage("Terjadi kesalahan pada sistem. Silakan coba lagi.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#f8f9fa]">
            {/* Form Login */}
            <div className="flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 relative">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="w-full max-w-md mx-auto"
                >
                    {/* Logo */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <div className="w-12 h-12 relative mb-2">
                            <SmoothImage
                                src="/dic-jobs.jpg"
                                alt="DIC Jobs"
                                fill
                                priority
                                wrapperClassName="h-full w-full"
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
                    </motion.div>
                    {errorMessage && (
                        <motion.div variants={itemVariants} className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-200">
                            {errorMessage}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin}>
                        <motion.div variants={itemVariants} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-900">Username</label>
                                <Input
                                    name="username"
                                    type="text"
                                    placeholder="Masukkan username (cth: jobseeker)"
                                    icon={<Mail size={18} />}
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-900">Password</label>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="••••••"
                                    icon={<Lock size={18} />}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                />
                                <label htmlFor="remember" className="text-sm text-gray-900 font-medium">
                                    Remember me
                                </label>
                            </div>

                            <Button
                                type="submit"
                                className="h-12 text-base mt-2"
                                disabled={isLoading}
                            >
                                {isLoading ? "Memproses..." : "Sign in"}
                            </Button>
                        </motion.div>
                    </form>

                    {/* Social Login */}
                    <motion.div variants={itemVariants} className="mt-6 space-y-4">
                        <div className="text-sm text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-gray-900 font-semibold hover:underline">
                                Sign up
                            </Link>
                            <br />
                            <Link href="/forgot-password" className="text-gray-900 font-semibold hover:underline">
                                Forgot Password
                            </Link>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button className="w-12 h-12 rounded-full bg-white shadow-sm border flex items-center justify-center hover:bg-gray-50 transition">
                                <FcGoogle className="text-red-500" size={20} />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-white shadow-sm border flex items-center justify-center hover:bg-gray-50 transition">
                                <FaGithub size={20} />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-white shadow-sm border flex items-center justify-center hover:bg-gray-50 transition">
                                <FaFacebook className="text-blue-600" size={20} />
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <div className="hidden lg:block p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative w-full h-full bg-[#0a0a0a] rounded-[2rem] overflow-hidden"
                >
                    <SmoothImage
                        src="/dic.jpg"
                        alt="Dicoding"
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        wrapperClassName="h-full w-full"
                        className="object-cover"
                    />

                    <div className="absolute inset-0 p-16 flex flex-col justify-between z-10 text-white">
                        <div className="space-y-4 max-w-lg mt-32">
                            <h2 className="text-4xl font-bold">Welcome to Dicoding Jobs</h2>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                Dicoding helps you to build organized and well coded dashboards full of
                                beautiful and rich modules. Join us and start building your application today.
                            </p>
                            <p className="text-gray-300 text-sm">More than 17k people joined us, it&apos;s your turn</p>
                        </div>

                        {/* Floating Card */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="bg-[#2a2a2a]/90 backdrop-blur-md p-8 rounded-3xl w-full max-w-md self-end mb-12 shadow-2xl border border-white/10"
                        >
                            <h3 className="text-xl font-semibold mb-4 leading-snug">
                                Get your right job and right place apply now
                            </h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Be among the first founders to experience the easiest way to start run a business.
                            </p>

                            <div className="flex -space-x-3 justify-end">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#2a2a2a] bg-gray-500 overflow-hidden relative">
                                        <SmoothImage src="/logo.jpg" alt="Avatar" fill className="object-cover" />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-[#2a2a2a] bg-blue-600 flex items-center justify-center text-xs font-bold text-white z-10">
                                    +2
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}