"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useIsClient } from "@/hooks/useIsClient";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { isLoggedIn, user, logout } = useAuthStore();
    const isClient = useIsClient();

    const dashboardHref = !isLoggedIn
        ? "/login"
        : user?.role === "recruiter"
            ? "/recruiter/dashboard"
            : "/dashboard";

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(path) || (path === dashboardHref && pathname.includes('dashboard'));
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                <div className="flex h-full items-center gap-10">
                    <Link href="/" className="relative h-7 w-20">
                        <Image
                            src="/dic-jobs.jpg"
                            alt="Dicoding Jobs"
                            fill
                            sizes="80px"
                            className="object-contain object-left"
                        />
                    </Link>

                    <nav className="hidden h-full items-center gap-8 text-[13px] font-semibold md:flex">
                        <Link
                            href="/"
                            className={`flex h-full items-center pt-[3px] hover:text-gray-900 transition-colors ${isActive("/")
                                    ? "border-b-[3px] border-gray-900 text-gray-900"
                                    : "text-gray-500 border-b-[3px] border-transparent"
                                }`}
                        >
                            Lowongan Kerja
                        </Link>
                        <Link
                            href={dashboardHref}
                            className={`flex h-full items-center pt-[3px] hover:text-gray-900 transition-colors ${isActive("/dashboard") || isActive("/recruiter/dashboard")
                                    ? "border-b-[3px] border-gray-900 text-gray-900"
                                    : "text-gray-500 border-b-[3px] border-transparent"
                                }`}
                        >
                            Dashboard
                        </Link>
                    </nav>
                </div>

                <div>
                    {!isClient ? (
                        <div className="h-9 w-20 animate-pulse rounded-md bg-gray-100" />
                    ) : !isLoggedIn ? (
                        <Link href="/login">
                            <Button className="h-9 rounded-md bg-[#18181B] px-6 text-sm text-white hover:bg-gray-800">
                                Log in
                            </Button>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <span className="hidden text-sm font-medium text-gray-700 sm:block">
                                Hi, {user?.name}
                            </span>
                            <Button
                                onClick={handleLogout}
                                className="h-9 rounded-md border-0 bg-red-50 px-4 text-sm text-red-600 shadow-none hover:bg-red-100"
                            >
                                Logout
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}