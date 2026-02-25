"use client";

import Link from "next/link";
import { use } from "react";

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

export default function MaterialDetailsPage({ params }: { params: Promise<{ id: string, materialId: string }> }) {
    const unwrappedParams = use(params);
    const subjectId = unwrappedParams.id;
    const materialId = unwrappedParams.materialId;

    const materialsForSubject = MOCK_MATERIALS[subjectId] || [];
    const materialInfo = materialsForSubject.find(m => m.id === materialId) || {
        title: "Unknown Material",
        course: "Unknown",
        author: "Unknown User",
        date: "Unknown Date",
        url: "#"
    };

    return (
        <div className="flex min-h-screen flex-col bg-app-bg text-ink font-body">
            <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-border-subtle bg-surface/80 px-8 backdrop-blur-md lg:px-16">
                <Link href="/dashboard" className="font-heading text-2xl font-bold text-main">
                    Classroom Buddy
                </Link>
                <div className="flex items-center gap-6">
                    <Link href={`/dashboard/${subjectId}`} className="h-10 px-6 rounded-btn border border-border-subtle bg-surface text-sm font-bold transition-all hover:bg-main hover:text-white hover:border-main flex items-center shadow-soft">
                        Back to {subjectId.replace("-", " ")}
                    </Link>
                </div>
            </header>

            <main className="flex-1 px-8 py-10 lg:px-16 mx-auto w-full max-w-6xl flex flex-col h-full">
                <div className="mb-8 border-b border-border-subtle pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-bold px-3 py-1 rounded-md bg-secondary/20 text-secondary uppercase tracking-widest">
                                {materialInfo.course}
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl font-bold text-main mb-3">
                            {materialInfo.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-graphite">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                <span>Shelved by <span className="font-bold text-ink">{materialInfo.author}</span></span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                                <span>{materialInfo.date}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex shrink-0 gap-3">
                        <button className="h-12 px-6 rounded-btn bg-main text-white font-bold transition-all hover:bg-main/90 shadow-soft flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                            Download File
                        </button>
                    </div>
                </div>

                <div className="flex-1 w-full bg-surface border border-border-subtle rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                    <div className="bg-main/5 px-6 py-4 border-b border-border-subtle flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-graphite">Document Viewer</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/50 p-8 text-center text-graphite">
                        <svg className="mb-6 opacity-20" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                        <h3 className="text-xl font-bold text-ink mb-2">Material Vault Access</h3>
                        <p className="max-w-md">
                            This pane will render the actual Cloudinary PDF or Image file once the backend provides the <code>public_id</code> string.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
