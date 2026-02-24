"use client";

import Link from "next/link";
import { useState } from "react";

export default function UploadMaterialPage() {
    const [formData, setFormData] = useState({
        title: "",
        uploadUrl: "",
        subject: "computer-science"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mocking an upload delay
        console.log("Uploading Material:", formData);

        setTimeout(() => {
            setIsSubmitting(false);
            alert("Material details captured! Ready for database population.");
        }, 1000);
    };

    return (
        <div className="flex min-h-screen flex-col bg-app-bg text-ink font-body">
            {/* Header */}
            <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-border-subtle bg-surface/80 px-8 backdrop-blur-md lg:px-16">
                <Link href="/dashboard" className="font-heading text-2xl font-bold text-main">
                    Classroom Buddy
                </Link>
                <Link href="/dashboard" className="text-sm font-bold uppercase tracking-wider text-main hover:underline">
                    Back to Repository
                </Link>
            </header>

            <main className="flex-1 px-8 py-16 lg:px-16 mx-auto w-full max-w-2xl">
                <div className="mb-12">
                    <h1 className="font-heading text-4xl font-bold text-main mb-4">
                        Shelve New Material
                    </h1>
                    <p className="text-graphite text-lg">
                        Contribute to the collective knowledge. Add a title and link to your documentation.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-[24px] border border-border-subtle bg-surface p-8 shadow-soft">
                    {/* Material Title */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-ink">
                            Material Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Intro to Neural Networks - Lecture Notes"
                            required
                            className="h-12 rounded-input border border-border-subtle bg-surface px-4 text-ink outline-none focus:ring-2 focus:ring-main/20 font-medium"
                        />
                    </div>

                    {/* Subject Selection */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-ink">
                            Academic Subject
                        </label>
                        <select
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="h-12 rounded-input border border-border-subtle bg-surface px-4 text-ink outline-none focus:ring-2 focus:ring-main/20 font-medium appearance-none"
                        >
                            <option value="computer-science">Computer Science</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="physics">Physics</option>
                            <option value="literature">Literature & Arts</option>
                        </select>
                    </div>

                    {/* Upload URL */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="uploadUrl" className="text-xs font-bold uppercase tracking-wider text-ink">
                            Resource URL
                        </label>
                        <input
                            id="uploadUrl"
                            type="url"
                            value={formData.uploadUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/materials/doc.pdf"
                            required
                            className="h-12 rounded-input border border-border-subtle bg-surface px-4 text-ink outline-none focus:ring-2 focus:ring-main/20 font-medium"
                        />
                        <p className="mt-1 text-[10px] text-graphite/60 italic uppercase tracking-wider font-bold">
                            Direct links to PDFs, drives, or slides are preferred.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 h-14 rounded-btn bg-main font-bold text-white transition-all hover:bg-main/90 shadow-soft active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            "Shelving..."
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                Shelve Material
                            </>
                        )}
                    </button>
                </form>
            </main>
        </div>
    );
}
