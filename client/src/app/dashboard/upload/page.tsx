"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UploadMaterialPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        subject: "computer-science"
    });
    const [file, setFile] = useState<File | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("subject", formData.subject);
            formDataToSend.append("file", file);

            const token = localStorage.getItem("token");
            if (!token) {
                alert("You are not logged in!");
                setIsSubmitting(false);
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
            const response = await fetch(`${apiUrl}/api/material/upload`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formDataToSend,
            });

            if (response.ok) {
                alert(`Material "${formData.title}" uploaded successfully!`);
                setFormData({ title: "", subject: "computer-science" });
                setFile(null);
            } else {
                const errorData = await response.json().catch(() => null);
                alert(`Failed to upload: ${errorData?.message || response.statusText}`);
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("A network error occurred while uploading. Please check the backend connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-app-bg text-ink font-body">
            <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-border-subtle bg-surface/80 px-8 backdrop-blur-md lg:px-16">
                <Link href="/" className="font-heading text-2xl font-bold text-main">
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
                        Contribute to the collective knowledge. Upload your academic documentation directly.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8 rounded-[24px] border border-border-subtle bg-surface p-10 shadow-soft">
                    <div className="flex flex-col gap-2">
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
                            className="h-14 rounded-input border border-border-subtle bg-surface px-4 text-ink outline-none focus:ring-2 focus:ring-main/20 font-medium transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-ink">
                            Academic Subject
                        </label>
                        <div className="relative">
                            <select
                                id="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full h-14 rounded-input border border-border-subtle bg-surface px-4 text-ink outline-none focus:ring-2 focus:ring-main/20 font-medium appearance-none transition-all"
                            >
                                <option value="computer-science">Computer Science</option>
                                <option value="mathematics">Mathematics</option>
                                <option value="physics">Physics</option>
                                <option value="literature">Literature & Arts</option>
                            </select>
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-graphite">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-ink">
                            Upload Document (PDF, Image)
                        </label>
                        <div className={`relative group border-2 border-dashed ${file ? 'border-main bg-main/5' : 'border-border-subtle hover:border-main/50'} rounded-[24px] transition-all p-8 flex flex-col items-center justify-center text-center cursor-pointer`}>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />

                            <div className={`h-16 w-16 rounded-2xl ${file ? 'bg-main text-white' : 'bg-app-bg text-main'} flex items-center justify-center mb-4 transition-colors`}>
                                {file ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-ink transition-colors group-hover:text-main">
                                    {file ? file.name : "Click to select or drag and drop"}
                                </p>
                                <p className="text-xs text-graphite">
                                    {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "PDF, Image or Document (max 10MB)"}
                                </p>
                            </div>
                        </div>
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

            <footer className="py-12 bg-app-bg text-center flex flex-col items-center gap-2">
                <p className="text-sm font-bold uppercase tracking-wider text-main">Classroom Buddy</p>
                <p className="text-sm font-bold uppercase tracking-wider text-main opacity-80">Designed for the pursuit of excellence.</p>

            </footer>
        </div>
    );
}
