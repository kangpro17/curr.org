export default function Footer() {
    return (
        <footer className="bg-[#002147] py-24 border-t-8 border-[#D4AF37]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-classic text-[#D4AF37] mb-3 tracking-[0.2em]">ETHEREAL ACADEMY</p>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">Institutional Repository of Curriculum Excellence</p>
                    </div>
                    <div className="text-[10px] text-[#D4AF37]/50 font-black uppercase tracking-[0.2em] border border-[#D4AF37]/20 px-6 py-2 rounded-sm">
                        © 2026 Institutional Archives. All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
