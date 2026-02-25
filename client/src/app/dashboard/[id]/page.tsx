"use client";

import Link from "next/link";
import { use } from "react";
import { JSX } from "react";

const MOCK_MATERIALS: Record<string, { id: string; title: string; course: string; author: string; date: string; url: string; }[]> = {
    "computer-science": [
        { id: "cs1", title: "Intro to Neural Networks - Lecture Notes", course: "AI 101", author: "Campus Scholar", date: "Feb 23, 2026", url: "#" },
        { id: "cs2", title: "Data Structures Cheatsheet", course: "CS 202", author: "Alex Chen", date: "Feb 20, 2026", url: "#" },
        { id: "cs3", title: "Rust Memory Management Guide", course: "Systems Prog", author: "Sarah J.", date: "Feb 15, 2026", url: "#" },
    ],
    "mathematics": [
        { id: "m1", title: "Calculus III Formula Sheet", course: "Calc 3", author: "Campus Scholar", date: "Feb 10, 2026", url: "#" },
        { id: "m2", title: "Linear Algebra Exam Prep", course: "Math 210", author: "David W.", date: "Jan 28, 2026", url: "#" },
    ]
};

const SUBJECT_DETAILS: Record<string, { name: string; description: string }> = {
    "computer-science": { name: "Computer Science", description: "Algorithms, data structures, and the theoretical foundations of computation." },
    "mathematics": { name: "Mathematics", description: "Calculus, linear algebra, statistics, and discrete mathematics essentials." }
};

export default function SubjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const subjectId = unwrappedParams.id;

    const subjectInfo = SUBJECT_DETAILS[subjectId] || { name: "Unknown Subject", description: "No details available." };
    const materials = MOCK_MATERIALS[subjectId] || [];

    return (
        <div className="flex min-h-screen flex-col bg-app-bg text-ink font-body">
            <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-border-subtle bg-surface/80 px-8 backdrop-blur-md lg:px-16">
                <Link href="/dashboard" className="font-heading text-2xl font-bold text-main">
                    Classroom Buddy
                </Link>
                <div className="flex items-center gap-8">
                    <Link href="/dashboard/upload" className="text-sm font-bold uppercase tracking-wider text-main hover:underline hidden md:block">
                        Upload Material
                    </Link>
                    <Link href="/dashboard" className="text-sm font-bold uppercase tracking-wider text-main hover:underline">
                        Back to Repository
                    </Link>
                </div>
            </header>

            <main className="flex-1 px-8 py-16 lg:px-16 mx-auto w-full max-w-5xl">
                <div className="mb-12 border-b border-border-subtle pb-8">
                    <div className="inline-block px-3 py-1 bg-main/10 text-main text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                        Discipline
                    </div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-main mb-4">
                        {subjectInfo.name}
                    </h1>
                    <p className="text-lg text-graphite max-w-2xl">
                        {subjectInfo.description}
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="font-heading text-2xl font-bold text-ink">Available Materials ({materials.length})</h2>
                        <Link href="/dashboard/upload" className="md:hidden text-sm font-bold text-main hover:underline">
                            + Upload
                        </Link>
                    </div>

                    {materials.length === 0 ? (
                        <div className="p-12 text-center border border-dashed border-border-subtle rounded-3xl bg-surface/50">
                            <p className="text-graphite font-bold mb-2">No materials found for this subject.</p>
                            <p className="text-sm text-graphite/70">Be the first to shelve a resource!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {materials.map((mat) => (
                                <Link key={mat.id} href={`/dashboard/${subjectId}/${mat.id}`} className="block group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[24px] border border-border-subtle bg-surface transition-all hover:border-main/50 hover:shadow-soft gap-6">
                                    <div className="flex items-start md:items-center gap-6">
                                        <div className="h-14 w-14 shrink-0 rounded-2xl bg-app-bg text-main flex items-center justify-center border border-border-subtle transition-colors group-hover:bg-main group-hover:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="flexitems-center gap-3 mb-1">
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-secondary/20 text-secondary uppercase tracking-wider mb-2 inline-block">
                                                    {mat.course}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-ink group-hover:text-main transition-colors">
                                                {mat.title}
                                            </h3>
                                            <p className="text-sm text-graphite mt-1 flex items-center gap-2">
                                                <span>Shelved by <span className="font-bold">{mat.author}</span></span>
                                                <span>•</span>
                                                <span>{mat.date}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                                        <div className="flex-1 md:flex-none h-10 px-6 rounded-btn bg-main/10 text-main font-bold flex items-center justify-center transition-colors group-hover:bg-main group-hover:text-white gap-2">
                                            <span className="hidden sm:inline">View Material</span>
                                            <span className="sm:hidden">Open</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <footer className="py-12 bg-app-bg text-center flex flex-col items-center gap-2">
                <p className="text-sm font-bold uppercase tracking-wider text-main">Classroom Buddy</p>
                <p className="text-sm font-bold uppercase tracking-wider text-main opacity-80">Designed for the pursuit of excellence.</p>

            </footer>
        </div>
    );
}
