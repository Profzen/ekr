import { Hero } from "../components/home/Hero";
import { Stats } from "../components/home/Stats";
import { Intro } from "../components/home/Intro";
import { Services } from "../components/home/Services";
import { CEO } from "../components/home/CEO";
import { Activities } from "../components/home/Activities";
import { ArticlesPreview } from "../components/home/ArticlesPreview";
import { Partners } from "../components/home/Partners";

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Stats />
      <Intro />
      <Services />
      <CEO />
      <Activities />
      <ArticlesPreview />
      <Partners />
    </div>
  );
}
