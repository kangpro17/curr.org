import BannerCarousel from "@/components/common/BannerCarousel";
import StandardsExplorer from "@/components/standards/StandardsExplorer";
import { getStandards } from "@/lib/parsing";
import { AlertCircle, BookOpen, Sparkles } from "lucide-react";

export default async function Home() {
  const standards = await getStandards();

  return (
    <div className="flex flex-col gap-0 pb-24">
      {/* Visual Header / Banner */}
      <BannerCarousel />

      {/* Hero Section with Purple Gradient */}
      <section className="purple-gradient py-20 -mt-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            {/* Emoji Icon */}
            <div className="text-8xl emoji">📚</div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-lg">
              성취기준 탐색 🎯
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed">
              2022 개정 교육과정의 핵심 성취기준을 쉽고 빠르게 찾아보세요!
            </p>

            {/* Decorative Line */}
            <div className="h-1 w-32 bg-yellow-accent mx-auto rounded-full shadow-lg" />
          </div>
        </div>
      </section>

      {/* Search & Explorer Section */}
      <section className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="max-w-6xl mx-auto space-y-12">
          {standards && standards.length > 0 ? (
            <StandardsExplorer standards={standards} />
          ) : (
            <div className="chunky-card p-20 flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 pink-bg rounded-full flex items-center justify-center">
                <AlertCircle className="h-12 w-12 text-purple-600" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-gray-900">자료를 불러올 수 없습니다</h3>
                <p className="text-gray-500 font-medium max-w-sm mx-auto text-lg">
                  잠시 후 다시 시도해주세요. 문제가 계속되면 관리자에게 문의하세요.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section with Chunky Cards */}
      {standards && standards.length > 0 && (
        <section className="container mx-auto px-4 mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Total Standards Card */}
              <div className="chunky-card p-10 text-center space-y-4 hover:scale-105 transition-transform">
                <div className="text-5xl emoji">📖</div>
                <p className="text-sm font-black text-gray-500 uppercase tracking-wider">전체 성취기준</p>
                <p className="text-6xl font-black text-purple-600">{standards.length}</p>
              </div>

              {/* Subjects Card */}
              <div className="chunky-card p-10 text-center space-y-4 yellow-button hover:scale-105 transition-transform">
                <div className="text-5xl emoji">🎓</div>
                <p className="text-sm font-black text-gray-700 uppercase tracking-wider">교과목</p>
                <p className="text-6xl font-black text-gray-800">3</p>
              </div>

              {/* Resources Card */}
              <div className="chunky-card p-10 text-center space-y-4 purple-gradient text-white hover:scale-105 transition-transform">
                <div className="text-5xl emoji">🔗</div>
                <p className="text-sm font-black text-white/80 uppercase tracking-wider">학습 자료</p>
                <p className="text-6xl font-black text-white">183+</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
