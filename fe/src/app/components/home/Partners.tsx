import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { partners } from "../../../lib/data";

export function Partners() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-foreground">
          Nos Partenaires de Confiance
        </h2>
        
        <Slider {...settings} className="partners-slider">
          {partners.map((partner) => (
            <div key={partner.id} className="px-4 py-8 outline-none">
              <div className="flex items-center justify-center h-32 bg-white rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow p-6 group">
                {/* Simulated Logo */}
                <span className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
