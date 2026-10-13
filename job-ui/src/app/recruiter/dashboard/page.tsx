"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DashboardJobCard } from "@/components/features/DashboardJobCard";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vacancyService } from "@/services/vacancy.service";
import { useRouter } from "next/navigation";

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
};

export default function RecruiterDashboardPage() {
    const queryClient = useQueryClient();

    const { data: jobs = [], isLoading, isError } = useQuery({
        queryKey: ["myVacancies"],
        queryFn: vacancyService.getMyVacancies,
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => vacancyService.deleteVacancy(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myVacancies"] });
            alert("Lowongan berhasil dihapus!");
        },
        onError: () => {
            alert("Terjadi kesalahan saat menghapus lowongan.");
        }
    });

    const router = useRouter();

    const handleEdit = (id: number) => {
        router.push(`/recruiter/dashboard/edit/${id}`);
    };

    const handleDelete = (id: number) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus lowongan ini?");
        if (confirmDelete) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="w-full max-w-4xl">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Lowongan Saya</h1>
                <Link href="/recruiter/dashboard/create">
                    <Button className="w-[158px] h-[36px] bg-[#2A3546] hover:bg-gray-800 text-white px-5 shadow-sm gap-2 rounded-md">
                        <Plus size={18} />
                        Buat lowongan
                    </Button>
                </Link>
            </div>

            {/* List */}
            <div className="flex flex-col gap-4">
                {isLoading ? (
                    <div className="py-12 text-center text-gray-500">Memuat data lowongan...</div>
                ) : isError ? (
                    <div className="py-8 text-center text-red-500 border border-red-200 rounded-xl bg-red-50">
                        Gagal memuat data. Silakan coba lagi.
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="py-12 text-center text-gray-500 border border-dashed border-gray-200 rounded-xl">
                        Anda belum memiliki lowongan pekerjaan.
                    </div>
                ) : (
                    jobs.map((job) => (
                        <DashboardJobCard
                            key={job.id}
                            title={job.title}
                            createdAt={formatDate(job.created_at)}
                            activeUntil={formatDate(job.active_until)}
                            onEdit={() => handleEdit(job.id)}
                            onDelete={() => handleDelete(job.id)}
                        />
                    ))
                )}
            </div>

        </div>
    );
}