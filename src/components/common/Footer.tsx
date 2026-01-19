export default function Footer() {
    return (
        <footer className="rainbow-gradient py-16 mt-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-black text-white mb-2 drop-shadow-lg">강쌤과 함께하는 성취탐색 🌟</p>
                        <p className="text-sm text-white/80 font-medium">2022 개정 교육과정 플랫폼</p>
                    </div>
                    <div className="text-sm text-white/70 font-medium px-6 py-3 bg-white/20 rounded-full backdrop-blur-sm">
                        © 2026 교육과정 아카이브. All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
