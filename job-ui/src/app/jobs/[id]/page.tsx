"use client"
import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, Users } from "lucide-react";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/Button";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationService } from "@/services/application.service";
import { AxiosError } from "axios";

export default function JobDetailPage() {
    const { user } = useAuthStore();
    const router = useRouter();
    const params = useParams();
    const vacancyId = Number(params.id);
    const queryClient = useQueryClient();

    const applyMutation = useMutation({
        mutationFn: () => applicationService.applyJob(vacancyId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myApplications"] });
            alert("Berhasil melamar pekerjaan ini!");
            router.push("/dashboard");
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            alert(error.response?.data?.message || "Terjadi kesalahan saat melamar.");
        }
    });

    const handleApply = () => {
        if (!user) {
            router.push("/login");
            return;
        }
        applyMutation.mutate();
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar />

            <div className="border-b border-gray-200 bg-white">
                <div className="max-w-5xl mx-auto px-6 py-10 flex items-start gap-6">
                    <div className="w-[88px] h-[88px] rounded-lg bg-[#2A3546] flex items-center justify-center shrink-0 overflow-hidden relative shadow-sm border border-gray-100">
                        <Image
                            src="/dic.jpg"
                            alt="Logo Dicoding"
                            fill
                            className="object-contain p-2"
                        />
                    </div>

                    <div className="flex flex-col justify-center pt-1">
                        <h1 className="text-[26px] font-bold text-gray-900 leading-tight mb-1.5">
                            Product Engineer
                        </h1>
                        <p className="text-[13px] font-medium text-gray-500 mb-4">
                            Sektor Bisnis: Technology
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-[13px] font-medium text-gray-600">
                            <div className="flex items-center gap-1.5">
                                <Building2 size={16} className="text-gray-400" />
                                <Link href="#" className="text-blue-500 hover:underline">
                                    Dicoding Indonesia
                                </Link>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin size={16} className="text-gray-400" />
                                <span>Bandung</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Users size={16} className="text-gray-400" />
                                <span>50-100 Karyawan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-3">
                {user?.role === "seeker" && (
                    <Button
                        onClick={handleApply}
                        disabled={applyMutation.isPending}
                        className="bg-[#18181B] hover:bg-gray-800 text-white shadow-sm border-0 px-8 h-10 disabled:opacity-70"
                    >
                        {applyMutation.isPending ? "Mengirim..." : "Lamar Pekerjaan Ini"}
                    </Button>
                )}
            </div>

            <main className="max-w-5xl mx-auto px-6 py-10 w-full flex-1">
                <div className="max-w-3xl">

                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/50 text-blue-500 text-[11px] font-bold tracking-wide mb-10">
                        Full-Time
                    </div>

                    <section className="mb-8">
                        <h2 className="text-[17px] font-bold text-gray-900 mb-3">Job Description</h2>
                        <div className="text-[14px] text-gray-700 leading-relaxed space-y-4">
                            <p>
                                As a Product Engineer, you will be joining the Product & Engineering team in building impactful products for Dicoding users. With your programming skills, you will be responsible for creating great experiences for our users.
                            </p>
                            <p>
                                We are looking for an engineer, who not only knows how to program with good functionality, but also solves user problems. When building <span className="underline decoration-gray-400 underline-offset-2">dicoding.com</span>, we always try to:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 mt-2 marker:text-gray-500">
                                <li>Give maximum impact from the solutions we built.</li>
                                <li>Live a balanced life (it is important for engineers to sleep well).</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-[17px] font-bold text-gray-900 mb-3">Responsibilities</h2>
                        <ul className="list-disc pl-5 space-y-1 text-[14px] text-gray-700 leading-relaxed marker:text-gray-500">
                            <li>Collaborate with designers and other stakeholders in analyzing problems and solutions to be built.</li>
                            <li>Develop and manage the <span className="underline decoration-gray-400 underline-offset-2">dicoding.com</span> platform.</li>
                            <li>Ensure all systems and components on <span className="underline decoration-gray-400 underline-offset-2">dicoding.com</span> run properly.</li>
                            <li>Write well-designed, easy-to-test, efficient, and clean code on both the front-end and back-end.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-[17px] font-bold text-gray-900 mb-3">Requirements</h2>
                        <div className="text-[14px] text-gray-700 leading-relaxed space-y-4">
                            <p>
                                When it comes to requirements, at Dicoding, we have no limitations on specific tools or technologies. We are open to any technology and tools that can meet the business needs and provide the best solutions for our users. With that in mind, here are the general requirements for a Product Engineer at Dicoding:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 mt-2 marker:text-gray-500">
                                <li>Proficiency in Git and Unix-based systems.</li>
                                <li>Good knowledge of web technologies.</li>
                                <li>Want to follow and learn the development culture in Dicoding: Test Driven Development.</li>
                                <li>Able to understand the requirements of a solution that will be built properly.</li>
                                <li>Having a growth mindset and high curiosity.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="text-[17px] font-bold text-gray-900 mb-5">Informasi Tambahan</h2>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-[13px] font-bold text-gray-900 mb-1">Pengalaman bekerja</h3>
                                <p className="text-[14px] text-gray-700">1-3 tahun</p>
                            </div>
                            <div>
                                <h3 className="text-[13px] font-bold text-gray-900 mb-1">Kandidat yang dibutuhkan</h3>
                                <p className="text-[14px] text-gray-700">1 kandidat</p>
                            </div>
                        </div>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    );
}