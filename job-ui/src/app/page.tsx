"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { JobCard, JobCardSkeleton } from "@/components/features/JobCard";
import Image from "next/image";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { vacancyService } from "@/services/vacancy.service";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
};

export default function Home() {
  const [searchInput, setSearchInput] = useState("");

  const [debouncedSearch] = useDebounce(searchInput, 500);

  const { data: jobs = [], isLoading, isError } = useQuery({
    queryKey: ["vacancies", debouncedSearch],
    queryFn: () => vacancyService.getVacancies(debouncedSearch),
  });

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">

      <Navbar />

      <section className="bg-[#1c1d21] pt-20 pb-28 px-6 w-full relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h2 className="text-blue-500 text-lg mb-4">
              Dicoding Jobs
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-white leading-[1.2] tracking-tight">
              Temukan lowongan yang <br className="hidden md:block" />
              <span className="whitespace-nowrap">
                cocok untuk kamu
                <span className="relative ml-4 inline-block h-12 w-32 translate-y-1 overflow-hidden rounded-full align-middle md:h-14 md:w-44">
                  <Image
                    src="/office.jpg"
                    alt="Hero Image Pill"
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                </span>
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* DAFTAR LOKER */}
      <section className="max-w-5xl mx-auto px-6 py-12 w-full flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-900">
            Daftar Pekerjaan Terbaru
          </h2>

          <div className="w-full md:w-[320px]">
            <Input
              className="bg-white border-gray-200 h-10 text-[13px] rounded-lg"
              placeholder="Cari berdasarkan judul pekerjaan..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              icon={<Search size={16} className="text-gray-400" />}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))
          ) : isError ? (
            <div className="py-12 text-center text-red-500 border border-dashed border-red-200 rounded-xl bg-red-50">
              <p>Gagal mengambil data dari server. Pastikan backend Laravel menyala.</p>
            </div>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                id={job.id}
                key={job.id}
                title={job.title}
                company={job.company_name}
                location={job.location}
                type={job.job_type}
                experience={job.experience}
                postedAt={formatDate(job.created_at)}
                deadline={formatDate(job.active_until)}
                logoUrl="/logo.jpg"
              />
            ))
          ) : (
            <div className="py-12 text-center text-gray-500 border border-dashed border-gray-200 rounded-xl">
              <p>Pekerjaan dengan kata kunci <strong>{searchInput}</strong> tidak ditemukan.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}