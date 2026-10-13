import { Clock, Upload, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface DashboardJobCardProps {
    title: string;
    createdAt: string;
    activeUntil: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function DashboardJobCard({ title, createdAt, activeUntil, onEdit, onDelete }: DashboardJobCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-[68px] h-[68px] shrink-0 bg-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden shadow-sm border border-gray-100">
                    <Image
                        src="/logo.jpg"
                        alt="Company Logo"
                        fill
                        className="object-contain p-2"
                    />
                </div>

                <div className="flex-1 flex flex-col justify-start">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-gray-500 font-medium">
                            <div className="flex items-center gap-1.5">
                                <Upload size={14} className="text-gray-400" />
                                <span>Dibuat: {createdAt}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={14} className="text-gray-400" />
                                <span>Aktif hingga: {activeUntil}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                        <Button
                            onClick={onEdit}
                            className="w-fit h-8 px-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-none gap-1.5 text-xs rounded"
                        >
                            <Edit3 size={14} />
                            Edit
                        </Button>
                        <Button
                            onClick={onDelete}
                            className="w-fit h-8 px-3 bg-red-50 text-red-600 hover:bg-red-100 border-0 shadow-none gap-1.5 text-xs rounded"
                        >
                            <Trash2 size={14} />
                            Hapus
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}