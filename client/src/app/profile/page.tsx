"use client";

import Link from "next/link";

export default function ProfilePage() {
    // Mock user data matching the session context
    const user = {
        name: "Campus Scholar",
        email: "scholar@university.edu",
        joinedDate: "February 2026",
        materialsUploaded: 12,
        favoritesCount: 45
    };

    return (
        <div className="flex min-h-screen flex-col bg-app-bg text-ink font-body">
            {/* Header */}
            <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-border-subtle bg-surface/80 px-8 backdrop-blur-md lg:px-16">
                <Link href="/dashboard" className="font-heading text-2xl font-bold text-main">
                    Classroom Buddy
                </Link>
                <div className="flex gap-8">
                    <Link href="/dashboard" className="text-sm font-bold uppercase tracking-wider text-main hover:underline">
                        Repository
                    </Link>
                </div>
            </header>

            <main className="flex-1 px-8 py-16 lg:px-16 mx-auto w-full max-w-4xl">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* Left Panel: Profile Info */}
                    <div className="w-full md:w-1/3 flex flex-col gap-6">
                        <div className="aspect-square w-full rounded-[32px] bg-main/10 flex items-center justify-center text-main border-2 border-main/20 shadow-soft">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </div>

                        <div className="flex flex-col gap-1 text-center md:text-left">
                            <h2 className="font-heading text-3xl font-bold text-ink">{user.name}</h2>
                            <p className="text-graphite font-medium">{user.email}</p>
                        </div>

                        <div className="flex flex-col gap-4 mt-4">
                            <div className="p-4 rounded-2xl bg-surface border border-border-subtle">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-graphite mb-1">Affiliation</p>
                                <p className="font-bold text-main">University Scholar</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-surface border border-border-subtle">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-graphite mb-1">Member Since</p>
                                <p className="font-bold text-main">{user.joinedDate}</p>
                            </div>
                        </div>

                    </div>

                    {/* Right Panel: Academic Stats & Activity */}
                    <div className="flex-1 flex flex-col gap-8 w-full">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-8 rounded-[32px] bg-main text-white shadow-soft">
                                <h3 className="text-4xl font-bold font-heading mb-2">{user.materialsUploaded}</h3>
                                <p className="text-white/80 font-bold uppercase tracking-wider text-xs">Materials Shelved</p>
                            </div>
                            <div className="p-8 rounded-[32px] bg-secondary text-ink shadow-soft border border-border-subtle">
                                <h3 className="text-4xl font-bold font-heading mb-2">{user.favoritesCount}</h3>
                                <p className="text-ink/60 font-bold uppercase tracking-wider text-xs">Bookmarked Refs</p>
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-border-subtle bg-surface p-8 overflow-hidden">
                            <h3 className="font-heading text-2xl font-bold text-main mb-6">Enrolled Courses</h3>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between py-4 border-b border-border-subtle last:border-0 hover:bg-main/5 px-4 rounded-xl transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-app-bg flex items-center justify-center text-main border border-border-subtle">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>
                                        </div>
                                        <div>
                                            <p className="font-bold text-ink hover:text-main transition-colors">Computer Science 101</p>
                                            <p className="text-sm text-graphite">Algorithms & Data Structures</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full">Active</span>
                                </div>
                                <div className="flex items-center justify-between py-4 border-b border-border-subtle last:border-0 hover:bg-main/5 px-4 rounded-xl transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-app-bg flex items-center justify-center text-main border border-border-subtle">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(45 12 12)" /><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-45 12 12)" /></svg>
                                        </div>
                                        <div>
                                            <p className="font-bold text-ink hover:text-main transition-colors">Advanced Physics</p>
                                            <p className="text-sm text-graphite">Quantum Mechanics</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
