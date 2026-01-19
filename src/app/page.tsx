import BannerCarousel from "@/components/common/BannerCarousel";
import StandardsExplorer from "@/components/standards/StandardsExplorer";
import { getStandards } from "@/lib/parsing";
import { AlertCircle, BookOpen, Sparkles, Rocket } from "lucide-react";

export default async function Home() {
  const standards = await getStandards();

  return (
    <div className="flex flex-col gap-0 pb-24">
      {/* Visual Header / Banner */}
      <BannerCarousel />

      {/* Hero Section with Rainbow Gradient */}
      <section className="rainbow-gradient py-24 -mt-24 relative z-10 overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">✨</div>
        <div className="absolute top-20 right-20 text-6xl opacity-20 animate-pulse">🎯</div>
        <div className="absolute bottom-10 left-1/4 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>📚</div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            {/* Emoji Icon with animation */}
            <div className="text-9xl emoji animate-bounce">🌟</div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-2xl">
              강쌤과 함께하는<br />성취탐색 🎓
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white font-bold max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              2022 개정 교육과정의 핵심 성취기준을<br />쉽고 재미있게 찾아보세요! 🚀
            </p>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-4">
              <div className="h-2 w-20 bg-white/80 rounded-full shadow-lg animate-pulse"></div>
              <div className="h-2 w-20 bg-white/60 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-20 bg-white/40 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Explorer Section */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="max-w-6xl mx-auto space-y-12">
          {standards && standards.length > 0 ? (
            <StandardsExplorer standards={standards} />
          ) : (
            <div className="chunky-card p-20 flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 blue-bg rounded-full flex items-center justify-center animate-pulse">
                <AlertCircle className="h-12 w-12 text-blue-600" />
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

      {/* Stats Section with Colorful Chunky Cards */}
      {standards && standards.length > 0 && (
        <section className="container mx-auto px-4 mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Total Standards Card - Purple/Pink Gradient */}
              <div className="chunky-card p-10 text-center space-y-4 hover:scale-105 transition-transform purple-gradient text-white">
                <div className="text-6xl emoji">📖</div>
                <p className="text-sm font-black text-white/90 uppercase tracking-wider">전체 성취기준</p>
                <p className="text-7xl font-black text-white drop-shadow-lg">{standards.length}</p>
              </div>

              {/* Subjects Card - Yellow */}
              <div className="chunky-card p-10 text-center space-y-4 hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)' }}>
                <div className="text-6xl emoji">🎓</div>
                <p className="text-sm font-black text-gray-800 uppercase tracking-wider">교과목</p>
                <p className="text-7xl font-black text-gray-900 drop-shadow-lg">3</p>
              </div>

              {/* Resources Card - Blue Gradient */}
              <div className="chunky-card p-10 text-center space-y-4 hover:scale-105 transition-transform blue-gradient text-white">
                <div className="text-6xl emoji">🔗</div>
                <p className="text-sm font-black text-white/90 uppercase tracking-wider">학습 자료</p>
                <p className="text-7xl font-black text-white drop-shadow-lg">183+</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
