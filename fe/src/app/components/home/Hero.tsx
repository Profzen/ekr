import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { siteContent } from "../../../lib/data";

export function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={siteContent.hero.image}
          alt="Agriculture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
          {siteContent.hero.title}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-10 opacity-90 leading-relaxed font-light max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {siteContent.hero.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <Link
            to="/services"
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-primary/30 flex items-center gap-2"
          >
            {siteContent.hero.ctaPrimary}
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-semibold transition-all"
          >
            {siteContent.hero.ctaSecondary}
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
        <div className="w-1 h-12 rounded-full bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white rounded-full animate-scroll-indicator"></div>
        </div>
      </div>
    </section>
  );
}
