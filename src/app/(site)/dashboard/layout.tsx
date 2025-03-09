"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  return (
    <div className="min-h-screen bg-dark">
      {/* Simple header with sign out button */}
      <header
        className={`left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "shadow-nav fixed z-[999] border-b border-dark-3/20 bg-dark/10 backdrop-blur-[5px]"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between py-4">
            <div className="w-60 max-w-full px-4">
              <Link
                href="/"
                className="text-xl font-bold text-white"
              >
                Ethical Voice
              </Link>
            </div>
            <div className="flex w-full items-center justify-end px-4">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-lg bg-primary px-6 py-2 text-base font-medium text-white duration-300 ease-in-out hover:bg-primary/80"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content with padding for header */}
      <main className="pt-24 pb-16">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
} 