import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t border-gray-100 mt-auto bg-white pt-16 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                <div className="w-32 h-10 relative mb-6">
                    <Image src="/logo.jpg" alt="Footer Logo" fill className="object-contain object-left" />
                </div>
                <p className="text-[#64748B] text-[13px] max-w-sm leading-loose">
                    Dicoding Space<br />
                    Jl. Batik Kumeli No.50, Sukaluyu,<br />
                    Kec. Cibeunying Kaler, Kota Bandung Jawa<br />
                    Barat 40123
                </p>
            </div>
        </footer>
    );
}