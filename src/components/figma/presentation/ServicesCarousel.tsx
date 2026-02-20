"use client";

import { useEffect, useState } from "react";
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
  const [viewportWidth, setViewportWidth] = useState<number>(1280);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const slidesToShow =
    viewportWidth < 640
      ? 1
      : viewportWidth < 960
        ? Math.min(2, Math.max(totalServices, 1))
        : viewportWidth < 1280
          ? Math.min(3, Math.max(totalServices, 1))
          : Math.min(4, Math.max(totalServices, 1));

  const shouldAutoplay = totalServices > slidesToShow;
  const sliderKey = `${slidesToShow}-${totalServices}`;

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
    <Slider key={sliderKey} {...settings} className="services-slider px-2 md:px-4">
      {services.map((service, index) => {
        const Icon = iconList[index % iconList.length];
        return (
          <div key={service.id} className="px-0.5 md:px-3 py-6 outline-none">
            <div className="w-full bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 h-full">
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
