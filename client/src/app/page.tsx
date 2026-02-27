"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import heroImage from "../../public/images/campus-hero.webp";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      }
    };
    checkAuth();
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-app-bg text-ink font-body selection:bg-main/20">
      <header className="fixed top-0 z-50 w-full border-b border-border-subtle bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8 lg:px-16">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-main text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
            </div>
            <span className="font-heading text-2xl font-bold text-main">
              Classroom Buddy
            </span>
          </div>
          <nav className="flex items-center gap-6">
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="text-sm font-bold text-ink hover:text-main transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="h-10 px-6 rounded-btn bg-main text-sm font-bold text-white transition-all hover:bg-main/90 shadow-soft flex items-center">
                  Get Started
                </Link>
              </>
            ) : (
              <Link href="/dashboard" className="h-10 px-6 rounded-btn bg-main text-sm font-bold text-white transition-all hover:bg-main/90 shadow-soft flex items-center">
                Dashboard
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-main/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl -z-10"></div>

          <div className="mx-auto max-w-7xl px-8 lg:px-16">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest rounded-full mb-8">
                  The Academic Protocol
                </div>
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-main mb-6 leading-[1.1]">
                  A sanctuary for <br />
                  <span className="text-secondary">shared knowledge.</span>
                </h1>
                <p className="text-xl text-graphite mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  Classroom Buddy is the centralized platform designed for students to organize, access, and distribute academic resources with elegant efficiency.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href="/dashboard" className="h-14 px-8 rounded-btn bg-main text-white font-bold text-lg transition-all hover:bg-main/90 shadow-soft flex items-center justify-center w-full sm:w-auto active:scale-[0.98]">
                    Open the Vault
                  </Link>
                  <Link href="#features" className="h-14 px-8 rounded-btn border border-border-subtle bg-surface text-ink font-bold text-lg transition-all hover:border-main/50 hover:bg-surface/50 flex items-center justify-center w-full sm:w-auto">
                    Explore Features
                  </Link>
                </div>
              </div>

              <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
                <div className="aspect-square relative rounded-full overflow-hidden border-8 border-surface shadow-2xl bg-main/5">
                  <div className="absolute inset-0 flex items-center justify-center text-main opacity-20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                  </div>
                  <Image
                    src={heroImage}
                    alt="Campus Architecture"
                    fill
                    placeholder="blur"
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-main/40 to-transparent mix-blend-multiply"></div>
                </div>

                <div className="absolute -bottom-8 -left-8 bg-surface p-6 rounded-2xl shadow-xl border border-border-subtle hidden md:block animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">New Material Shelved</p>
                      <p className="text-xs text-graphite">Algorithms Architecture</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-surface border-y border-border-subtle relative z-10">
          <div className="mx-auto max-w-7xl px-8 lg:px-16">
            <div className="text-center mb-16 px-4">
              <h2 className="font-heading text-4xl font-bold text-main mb-4">Curated for Excellence</h2>
              <p className="text-graphite max-w-2xl mx-auto text-lg pt-2 border-t w-64 border-main/20">The tools you need to succeed.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-[24px] bg-app-bg border border-border-subtle transition-all hover:shadow-soft hover:border-main/20 group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-border-subtle flex items-center justify-center text-main mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" /><polyline points="14 2 14 8 20 8" /><path d="m3 15 2 2 4-4" /></svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-ink mb-3">Centralized Repository</h3>
                <p className="text-graphite leading-relaxed">Access all your syllabi, lecture notes, and assignments perfectly organized by discipline in one secure location.</p>
              </div>

              <div className="p-8 rounded-[24px] bg-app-bg border border-border-subtle transition-all hover:shadow-soft hover:border-secondary/20 group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-border-subtle flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-ink mb-3">Community Driven</h3>
                <p className="text-graphite leading-relaxed">Knowledge is meant to be shared. Upload your own insights and benefit from the collective intelligence of your peers.</p>
              </div>

              <div className="p-8 rounded-[24px] bg-app-bg border border-border-subtle transition-all hover:shadow-soft hover:border-main/20 group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-border-subtle flex items-center justify-center text-main mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-ink mb-3">Academic Security</h3>
                <p className="text-graphite leading-relaxed">Built with a robust, privacy-first architecture ensuring your academic resources and personal data remain strictly protected.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-app-bg text-center">
        <p className="font-heading font-bold text-main mb-2">Classroom Buddy</p>
        <p className="text-sm text-graphite mb-6">Designed for the pursuit of excellence.</p>
        <div className="text-xs text-graphite/60">&copy; {new Date().getFullYear()} Classroom Buddy. All rights reserved.</div>
      </footer>
    </div>
  );
}
