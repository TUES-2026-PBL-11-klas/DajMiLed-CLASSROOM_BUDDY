"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CAMPUS_QUOTES } from "@/lib/quotes";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [activeQuote, setActiveQuote] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * CAMPUS_QUOTES.length);
        setActiveQuote(CAMPUS_QUOTES[randomIndex]);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (error) setError("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        console.log("Registering User:", formData);
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
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-ink">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
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
                                <label htmlFor="confirmPassword" className={`text-xs font-bold uppercase tracking-wider ${error ? 'text-red-500' : 'text-ink'}`}>
                                    Confirm Password
                                </label>
                                {error && <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">{error}</span>}
                            </div>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Repeat your password"
                                    required
                                    className={`h-12 w-full rounded-input border bg-surface px-4 pr-12 text-ink outline-none transition-all font-medium ${error ? 'border-red-500 focus:ring-red-500/10' : 'border-border-subtle focus:ring-2 focus:ring-main/20'}`}
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
                            className="mt-4 h-12 rounded-btn bg-main font-bold text-white transition-all hover:bg-main/90 shadow-soft active:scale-[0.98]"
                        >
                            Shelve My Account
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
                    src="/images/campus-hero.png"
                    alt="Campus sanctuary"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
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
