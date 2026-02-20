"use client";

import Slider from "react-slick";
import { Linkedin, Mail } from "lucide-react";

type TeamMember = {
  id: string | number;
  name: string;
  role: string;
  imageUrl: string;
};

type TeamCarouselProps = {
  members: TeamMember[];
};

export function TeamCarousel({ members }: TeamCarouselProps) {
  const totalMembers = members.length;
  const desktopSlides = totalMembers >= 3 ? 3 : Math.max(totalMembers, 1);
  const tabletSlides = totalMembers >= 2 ? 2 : 1;
  const isSingleMember = totalMembers === 1;

  const settings = {
    dots: false,
    infinite: totalMembers > desktopSlides,
    speed: 500,
    slidesToShow: desktopSlides,
    slidesToScroll: 1,
    autoplay: totalMembers > 1,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: tabletSlides },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-border/60 bg-background/80 p-4 md:p-6">
      <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Notre Équipe
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Des experts passionnés au service de l'excellence agricole.
          </p>
      </div>

      <Slider {...settings} className="team-carousel">
          {members.map((member) => (
            <div key={member.id} className="px-3">
              <div className={`relative group ${isSingleMember ? "mx-auto max-w-[340px]" : ""}`}>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-3 justify-center w-full">
                      <button className="rounded-full bg-white p-3 text-primary hover:bg-primary hover:text-white transition-colors shadow-lg">
                        <Linkedin size={20} />
                      </button>
                      <button className="rounded-full bg-white p-3 text-primary hover:bg-primary hover:text-white transition-colors shadow-lg">
                        <Mail size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
