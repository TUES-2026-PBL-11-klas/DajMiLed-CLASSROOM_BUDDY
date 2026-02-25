"use client";

import Link from "next/link";
import { JSX } from "react";

interface Subject {
    id: string;
    name: string;
    description: string;
    resourcesCount: number;
    icon: JSX.Element;
}

const SUBJECTS: Subject[] = [
    {
        id: "computer-science",
        name: "Computer Science",
        description: "Algorithms, data structures, and the theoretical foundations of computation.",
        resourcesCount: 142,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>
        ),
    },
    {
        id: "mathematics",
        name: "Mathematics",
        description: "Calculus, linear algebra, statistics, and discrete mathematics essentials.",
        resourcesCount: 89,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
        ),
    },

];

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen flex-col bg-app-bg text-ink font-body">
            <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-border-subtle bg-surface/80 px-8 backdrop-blur-md lg:px-16">
                <Link href="/dashboard" className="font-heading text-2xl font-bold text-main">
                    Classroom Buddy
                </Link>
                <Link href="/dashboard/upload" className="text-sm font-bold uppercase tracking-wider text-main hover:underline">
                    Upload Material
                </Link>
            </header>

            <main className="flex-1 px-8 py-16 lg:px-16 mx-auto w-full max-w-7xl">
                <div className="mb-16 max-w-3xl">
                    <h1 className="font-heading text-5xl font-bold text-main mb-6">
                        The Repository
                    </h1>
                    <p className="text-xl text-graphite leading-relaxed">
                        Explore our categorized vast library of academic materials. Select a discipline to dive into specialized resources and syllabi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {SUBJECTS.map((subject) => (
                        <Link
                            key={subject.id}
                            href={`/dashboard/${subject.id}`}
                            className="group relative flex flex-col rounded-[24px] border border-border-subtle bg-surface p-8 transition-all duration-300 hover:-translate-y-2 hover:border-main/30 hover:shadow-soft"
                        >
                            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-main/10 text-main transition-all duration-300 group-hover:bg-main group-hover:text-white group-hover:shadow-md">
                                {subject.icon}
                            </div>

                            <h2 className="mb-3 font-heading text-2xl font-bold text-ink transition-colors group-hover:text-main">
                                {subject.name}
                            </h2>
                            <p className="mb-8 flex-1 text-base text-graphite leading-relaxed">
                                {subject.description}
                            </p>

                            <div className="mt-auto flex items-center justify-between border-t border-border-subtle/50 pt-6">
                                <span className="text-xs font-bold uppercase tracking-widest text-graphite">
                                    {subject.resourcesCount} Resources
                                </span>
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-app-bg text-main transition-transform duration-300 group-hover:translate-x-2 group-hover:bg-main/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <footer className="py-12 bg-app-bg text-center flex flex-col items-center gap-2">
                <p className="text-sm font-bold uppercase tracking-wider text-main">Classroom Buddy</p>
                <p className="text-sm font-bold uppercase tracking-wider text-main opacity-80">Designed for the pursuit of excellence.</p>

            </footer>
        </div>
    );
}
