'use client';

import { MessageCircle } from 'lucide-react';

export default function ChatWidget() {
    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <button className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all">
                <MessageCircle className="h-8 w-8" />
            </button>
            {/* Chat Window Placeholder */}
        </div>
    );
}
