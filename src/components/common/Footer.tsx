export default function Footer() {
    return (
        <footer className="bg-gray-50 py-20 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-xl font-black text-gray-900 mb-2 tracking-tighter">2022 Revised Curriculum Standards</p>
                        <p className="text-sm text-gray-400 font-medium">데이터 출처: 교육과정 정보 플랫폼 (RDF/TTL)</p>
                    </div>
                    <div className="text-sm text-gray-400 font-bold">
                        © 2026 Curriculum Project. All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
