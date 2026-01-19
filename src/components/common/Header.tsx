import Link from 'next/link';
import { Search, Home, Settings } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full purple-gradient shadow-lg">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-black text-white flex items-center gap-3 hover:scale-105 transition-transform">
                    <div className="w-12 h-12 yellow-button flex items-center justify-center rounded-2xl shadow-lg">
                        <span className="text-xl">📚</span>
                    </div>
                    <span className="hidden sm:inline">성취기준 탐색</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="chunky-button bg-white/10 text-white hover:bg-white/20 flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        홈
                    </Link>
                    <Link href="/admin" className="chunky-button bg-white/10 text-white hover:bg-white/20 flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        관리자
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="성취기준 검색..."
                            className="pl-12 pr-4 py-3 bg-white rounded-full text-gray-700 outline-none text-sm font-medium w-48 focus:w-64 transition-all shadow-lg focus:shadow-xl"
                        />
                    </div>
                    <button className="md:hidden w-12 h-12 yellow-button rounded-full flex items-center justify-center">
                        <Search className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
