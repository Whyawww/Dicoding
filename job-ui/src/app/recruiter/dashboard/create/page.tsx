import { CreateJobForm } from "@/components/features/CreateJobForm";
import Image from "next/image";
import { Footer } from "@/components/layouts/Footer";

export default function CreateJobPage() {
    return (
        <div className="w-full bg-white font-sans min-h-screen pb-20">

            <div className="bg-[#1c1d21] w-full py-12 px-6 lg:px-24 flex items-center justify-between">
                <div className="max-w-3xl">
                    <h1 className="text-3xl font-bold text-white mb-3">Buat lowongan pekerjaan</h1>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                        Dicoding Jobs menghubungkan industri dengan talenta yang tepat.
                        Mencari tim baru tidak harus melelahkan dan boros biaya.
                    </p>
                </div>

                <div className="hidden md:block w-48 h-12 relative rounded-full overflow-hidden border-2 border-white/10">
                    <Image
                        src="/office.jpg"
                        alt="Ornamen"
                        fill
                        sizes="192px"
                        className="object-cover"
                    />
                </div>
            </div>

            <div className="px-6 lg:px-24 pt-10">
                <CreateJobForm />
            </div>
            <Footer />
        </div>
    );
}