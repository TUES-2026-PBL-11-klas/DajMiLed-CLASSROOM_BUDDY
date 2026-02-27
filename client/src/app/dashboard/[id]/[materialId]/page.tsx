"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

interface MaterialResponse {
    id: number;
    subject: string;
    url: string;
    createdAt: string;
    username: string;
}

export default function MaterialDetailsPage({ params }: { params: Promise<{ id: string, materialId: string }> }) {
    const unwrappedParams = use(params);
    const subjectId = unwrappedParams.id;
    const materialId = parseInt(unwrappedParams.materialId);

    const [material, setMaterial] = useState<MaterialResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMaterial = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("You must be logged in to view materials.");
                    setIsLoading(false);
                    return;
                }

                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
                const response = await fetch(`${apiUrl}/api/material/${subjectId}?size=100`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    const content: MaterialResponse[] = data.data?.content || data.content || [];
                    const foundMaterial = content.find(m => m.id === materialId);
                    if (foundMaterial) {
                        setMaterial(foundMaterial);
                    } else {
                        setError("Material not found.");
                    }
                } else {
                    setError("Failed to communicate with the vault.");
                }
            } catch (err) {
                console.error("Error fetching material detail:", err);
                setError("Network error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMaterial();
    }, [subjectId, materialId]);

    const getDownloadUrl = (url?: string) => {
        if (!url) return "#";
        if (url.includes('res.cloudinary.com')) {
            const parts = url.split('/upload/');
            if (parts.length === 2) {
                return `${parts[0]}/upload/fl_attachment/${parts[1]}`;
            }
        }
        return url;
    };

    const isImage = (url?: string) => {
        if (!url) return false;
        const lowUrl = url.toLowerCase();
        return lowUrl.endsWith('.jpg') || lowUrl.endsWith('.jpeg') || lowUrl.endsWith('.png') || lowUrl.endsWith('.webp') || lowUrl.endsWith('.gif');
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-app-bg text-main">
                <div className="flex flex-col items-center gap-4">
                    <svg className="animate-spin h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p className="font-bold tracking-widest uppercase text-sm">Accessing the Vault...</p>
                </div>
            </div>
        );
    }

    if (error || !material) {
        return (
            <div className="flex min-h-screen flex-col bg-app-bg text-ink font-body">
                <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-border-subtle bg-surface/80 px-8 backdrop-blur-md lg:px-16">
                    <Link href="/" className="font-heading text-2xl font-bold text-main">
                        Classroom Buddy
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href={`/dashboard/${subjectId}`} className="text-sm font-bold uppercase tracking-wider text-main hover:underline">
                            Back to {subjectId.replace("-", " ")}
                        </Link>
                    </div>
                </header>
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-graphite">
                    <h2 className="text-2xl font-bold text-main mb-2">Access Denied</h2>
                    <p>{error || "This resource may have been removed or does not exist."}</p>
                    <Link href={`/dashboard/${subjectId}`} className="mt-6 px-6 py-2 rounded-btn bg-main/10 text-main font-bold hover:bg-main hover:text-white transition-colors">
                        Return to Discipline
                    </Link>
                </div>
            </div>
        );
    }

    const downloadUrl = getDownloadUrl(material.url);
    let displayName = `Material #${material.id}`;
    let ext = "";
    try {
        const parts = material.url.split('/');
        let rawName = parts[parts.length - 1];
        rawName = decodeURIComponent(rawName);
        if (rawName.includes('.')) {
            const nameParts = rawName.split('.');
            ext = nameParts.pop() || "";
            displayName = nameParts.join('.');
        } else {
            displayName = rawName;
        }
        if (displayName.length > 40) displayName = displayName.substring(0, 40) + "...";
    } catch { }

    return (
        <div className="flex min-h-screen flex-col bg-app-bg text-ink font-body">
            <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-border-subtle bg-surface/80 px-8 backdrop-blur-md lg:px-16">
                <Link href="/" className="font-heading text-2xl font-bold text-main">
                    Classroom Buddy
                </Link>
                <div className="flex items-center gap-6">
                    <Link href={`/dashboard/${subjectId}`} className="text-sm font-bold uppercase tracking-wider text-main hover:underline">
                        Back to {subjectId.replace("-", " ")}
                    </Link>
                    <Link href="/dashboard/profile" className="group flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-app-bg text-graphite transition-all hover:border-main/50 hover:bg-main/5 hover:text-main shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </Link>
                </div>
            </header>

            <main className="flex-1 px-8 py-10 lg:px-16 mx-auto w-full max-w-6xl flex flex-col h-full">
                <div className="mb-8 border-b border-border-subtle pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-bold px-3 py-1 rounded-md bg-secondary/20 text-secondary uppercase tracking-widest">
                                Discipline: {material.subject}
                            </span>
                            {ext && (
                                <span className="text-[10px] font-bold px-3 py-1 rounded-md bg-main/10 text-main uppercase tracking-widest">
                                    Format: {ext}
                                </span>
                            )}
                        </div>
                        <h1 className="font-heading text-4xl font-bold text-main mb-3 break-all">
                            {displayName}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-graphite">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                <span>Shelved by <span className="font-bold text-ink">{material.username || "Unknown"}</span></span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                                <span>{new Date(material.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <a
                            href={downloadUrl}
                            download
                            className="h-12 px-6 rounded-btn bg-main text-white font-bold transition-all hover:bg-main/90 shadow-soft flex items-center justify-center gap-2 w-full md:w-auto"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                            Secure Download
                        </a>
                    </div>
                </div>

                <div className="flex-1 w-full bg-surface border border-border-subtle rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[70vh]">
                    <div className="bg-main/5 px-6 py-4 border-b border-border-subtle flex justify-between items-center shrink-0">
                        <span className="text-xs font-bold uppercase tracking-widest text-graphite flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                            Live Material Viewer
                        </span>
                        <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-main hover:underline">
                            Open in New Tab
                        </a>
                    </div>

                    <div className="flex-1 w-full h-full bg-gray-50 flex items-center justify-center overflow-auto p-4 md:p-8">
                        {isImage(material.url) ? (
                            <img
                                src={material.url}
                                alt={displayName}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-sm border border-border-subtle"
                            />
                        ) : (
                            <iframe
                                src={material.url}
                                className="w-full h-full min-h-[600px] border-0 rounded-lg shadow-sm bg-white"
                                title="Document Viewer"
                                allow="fullscreen"
                            />
                        )}
                    </div>
                </div>
            </main>

            <footer className="py-8 bg-app-bg text-center border-t border-border-subtle">
                <p className="text-sm font-bold uppercase tracking-wider text-main">Classroom Buddy</p>
                <p className="text-xs font-bold uppercase tracking-wider text-main opacity-60 mt-1">Designed for the pursuit of excellence.</p>
            </footer>
        </div>
    );
}
