'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    ExternalLink,
    Image as ImageIcon,
    Bell,
    MessageSquare,
    ShieldCheck,
    User,
    LogOut,
    Loader2
} from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
            } else {
                setUser(user);
            }
            setLoading(false);
        };
        checkUser();
    }, [router, supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    const menuItems = [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { label: 'Resource Links', href: '/admin/links', icon: ExternalLink },
        { label: 'Banners', href: '/admin/banners', icon: ImageIcon },
        { label: 'Notices', href: '/admin/notices', icon: Bell },
        { label: 'Surveys', href: '/admin/surveys', icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col fixed inset-y-0 shadow-sm">
                <div className="p-8 border-b border-gray-50 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-black text-gray-900 tracking-tighter">Admin <span className="text-indigo-600">Pro</span></span>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-gray-400 hover:text-indigo-600 hover:bg-gray-50 transition-all group"
                        >
                            <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-gray-50 bg-gray-50/50">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl">
                        <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400">
                            <User className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-gray-900 truncate uppercase tracking-widest">Administrator</p>
                            <p className="text-[10px] text-gray-400 truncate font-medium">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full mt-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-black text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-72 flex-1 p-8 lg:p-12">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
