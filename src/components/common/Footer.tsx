export default function Footer() {
    return (
        <footer className="purple-gradient py-16 mt-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-black text-white mb-2">2022 개정 교육과정 📚</p>
                        <p className="text-sm text-white/70 font-medium">성취기준 탐색 플랫폼</p>
                    </div>
                    <div className="text-sm text-white/60 font-medium px-6 py-3 bg-white/10 rounded-full">
                        © 2026 교육과정 아카이브. All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
