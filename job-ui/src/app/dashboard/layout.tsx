"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Navbar } from "@/components/layouts/Navbar";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function SeekerDashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isLoggedIn, user } = useAuthStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (isMounted) {
            if (!isLoggedIn) router.replace("/login");
            else if (user?.role !== "seeker") router.replace("/");
        }
    }, [isLoggedIn, user, router, isMounted]);

    if (!isMounted || !isLoggedIn || user?.role !== "seeker") return null;

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
            <Navbar />
            <div className="flex flex-col md:flex-row flex-1 max-w-7xl mx-auto w-full">
                <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 bg-white flex flex-col pt-4 md:pt-8 shrink-0">
                    <nav className="flex flex-row md:flex-col gap-1 px-3 pb-4 md:pb-0 overflow-x-auto whitespace-nowrap">
                        <Link href="/dashboard" className="flex items-center gap-2 md:gap-3 px-3 py-2.5 bg-gray-100 text-gray-900 rounded-md text-[14px] font-semibold">
                            <FileText size={18} />
                            Riwayat Lamaran
                        </Link>
                    </nav>
                </aside>
                <main className="flex-1 p-4 sm:p-6 md:p-8 bg-white min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}