"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CAMPUS_QUOTES } from "@/lib/quotes";
import heroImage from "../../../../public/images/campus-hero.webp";

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [activeQuote, setActiveQuote] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "ROLE_STUDENT"
    });

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * CAMPUS_QUOTES.length);
        setActiveQuote(CAMPUS_QUOTES[randomIndex]);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const { confirmPassword: _confirmPassword, ...registerData } = formData;

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
            const response = await fetch(`${apiUrl}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Account created successfully! Redirecting to login...");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                setError(data.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError("Cannot connect to the server. Is it running?");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-app-bg text-ink font-body">
            <div className="flex w-full flex-col p-8 md:w-[40%] lg:p-16">
                <div className="mb-12">
                    <Link href="/" className="font-heading text-2xl font-bold text-main">
                        Classroom Buddy
                    </Link>
                </div>

                <div className="flex flex-1 flex-col justify-center">
                    <h1 className="font-heading text-4xl font-bold text-main mb-2">
                        Register for Campus
                    </h1>
                    <p className="text-graphite mb-8">
                        Create your account to start sharing and organizing study materials.
                    </p>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-3 bg-red-100 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-3 bg-green-100 border border-green-200 text-green-600 rounded-lg text-sm font-medium">
                                {success}
                            </div>
                        )}

                        <div className="flex flex-col gap-1">
                            <label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-ink">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Choose a username"
                                required
                                className="h-12 rounded-input border border-border-subtle bg-surface px-4 text-ink outline-none focus:ring-2 focus:ring-main/20 font-medium"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-ink">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="university@email.com"
                                required
                                className="h-12 rounded-input border border-border-subtle bg-surface px-4 text-ink outline-none focus:ring-2 focus:ring-main/20 font-medium"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-ink">
                                I am a...
                            </label>
                            <select
                                id="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="h-12 rounded-input border border-border-subtle bg-surface px-4 text-ink outline-none focus:ring-2 focus:ring-main/20 font-medium appearance-none"
                            >
                                <option value="ROLE_STUDENT">Student</option>
                                <option value="ROLE_TEACHER">Teacher</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-ink">
                                Create Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Minimum 8 characters"
                                    required
                                    className="h-12 w-full rounded-input border border-border-subtle bg-surface px-4 pr-12 text-ink outline-none focus:ring-2 focus:ring-main/20 font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite hover:text-main"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                                <label htmlFor="confirmPassword" className={`text-xs font-bold uppercase tracking-wider ${error === "Passwords do not match" ? 'text-red-500' : 'text-ink'}`}>
                                    Confirm Password
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Repeat your password"
                                    required
                                    className={`h-12 w-full rounded-input border bg-surface px-4 pr-12 text-ink outline-none transition-all font-medium ${error === "Passwords do not match" ? 'border-red-500 focus:ring-red-500/10' : 'border-border-subtle focus:ring-2 focus:ring-main/20'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite hover:text-main"
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`mt-4 h-12 rounded-btn bg-main font-bold text-white transition-all shadow-soft active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-main/90'}`}
                        >
                            {isLoading ? "Shelving..." : "Shelve My Account"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-graphite">
                        Already have an account?{" "}
                        <Link href="/login" className="font-bold text-main hover:underline">
                            Enter Campus Gate
                        </Link>
                    </p>
                </div>
            </div>

            <div className="hidden relative bg-main/10 md:flex w-[60%] flex-col items-start justify-end overflow-hidden">
                <Image
                    src={heroImage}
                    alt="Campus sanctuary"
                    fill
                    placeholder="blur"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-main/90 via-main/30 to-transparent" />

                <div className="relative z-10 flex flex-col items-start text-left p-16 text-white max-w-2xl min-h-[300px] justify-end">
                    <h2 className="font-heading text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                        Knowledge grows when shared.
                    </h2>
                    <div className="w-24 h-1.5 bg-secondary rounded-full mb-6 shadow-lg"></div>
                    <p className="text-white/90 text-xl font-medium italic drop-shadow-md min-h-[3.5em]">
                        {activeQuote ? `"${activeQuote}"` : ""}
                    </p>
                </div>
            </div>
        </div>
    );
}
