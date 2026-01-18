import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-[#002147] border-b border-[#D4AF37]/30 shadow-2xl">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-classic text-[#D4AF37] tracking-[0.15em] flex items-center gap-3">
                    <div className="w-10 h-10 border-2 border-[#D4AF37] flex items-center justify-center rounded-sm">
                        <span className="text-sm font-bold">22</span>
                    </div>
                    <span className="hidden sm:inline">ETHEREAL ACADEMY</span>
                </Link>

                <nav className="hidden md:flex items-center gap-10">
                    <Link href="/" className="text-xs font-bold text-white/80 hover:text-[#D4AF37] uppercase tracking-[0.2em] transition-all border-b border-transparent hover:border-[#D4AF37] pb-1">성취기준 탐색</Link>
                    <Link href="/admin" className="text-xs font-bold text-white/50 hover:text-[#D4AF37] uppercase tracking-[0.2em] transition-all border-b border-transparent hover:border-[#D4AF37] pb-1">관리자 공간</Link>
                </nav>

                <div className="flex items-center gap-6">
                    <div className="relative hidden sm:block group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D4AF37]/50 group-focus-within:text-[#D4AF37] transition-colors" />
                        <input
                            type="text"
                            placeholder="ARCHIVE SEARCH..."
                            className="pl-10 pr-4 py-2 bg-white/5 text-white/80 border border-white/10 rounded-sm focus:border-[#D4AF37]/50 outline-none text-[10px] font-bold uppercase tracking-widest transition-all w-48 focus:w-64"
                        />
                    </div>
                    <button className="md:hidden p-2 text-[#D4AF37]">
                        <Search className="h-6 w-6" />
                    </button>
                    <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
                    <span className="text-[10px] font-black text-[#D4AF37] tracking-[0.1em] hidden md:block">EST. 2022</span>
                </div>
            </div>
        </header>
    );
}
