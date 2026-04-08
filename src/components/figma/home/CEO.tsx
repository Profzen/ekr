"use client";

import { useRef } from "react";
import Slider from "react-slick";
import { Quote, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";

type CEOProps = {
  name: string;
  title: string;
  bio: string;
  quote: string;
  imageUrl: string;
};

export function CEO({ name, title, bio, quote, imageUrl }: CEOProps) {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 15000,
    arrows: false,
    fade: true,
    pauseOnHover: true,
    appendDots: (dots: React.ReactNode) => (
      <div style={{ bottom: "12px" }}>
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-muted-foreground/30 transition-all [.slick-active_&]:bg-primary [.slick-active_&]:w-6 [.slick-active_&]:rounded-full" />
    ),
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background via-background to-accent/5 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
      <div className="absolute top-10 right-10 w-32 h-32 border border-primary/10 rounded-full animate-pulse" />

      <div className="container mx-auto px-4 md:px-5 lg:px-6 max-w-[1500px] relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-4">
          {/* Photo section */}
          <div className="w-full lg:w-[40%] relative lg:translate-x-6 flex items-center">
            <div className="relative mx-auto lg:mx-0 w-full max-w-[370px] md:max-w-[420px] lg:max-w-[460px] aspect-square rounded-2xl overflow-hidden shadow-2xl bg-muted/20 ring-1 ring-border/20">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />

              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="whitespace-pre-line text-2xl md:text-3xl font-bold">{name}</h3>
                <p className="whitespace-pre-line text-lg md:text-xl text-white font-semibold tracking-wide">{title}</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-dots-pattern opacity-20" />
          </div>

          {/* Carousel section — matches photo height */}
          <div className="w-full lg:w-[60%] relative">
            <div className="h-full rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm shadow-lg p-6 md:p-8 flex flex-col relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-3xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-3xl" />

              {/* Navigation arrows */}
              <div className="absolute top-4 right-4 flex items-center gap-1 z-20">
                <button
                  onClick={() => sliderRef.current?.slickPrev()}
                  className="p-1.5 rounded-full text-muted-foreground/50 hover:text-primary hover:bg-primary/10 transition-all duration-200 border border-transparent hover:border-primary/20"
                  aria-label="Précédent"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => sliderRef.current?.slickNext()}
                  className="p-1.5 rounded-full text-muted-foreground/50 hover:text-primary hover:bg-primary/10 transition-all duration-200 border border-transparent hover:border-primary/20"
                  aria-label="Suivant"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-hidden flex flex-col justify-center [&_.slick-slider]:h-full [&_.slick-list]:h-full [&_.slick-track]:h-full [&_.slick-slide>div]:h-full">
                <Slider ref={sliderRef} {...settings}>
                  {/* Slide 1: Message du DG */}
                  <div>
                    <div className="flex flex-col justify-center h-full">
                      <div>
                        <div className="relative mb-4">
                          <Quote className="absolute -top-2 -left-2 text-primary/15 w-14 h-14 transform -scale-x-100" />
                          <blockquote className="whitespace-pre-line text-base md:text-lg lg:text-xl font-serif italic text-foreground leading-relaxed relative z-10 pl-4 border-l-2 border-primary/30">
                            &ldquo;{quote}&rdquo;
                          </blockquote>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-3 text-primary font-semibold hover:text-primary/80 transition-colors group mt-4"
                      >
                        <span className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Linkedin size={18} />
                        </span>
                        <span className="text-sm">Suivre sur LinkedIn</span>
                      </a>
                    </div>
                  </div>

                  {/* Slide 2: Biographie */}
                  <div>
                    <div className="flex flex-col justify-center h-full">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-1 h-6 bg-primary rounded-full" />
                          <h4 className="text-lg font-semibold text-foreground">Biographie</h4>
                        </div>
                        <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                          <p className="whitespace-pre-line">{bio}</p>
                          <p>
                            Sous sa direction, EKR Africa Agrovision Group s&apos;est imposé comme un acteur incontournable,
                            tissant des liens solides entre les producteurs locaux et les marchés internationaux.
                          </p>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-3 text-primary font-semibold hover:text-primary/80 transition-colors group mt-4"
                      >
                        <span className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Linkedin size={18} />
                        </span>
                        <span className="text-sm">Suivre sur LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
