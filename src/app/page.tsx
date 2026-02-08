import connectToDatabase from "@/lib/db";
import ArticleModel from "@/models/Article";
import ServiceModel from "@/models/Service";
import PartnerModel from "@/models/Partner";
import DirectorProfileModel from "@/models/DirectorProfile";

export const dynamic = "force-dynamic";

export default async function Home() {
  const services = await ServiceModel.find({ isActive: true })
    .sort({ order: 1, createdAt: -1 })
    .limit(6)
    .lean();

  const activities = [
    "Optimisation des pratiques culturales",
    "Évaluation de projets agricoles",
    "Programmes d’irrigation durable",
    "Incubation et suivi de coopératives",
  ];

  await connectToDatabase();
  const articles = await ArticleModel.find({ status: "published" })
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(3)
    .lean();

  const director = await DirectorProfileModel.findOne().lean();

  const latestArticles = articles.map((article) => ({
    _id: article._id.toString(),
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

  const partners = await PartnerModel.find({ isActive: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Site institutionnel
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
                EKR Africa Agrovision Group
                <span className="block text-emerald-600">Cultivating Africa’s Future</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600">
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
              <p className="text-sm font-semibold text-emerald-700">Message institutionnel</p>
              <p className="mt-4 text-base text-slate-600">
                « Nous accompagnons les producteurs, partenaires et investisseurs dans la mise en
                œuvre de solutions agricoles innovantes pour une Afrique prospère. »
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-2xl font-semibold text-emerald-700">+12</p>
                  <p className="text-sm text-slate-600">Services spécialisés</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-2xl font-semibold text-emerald-700">+40</p>
                  <p className="text-sm text-slate-600">Projets accompagnés</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-2xl font-semibold text-emerald-700">8</p>
                  <p className="text-sm text-slate-600">Pays partenaires</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-2xl font-semibold text-emerald-700">24/7</p>
                  <p className="text-sm text-slate-600">Suivi des actions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Présentation de la société</h2>
            <p className="mt-4 text-base text-slate-600">
              EKR AFRICA AGROVISION GROUP accompagne les acteurs agricoles à travers le conseil
              stratégique, l’expertise technique et l’ingénierie de projets. Notre mission est de
              contribuer au développement rural durable et à la sécurité alimentaire.
            </p>
            <p className="mt-4 text-base text-slate-600">
              Historique : créé pour répondre aux besoins d’encadrement des filières agricoles, le
              groupe a structuré des initiatives à fort impact en Afrique de l’Ouest.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Vision, mission & valeurs</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Vision : une agriculture africaine moderne, productive et inclusive.</li>
              <li>Mission : structurer, accompagner et financer les projets agricoles.</li>
              <li>Valeurs : intégrité, innovation, proximité, durabilité.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
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
                key={service._id.toString()}
                className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <p className="text-base font-semibold text-slate-900">{service.title}</p>
                <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr] md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Direction Générale</h2>
            <p className="mt-4 text-base text-slate-600">
              {director?.bio ||
                "Photo officielle et biographie complète seront disponibles ici. Le Directeur Général porte la vision stratégique du groupe et supervise les projets d’impact."}
            </p>
            <p className="mt-4 text-base text-slate-600">
              {director?.message ||
                "« Ensemble, nous bâtissons une agriculture résiliente au service des communautés rurales. »"}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
            {director?.photoUrl ? (
              <img
                src={director.photoUrl}
                alt={director.name}
                className="mx-auto h-48 w-48 rounded-full object-cover"
              />
            ) : (
              <div className="mx-auto h-48 w-48 rounded-full bg-emerald-100"></div>
            )}
            <p className="mt-4 text-sm font-semibold text-slate-900">
              {director?.name || "Directeur Général"}
            </p>
            <p className="text-sm text-slate-600">
              {director?.title || "Bio professionnelle (résumée)"}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-emerald-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
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

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Articles & Galerie</h2>
          <a href="/articles-galerie" className="text-sm font-semibold text-emerald-700">
            Tout voir
          </a>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
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
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-slate-900">Partenaires</h2>
          <p className="mt-2 text-sm text-slate-600">
            Ils nous font confiance pour l’accompagnement des projets agricoles.
          </p>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
            {partners.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600">
                Aucun partenaire enregistré pour le moment.
              </div>
            )}
            {partners.map((partner) => (
              <div
                key={partner._id.toString()}
                className="min-w-[200px] rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 shadow-sm"
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
