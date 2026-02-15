import connectToDatabase from "@/lib/db";
import ArticleModel from "@/models/Article";
import ServiceModel from "@/models/Service";
import PartnerModel from "@/models/Partner";
import DirectorProfileModel from "@/models/DirectorProfile";
import SiteContentModel from "@/models/SiteContent";
import PartnersCarousel from "@/components/PartnersCarousel";

export const dynamic = "force-dynamic";

export default async function Home() {
  const activities = [
    "Optimisation des pratiques culturales",
    "Évaluation de projets agricoles",
    "Programmes d’irrigation durable",
    "Incubation et suivi de coopératives",
  ];

  let services: Array<{ _id: string; title: string; description: string }> = [];
  let partners: Array<{ _id: string; name: string; logoUrl?: string }> = [];
  let articles: Array<{
    _id: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    slug?: string;
    publishedAt?: Date | null;
  }> = [];
  let director: {
    name?: string;
    title?: string;
    photoUrl?: string;
    bio?: string;
    message?: string;
  } | null = null;
  let content: {
    homeMessage?: string;
    homeAbout?: string;
    homeHistory?: string;
    homeHeroBackgroundUrl?: string;
    homeStat1Value?: string;
    homeStat1Label?: string;
    homeStat2Value?: string;
    homeStat2Label?: string;
    homeStat3Value?: string;
    homeStat3Label?: string;
    homeStat4Value?: string;
    homeStat4Label?: string;
    presentationVision?: string;
    presentationMission?: string;
    presentationValues?: string;
  } | null = null;

  try {
    await connectToDatabase();

    const [fetchedServices, fetchedPartners, fetchedArticles, fetchedDirector, fetchedContent] =
      await Promise.all([
        ServiceModel.find({ isActive: true })
          .sort({ order: 1, createdAt: -1 })
          .limit(6)
          .lean(),
        PartnerModel.find({ isActive: true })
          .sort({ order: 1, createdAt: -1 })
          .lean(),
        ArticleModel.find({ status: "published" })
          .sort({ publishedAt: -1, createdAt: -1 })
          .limit(3)
          .lean(),
        DirectorProfileModel.findOne().lean(),
        SiteContentModel.findOne().lean(),
      ]);

    services = fetchedServices.map((service) => ({
      _id: service._id.toString(),
      title: service.title,
      description: service.description,
    }));

    partners = fetchedPartners.map((partner) => ({
      _id: partner._id.toString(),
      name: partner.name,
      logoUrl: partner.logoUrl,
    }));

    articles = fetchedArticles.map((article) => ({
      _id: article._id.toString(),
      title: article.title,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      slug: article.slug,
      publishedAt: article.publishedAt,
    }));

    director = fetchedDirector
      ? {
          name: fetchedDirector.name,
          title: fetchedDirector.title,
          photoUrl: fetchedDirector.photoUrl,
          bio: fetchedDirector.bio,
          message: fetchedDirector.message,
        }
      : null;

    content = fetchedContent
      ? {
          homeMessage: fetchedContent.homeMessage,
          homeAbout: fetchedContent.homeAbout,
          homeHistory: fetchedContent.homeHistory,
          homeHeroBackgroundUrl: fetchedContent.homeHeroBackgroundUrl,
          homeStat1Value: fetchedContent.homeStat1Value,
          homeStat1Label: fetchedContent.homeStat1Label,
          homeStat2Value: fetchedContent.homeStat2Value,
          homeStat2Label: fetchedContent.homeStat2Label,
          homeStat3Value: fetchedContent.homeStat3Value,
          homeStat3Label: fetchedContent.homeStat3Label,
          homeStat4Value: fetchedContent.homeStat4Value,
          homeStat4Label: fetchedContent.homeStat4Label,
          presentationVision: fetchedContent.presentationVision,
          presentationMission: fetchedContent.presentationMission,
          presentationValues: fetchedContent.presentationValues,
        }
      : null;
  } catch (error) {
    services = [];
    partners = [];
    articles = [];
    director = null;
    content = null;
  }

  const latestArticles = articles.map((article) => ({
    _id: article._id,
    title: article.title,
    excerpt: article.excerpt,
    coverImage: article.coverImage,
    slug: article.slug,
    date: article.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "",
  }));

  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden bg-slate-900 bg-cover bg-center"
        style={{
          backgroundImage: `url(${content?.homeHeroBackgroundUrl || "/agro2.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-emerald-950/45" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-emerald-900/10 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-2 py-20">
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
                EKR Africa Agrovision Group
                <span className="block text-emerald-200">Cultivating Africa’s Future</span>
              </h1>
              <p className="mt-6 text-lg text-emerald-50/90">
                Cabinet de conseil et d’accompagnement des activités agricoles en Afrique. Nous
                structurons des projets durables, renforçons les coopératives et optimisons les
                filières agricoles.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/presentation-services-contact"
                  className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-emerald-700"
                >
                  Découvrir nos services
                </a>
                <a
                  href="/articles-galerie"
                  className="rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  Voir les actualités
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
              <p className="mt-2 text-base text-slate-600">
                {content?.homeMessage ||
                  "« Nous accompagnons les producteurs, partenaires et investisseurs dans la mise en œuvre de solutions agricoles innovantes pour une Afrique prospère. »"}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-2xl font-semibold text-emerald-700">
                    {content?.homeStat1Value || "+12"}
                  </p>
                  <p className="text-sm text-slate-600">
                    {content?.homeStat1Label || "Services spécialisés"}
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-2xl font-semibold text-emerald-700">
                    {content?.homeStat2Value || "+40"}
                  </p>
                  <p className="text-sm text-slate-600">
                    {content?.homeStat2Label || "Projets accompagnés"}
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-2xl font-semibold text-emerald-700">
                    {content?.homeStat3Value || "8"}
                  </p>
                  <p className="text-sm text-slate-600">
                    {content?.homeStat3Label || "Pays partenaires"}
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-2xl font-semibold text-emerald-700">
                    {content?.homeStat4Value || "24/7"}
                  </p>
                  <p className="text-sm text-slate-600">
                    {content?.homeStat4Label || "Suivi des actions"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 py-16">
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Présentation de la société</h2>
            <p className="mt-4 text-base text-slate-600">
              {content?.homeAbout ||
                "EKR AFRICA AGROVISION GROUP accompagne les acteurs agricoles à travers le conseil stratégique, l’expertise technique et l’ingénierie de projets. Notre mission est de contribuer au développement rural durable et à la sécurité alimentaire."}
            </p>
            <p className="mt-4 text-base text-slate-600">
              {content?.homeHistory ||
                "Historique : créé pour répondre aux besoins d’encadrement des filières agricoles, le groupe a structuré des initiatives à fort impact en Afrique de l’Ouest."}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Vision, mission & valeurs</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                Vision : {content?.presentationVision ||
                  "une agriculture africaine moderne, productive et inclusive."}
              </li>
              <li>
                Mission : {content?.presentationMission ||
                  "structurer, accompagner et financer les projets agricoles."}
              </li>
              <li>
                Valeurs : {content?.presentationValues ||
                  "intégrité, innovation, proximité, durabilité."}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-2 py-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Services clés</h2>
            <a
              href="/presentation-services-contact"
              className="text-sm font-semibold text-emerald-700"
            >
              Voir tous les services
            </a>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.length === 0 && (
              <div className="rounded-2xl border border-emerald-100 bg-white p-5 text-sm text-slate-600">
                Aucun service enregistré pour le moment.
              </div>
            )}
            {services.map((service) => (
              <div
                key={service._id}
                className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <p className="text-base font-semibold text-slate-900">{service.title}</p>
                <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 py-16">
        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-slate-50 p-6 sm:p-8 shadow-md overflow-hidden">
          <div className="flex flex-col gap-8 md:gap-12 md:flex-row md:items-center">
            <div className="flex flex-col items-center md:items-start flex-shrink-0">
              <div className="h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg ring-4 ring-emerald-100 transition-transform duration-500 hover:-translate-y-1">
                {director?.photoUrl ? (
                  <img
                    src={director.photoUrl}
                    alt={director.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                    Photo DG
                  </div>
                )}
              </div>
              <p className="mt-5 text-base font-semibold text-slate-900">
                {director?.name || "Directeur Général"}
              </p>
            </div>
            <div className="hidden h-48 w-px self-stretch rounded-full bg-emerald-200 md:block flex-shrink-0" />
            <div className="flex-1 rounded-3xl border border-emerald-100 bg-white/90 p-5 sm:p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Directeur Général</h2>
              <p className="mt-2 text-sm font-semibold text-emerald-700">
                {director?.title || "Fonction"}
              </p>
              <p className="mt-4 text-sm text-slate-700">
                {director?.bio ||
                  "Photo officielle et biographie complète seront disponibles ici. Le Directeur Général porte la vision stratégique du groupe et supervise les projets d'impact."}
              </p>
              <div className="my-4 h-px w-28 rounded-full bg-emerald-200" />
              <p className="text-sm text-slate-700">
                {director?.message ||
                  "« Ensemble, nous bâtissons une agriculture résiliente au service des communautés rurales. »"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-50">
        <div className="mx-auto w-full max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-slate-900">Activités clés</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {activities.map((activity) => (
              <div
                key={activity}
                className="rounded-2xl border border-emerald-100 bg-white p-4 text-sm text-slate-600"
              >
                {activity}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Articles & Galerie</h2>
          <a href="/articles-galerie" className="text-sm font-semibold text-emerald-700">
            Tout voir
          </a>
        </div>
        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {latestArticles.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
              Aucun article publié pour le moment.
            </div>
          )}
          {latestArticles.map((article) => (
            <article
              key={article._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              {article.coverImage ? (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="h-36 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="h-36 rounded-xl bg-slate-100"></div>
              )}
              {article.date && (
                <p className="mt-4 text-xs text-emerald-700">{article.date}</p>
              )}
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{article.excerpt}</p>
              {article.slug && (
                <a
                  href={`/articles-galerie/${article.slug}`}
                  className="mt-3 inline-block text-xs font-semibold text-emerald-700"
                >
                  Lire l’article
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-2 py-16 overflow-hidden">
          <h2 className="text-2xl font-semibold text-slate-900">Partenaires</h2>
          <p className="mt-2 text-sm text-slate-600">
            Ils nous font confiance pour l’accompagnement des projets agricoles.
          </p>
          <PartnersCarousel partners={partners} />
        </div>
      </section>
    </div>
  );
}
