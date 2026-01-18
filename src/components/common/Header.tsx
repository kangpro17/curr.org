import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-black text-indigo-600 tracking-tighter">
                    2022 CURRICULUM
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors">성취기준 탐색</Link>
                    <Link href="/admin" className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors">관리자 공간</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="빠른 검색..."
                            className="pl-10 pr-4 py-2 bg-gray-50 rounded-full border border-transparent focus:border-indigo-100 outline-none text-sm font-medium transition-all"
                        />
                    </div>
                    <button className="md:hidden p-2 text-gray-500">
                        <Search className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
