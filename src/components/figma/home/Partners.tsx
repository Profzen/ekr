"use client";

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
  const desktopSlides = totalPartners >= 4 ? 4 : Math.max(totalPartners, 1);
  const tabletSlides = totalPartners >= 3 ? 3 : Math.max(totalPartners, 1);
  const mobileSlides = totalPartners >= 2 ? 2 : 1;

  const settings = {
    dots: true,
    infinite: totalPartners > desktopSlides,
    speed: 500,
    slidesToShow: desktopSlides,
    slidesToScroll: 1,
    autoplay: totalPartners > desktopSlides,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: tabletSlides },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: mobileSlides,
          infinite: totalPartners > mobileSlides,
          autoplay: totalPartners > mobileSlides,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: mobileSlides,
          infinite: totalPartners > mobileSlides,
          autoplay: totalPartners > mobileSlides,
          autoplaySpeed: 2000,
        },
      },
    ],
  };

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 md:px-5 lg:px-6 max-w-[1500px] text-center">
        <h2 className="text-3xl font-bold mb-12 text-foreground">Nos Partenaires de Confiance</h2>

        <Slider {...settings} className="partners-slider">
          {partners.map((partner) => (
            <div key={partner.id} className="px-3 py-6 outline-none">
              <div className="mx-auto flex max-w-[220px] items-center justify-center h-24 bg-white rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow p-3 group">
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
