import { MapPin, Briefcase, Building2 } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export interface JobCardProps {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    experience: string;
    postedAt: string;
    deadline: string;
    logoUrl: string;
}

export function JobCard({ id, title, company, location, type, experience, postedAt, deadline, logoUrl }: JobCardProps) {
    const router = useRouter();
    const { isLoggedIn } = useAuthStore();

    const handleCardClick = () => {
        if (!isLoggedIn) {
            router.push("/login");
        } else {
            router.push(`/jobs/${id}`);
        }
    };
    return (
        <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300" onClick={handleCardClick}>
            <div className="w-16 h-16 shrink-0 relative rounded-md overflow-hidden bg-gray-50 border border-gray-100">
                <Image src={logoUrl} alt={company} fill className="object-contain" />
            </div>

            <div className="flex-1 flex flex-col sm:flex-row justify-between">
                <div className="space-y-3">
                    <h3 className="text-[17px] font-bold text-gray-900">{title}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-700">
                        <div className="flex items-center gap-1.5">
                            <Building2 size={15} className="text-gray-500" />
                            {company}
                        </div>
                        <div className="text-gray-500">{type}</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-700">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={15} className="text-gray-500" />
                            {location}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Briefcase size={15} className="text-gray-500" />
                            {experience}
                        </div>
                    </div>
                </div>

                <div className="mt-4 sm:mt-0 text-left sm:text-right text-[11px] text-gray-500 space-y-2 flex flex-col justify-start pt-1">
                    <p>Dibuat pada {postedAt}</p>
                    <p>Lamar sebelum {deadline}</p>
                </div>
            </div>
        </div>
    );
}

export function JobCardSkeleton() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <Skeleton className="w-16 h-16 rounded-md shrink-0" />
            <div className="flex-1 flex flex-col sm:flex-row justify-between">
                <div className="space-y-3 w-full max-w-md">
                    <Skeleton className="h-5 w-48" />
                    <div className="flex gap-4">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                    <div className="flex gap-4">
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
                <div className="mt-4 sm:mt-0 space-y-2 flex flex-col items-start sm:items-end w-full sm:w-48 pt-1">
                    <Skeleton className="h-2 w-full sm:w-32" />
                    <Skeleton className="h-2 w-full sm:w-36" />
                </div>
            </div>
        </div>
    );
}