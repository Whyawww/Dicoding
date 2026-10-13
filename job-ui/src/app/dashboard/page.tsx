"use client";
import { useQuery } from "@tanstack/react-query";
import { applicationService } from "@/services/application.service";
import { Building2, MapPin } from "lucide-react";

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function SeekerDashboardPage() {
    const { data: applications = [], isLoading, isError } = useQuery({
        queryKey: ["myApplications"],
        queryFn: applicationService.getMyApplications,
    });

    return (
        <div className="w-full max-w-4xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Riwayat Lamaran Saya</h1>
            </div>

            <div className="flex flex-col gap-4">
                {isLoading ? (
                    <div className="py-12 text-center text-gray-500">Memuat riwayat lamaran...</div>
                ) : isError ? (
                    <div className="py-8 text-center text-red-500 border border-red-200 rounded-xl bg-red-50">Gagal memuat data.</div>
                ) : applications.length === 0 ? (
                    <div className="py-12 text-center text-gray-500 border border-dashed border-gray-200 rounded-xl">
                        Anda belum melamar pekerjaan apapun.
                    </div>
                ) : (
                    applications.map((app) => (
                        <div key={app.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{app.vacancy.title}</h3>
                                    <div className="flex items-center gap-4 mt-2 text-[13px] text-gray-500">
                                        <div className="flex items-center gap-1.5">
                                            <Building2 size={14} /> <span>{app.vacancy.company_name}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={14} /> <span>{app.vacancy.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-wider rounded-full border border-blue-100">
                                        {app.status}
                                    </span>
                                    <span className="text-[11px] text-gray-400">Dilamar pada: {formatDate(app.created_at)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}