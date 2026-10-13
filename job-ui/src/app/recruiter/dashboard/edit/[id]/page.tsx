"use client";

import { CreateJobForm } from "@/components/features/CreateJobForm";
import { useParams } from "next/navigation";

export default function EditJobPage() {
    const params = useParams();
    const id = Number(params.id);

    return (
        <div className="w-full bg-white font-sans min-h-screen pb-20">
            <div className="bg-[#1c1d21] w-full py-12 px-6 lg:px-24 flex items-center justify-between">
                <div className="max-w-3xl">
                    <h1 className="text-3xl font-bold text-white mb-3">Edit Lowongan Pekerjaan</h1>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                        Perbarui informasi lowongan pekerjaan Anda agar selalu relevan dengan kebutuhan talenta saat ini.
                    </p>
                </div>
            </div>

            <div className="px-6 lg:px-24 pt-10">
                <CreateJobForm vacancyId={id} />
            </div>
        </div>
    );
}