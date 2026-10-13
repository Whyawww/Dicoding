"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateVacancyPayload, vacancyService } from "@/services/vacancy.service";
import { AxiosError } from "axios";

interface CreateJobFormProps {
    vacancyId?: number;
}

export function CreateJobForm({ vacancyId }: CreateJobFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const isEditMode = Boolean(vacancyId);

    const [formData, setFormData] = useState<CreateVacancyPayload>({
        title: "", position: "", jobType: "", candidatesRequired: "",
        activeUntil: "", location: "", isRemote: false, description: "",
        minSalary: "", maxSalary: "", showSalary: false, minExperience: "",
    });

    const { data: existingData, isLoading: isLoadingData } = useQuery({
        queryKey: ["vacancy", vacancyId],
        queryFn: () => vacancyService.getVacancyById(vacancyId!),
        enabled: isEditMode,
        retry: false,
    });

    useEffect(() => {
        if (existingData) {
            setFormData(existingData);
        }
    }, [existingData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const mutation = useMutation({
        mutationFn: async (data: CreateVacancyPayload): Promise<void> => {
            if (isEditMode) {
                return vacancyService.updateVacancy(vacancyId!, data);
            } else {
                await vacancyService.createVacancy(data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myVacancies"] });
            queryClient.invalidateQueries({ queryKey: ["vacancies"] });
            queryClient.invalidateQueries({ queryKey: ["vacancy", vacancyId] });

            alert(isEditMode ? "Lowongan berhasil diperbarui!" : "Lowongan berhasil dibuat!");
            router.push("/recruiter/dashboard");
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            console.error("Error response:", error.response?.data);
            alert(error.response?.data?.message || "Terjadi kesalahan. Periksa kembali input Anda.");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const handleCancel = () => {
        router.push("/recruiter/dashboard");
    };

    if (isEditMode && isLoadingData) {
        return <div className="py-12 text-gray-500">Memuat data lowongan untuk diedit...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-[600px]">

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Judul lowongan <span className="text-red-500">*</span></label>
                <input
                    type="text"
                    name="title"
                    placeholder="Masukkan judul lowongan"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <p className="text-xs text-gray-500">Contoh: Android Native Developer</p>
            </div>

            {/* Posisi */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Posisi <span className="text-red-500">*</span></label>
                <select
                    name="position"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-900 bg-white"
                    value={formData.position}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Pilih posisi yang dicari</option>
                    <option value="frontend">Frontend Developer</option>
                    <option value="backend">Backend Developer</option>
                    <option value="uiux">UI/UX Designer</option>
                </select>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-900">Tipe pekerjaan <span className="text-red-500">*</span></label>
                <div className="space-y-2">
                    {["Full-Time", "Part-Time", "Kontrak", "Intern"].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="jobType"
                                value={type}
                                checked={formData.jobType === type}
                                onChange={handleChange}
                                className="w-4 h-4 text-[#18181B] border-gray-300 focus:ring-[#18181B]"
                                required
                            />
                            <span className="text-sm text-gray-700">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Kandidat yang dibutuhkan <span className="text-red-500">*</span></label>
                <input
                    type="number"
                    name="candidatesRequired"
                    placeholder="Masukkan jumlah kandidat yang dibutuhkan"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
                    value={formData.candidatesRequired}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Aktif hingga <span className="text-red-500">*</span></label>
                <input
                    type="date"
                    name="activeUntil"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
                    value={formData.activeUntil}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Lokasi */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Lokasi <span className="text-red-500">*</span></label>
                <select
                    name="location"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-900 bg-white"
                    value={formData.location}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Pilih lokasi</option>
                    <option value="jakarta">Jakarta</option>
                    <option value="bandung">Bandung</option>
                    <option value="surabaya">Surabaya</option>
                </select>
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name="isRemote"
                        checked={formData.isRemote}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-[#18181B] focus:ring-[#18181B]"
                    />
                    <span className="text-sm text-gray-700">Bisa remote</span>
                </label>
            </div>

            {/* Deskripsi */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Deskripsi <span className="text-red-500">*</span></label>
                <textarea
                    name="description"
                    rows={8}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
                    placeholder="Sebagai [Posisi Lowongan], Anda akan berpartisipasi dalam proses pembangunan aplikasi yang sedang dibangun dalam perusahaan..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <p className="text-xs text-gray-500">Anda bisa mengubah templat yang telah disediakan di atas.</p>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Rentang gaji per bulan <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-3">
                    <div className="flex-1 flex border border-gray-300 rounded-md overflow-hidden">
                        <span className="bg-gray-50 px-3 py-2 text-sm border-r border-gray-300 text-gray-500">Rp</span>
                        <input
                            type="number"
                            name="minSalary"
                            placeholder="Minimum"
                            className="flex-1 px-3 py-2 text-sm focus:outline-none"
                            value={formData.minSalary}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <span className="text-gray-500">-</span>
                    <div className="flex-1 flex border border-gray-300 rounded-md overflow-hidden">
                        <span className="bg-gray-50 px-3 py-2 text-sm border-r border-gray-300 text-gray-500">Rp</span>
                        <input
                            type="number"
                            name="maxSalary"
                            placeholder="Maksimum (opsional)"
                            className="flex-1 px-3 py-2 text-sm focus:outline-none"
                            value={formData.maxSalary}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Anda tidak perlu mengisi kolom Maksimum jika yang dimasukkan adalah gaji pokok.</p>

                <div
                    className="flex items-center gap-3 mt-4 cursor-pointer w-fit"
                    onClick={() => setFormData(prev => ({ ...prev, showSalary: !prev.showSalary }))}
                >
                    <div
                        className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out ${formData.showSalary ? "bg-[#18181B]" : "bg-gray-300"
                            }`}
                    >
                        <div
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${formData.showSalary ? "translate-x-5" : "translate-x-0"
                                }`}
                        />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Tampilkan gaji</span>
                </div>
                <p className="text-xs text-gray-500 ml-6">Gaji akan ditampilkan di lowongan pekerjaan dan dapat dilihat oleh kandidat.</p>
            </div>

            {/* Pengalaman Kerja */}
            <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-900">Minimum pengalaman bekerja <span className="text-red-500">*</span></label>
                <div className="space-y-2">
                    {["Kurang dari 1 tahun", "1 - 3 tahun", "4 - 5 tahun", "6 - 10 tahun", "Lebih dari 10 tahun"].map((exp) => (
                        <label key={exp} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="minExperience"
                                value={exp}
                                checked={formData.minExperience === exp}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                required
                            />
                            <span className="text-sm text-gray-700">{exp}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-start gap-3 pt-5 border-t border-gray-100">
                <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-fit h-9 px-5 text-sm font-medium bg-[#2A3546] hover:bg-gray-800 text-white rounded-md shadow-sm disabled:opacity-70"
                >
                    {mutation.isPending ? "Menyimpan..." : isEditMode ? "Simpan Perubahan" : "Buat lowongan"}
                </Button>
                <Button
                    type="button"
                    onClick={handleCancel}
                    disabled={mutation.isPending}
                    className="w-fit h-9 px-5 text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md shadow-sm"
                >
                    Batal
                </Button>
            </div>
        </form>
    );
}