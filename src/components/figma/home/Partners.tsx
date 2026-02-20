"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";

type Partner = {
  id: string | number;
  name: string;
  logoUrl?: string;
};

type PartnersProps = {
  partners: Partner[];
};

export function Partners({ partners }: PartnersProps) {
  const totalPartners = partners.length;
  const [viewportWidth, setViewportWidth] = useState<number>(1280);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const slidesToShow =
    viewportWidth < 768
      ? Math.min(2, Math.max(totalPartners, 1))
      : viewportWidth < 1024
        ? Math.min(3, Math.max(totalPartners, 1))
        : Math.min(4, Math.max(totalPartners, 1));

  const shouldAutoplay = totalPartners > slidesToShow;
  const sliderKey = `${slidesToShow}-${totalPartners}`;

  const settings = {
    dots: true,
    infinite: shouldAutoplay,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: shouldAutoplay,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 md:px-5 lg:px-6 max-w-[1500px] text-center">
        <h2 className="text-3xl font-bold mb-12 text-foreground">Nos Partenaires de Confiance</h2>

        <Slider key={sliderKey} {...settings} className="partners-slider">
          {partners.map((partner) => (
            <div key={partner.id} className="px-2 md:px-3 py-6 outline-none">
              <div className="mx-auto flex w-full max-w-[240px] items-center justify-center h-24 bg-white rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow p-3 group">
                {partner.logoUrl ? (
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-16 max-w-full object-contain"
                  />
                ) : (
                  <span className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                    {partner.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
