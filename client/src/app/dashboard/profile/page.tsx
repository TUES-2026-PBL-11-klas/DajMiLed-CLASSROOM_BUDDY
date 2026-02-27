"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface MaterialResponse {
    id: number;
    subject: string;
    url: string;
    createdAt: string;
    username: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [materials, setMaterials] = useState<MaterialResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState<string>("Scholar");
    const [stats, setStats] = useState({
        totalShelved: 0,
        uniqueSubjects: 0
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/login");
                    return;
                }

                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
                const response = await fetch(`${apiUrl}/api/material/me?size=100`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    const content: MaterialResponse[] = data.data?.content || data.content || [];
                    setMaterials(content);

                    if (content.length > 0) {
                        setUsername(content[0].username || "Scholar");
                    }

                    const subjects = new Set(content.map(m => m.subject));
                    setStats({
                        totalShelved: content.length,
                        uniqueSubjects: subjects.size
                    });

                } else {
                    console.error("Failed to load your materials");
                }
            } catch (error) {
                console.error("Error fetching profile materials:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    return (
        <div className="flex min-h-screen flex-col bg-app-bg text-ink font-body">
            <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-border-subtle bg-surface/80 px-8 backdrop-blur-md lg:px-16">
                <Link href="/" className="font-heading text-2xl font-bold text-main">
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
                <div className="mb-12 border-b border-border-subtle pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-block px-3 py-1 bg-main/10 text-main text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                            Scholar Profile
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-main mb-2">
                            {username}
                        </h1>
                        <p className="text-lg text-graphite max-w-2xl">
                            Your personal vault of knowledge. Review and manage the resources you have contributed to the academic repository.
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="shrink-0 h-12 px-6 rounded-btn border border-red-200 bg-red-50 text-red-600 font-bold hover:bg-red-100 hover:border-red-300 transition-colors shadow-sm flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                        Log Out
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-surface border border-border-subtle rounded-3xl p-8 flex items-center gap-6 shadow-sm">
                        <div className="h-16 w-16 shrink-0 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-graphite mb-1">Items Shelved</p>
                            <p className="font-heading text-4xl font-bold text-ink">{isLoading ? "-" : stats.totalShelved}</p>
                        </div>
                    </div>
                    <div className="bg-surface border border-border-subtle rounded-3xl p-8 flex items-center gap-6 shadow-sm">
                        <div className="h-16 w-16 shrink-0 rounded-full bg-main/10 text-main flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-graphite mb-1">Disciplines Explored</p>
                            <p className="font-heading text-4xl font-bold text-ink">{isLoading ? "-" : stats.uniqueSubjects}</p>
                        </div>
                    </div>
                </div>

                {/* Materials List */}
                <div className="flex flex-col gap-6">
                    <h2 className="font-heading text-2xl font-bold text-ink">Your Contributions</h2>

                    {isLoading ? (
                        <div className="p-12 text-center border border-dashed border-border-subtle rounded-3xl bg-surface/50">
                            <p className="text-graphite font-bold mb-2 animate-pulse">Loading your vault entries...</p>
                        </div>
                    ) : materials.length === 0 ? (
                        <div className="p-16 text-center border border-dashed border-border-subtle rounded-3xl bg-surface/50 flex flex-col items-center">
                            <div className="h-20 w-20 bg-main/5 text-main rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg>
                            </div>
                            <p className="text-lg text-ink font-bold mb-2">Your vault is currently empty.</p>
                            <p className="text-graphite mb-8 max-w-sm">You haven&apos;t uploaded any materials yet. Start contributing to the Classroom Buddy repository to help your peers.</p>
                            <Link href="/dashboard/upload" className="h-12 px-8 rounded-btn bg-main text-white font-bold transition-all hover:bg-main/90 shadow-soft flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                Upload First Material
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {materials.map((mat) => (
                                <Link key={mat.id} href={`/dashboard/${mat.subject.toLowerCase()}/${mat.id}`} className="block group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[24px] border border-border-subtle bg-surface transition-all hover:border-main/50 hover:shadow-soft gap-6">
                                    <div className="flex items-start md:items-center gap-6">
                                        <div className="h-14 w-14 shrink-0 rounded-2xl bg-app-bg text-main flex items-center justify-center border border-border-subtle transition-colors group-hover:bg-main group-hover:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-secondary/20 text-secondary uppercase tracking-wider inline-block">
                                                    {mat.subject}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-ink group-hover:text-main transition-colors line-clamp-1">
                                                {(() => {
                                                    try {
                                                        const parts = mat.url.split('/');
                                                        let filename = parts[parts.length - 1];
                                                        filename = decodeURIComponent(filename);
                                                        if (filename.length > 30) return `Material #${mat.id}`;
                                                        return filename.split('.')[0] || `Material #${mat.id}`;
                                                    } catch {
                                                        return `Material #${mat.id}`;
                                                    }
                                                })()}
                                            </h3>
                                            <p className="text-sm text-graphite mt-1 flex items-center gap-2">
                                                <span>Shelved on {new Date(mat.createdAt).toLocaleDateString()}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                                        <div className="flex-1 md:flex-none h-10 px-6 rounded-btn bg-main/10 text-main font-bold flex items-center justify-center transition-colors group-hover:bg-main group-hover:text-white gap-2">
                                            <span className="hidden sm:inline">View Details</span>
                                            <span className="sm:hidden">Open</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <footer className="py-12 bg-app-bg text-center flex flex-col items-center gap-2 border-t border-border-subtle mt-auto">
                <p className="text-sm font-bold uppercase tracking-wider text-main">Classroom Buddy</p>
                <p className="text-sm font-bold uppercase tracking-wider text-main opacity-80">Designed for the pursuit of excellence.</p>
                <div className="mt-6 flex items-center gap-6">
                    <Link href="/dashboard/profile" className="flex flex-col items-center gap-1 text-graphite hover:text-main transition-colors group">
                        <div className="h-10 w-10 rounded-full bg-surface border border-border-subtle flex items-center justify-center group-hover:border-main/50 group-hover:bg-main/5 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Scholar Profile</span>
                    </Link>
                </div>
            </footer>
        </div>
    );
}
