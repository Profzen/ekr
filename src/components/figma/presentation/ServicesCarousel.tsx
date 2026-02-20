"use client";

import Slider from "react-slick";
import { Sprout, Ship, Leaf, TrendingUp } from "lucide-react";

type ServiceItem = {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
};

type ServicesCarouselProps = {
  services: ServiceItem[];
};

const iconList = [Sprout, Ship, Leaf, TrendingUp];

export function ServicesCarousel({ services }: ServicesCarouselProps) {
  const totalServices = services.length;
  const desktopSlides = Math.min(Math.max(totalServices, 1), 4);
  const tabletSlides = totalServices >= 2 ? 2 : 1;
  const shouldAutoplay = totalServices > desktopSlides;

  const settings = {
    dots: true,
    infinite: shouldAutoplay,
    speed: 500,
    slidesToShow: desktopSlides,
    slidesToScroll: 1,
    autoplay: shouldAutoplay,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: tabletSlides } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Slider {...settings} className="services-slider px-4">
      {services.map((service, index) => {
        const Icon = iconList[index % iconList.length];
        return (
          <div key={service.id} className="px-3 py-6 outline-none">
            <div className="mx-auto max-w-[340px] bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 h-full">
              <div className="h-48 overflow-hidden relative">
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-primary">
                  <Icon size={20} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
}
