import connectToDatabase from "@/lib/db";
import ServiceModel from "@/models/Service";
import DirectorProfileModel from "@/models/DirectorProfile";
import SiteContentModel from "@/models/SiteContent";

export const dynamic = "force-dynamic";

export default async function PresentationServicesContactPage() {
  let services: Array<{ _id: string; title: string; description: string }> = [];
  let director: {
    name?: string;
    title?: string;
    photoUrl?: string;
    bio?: string;
    message?: string;
  } | null = null;
  let content: {
    presentationAbout?: string;
    presentationVision?: string;
    presentationMission?: string;
    presentationValues?: string;
    contactAddress?: string;
    contactPhone?: string;
    contactEmail?: string;
    mapEmbedUrl?: string;
  } | null = null;

  try {
    await connectToDatabase();
    const [fetchedServices, fetchedDirector, fetchedContent] = await Promise.all([
      ServiceModel.find({ isActive: true })
        .sort({ order: 1, createdAt: -1 })
        .lean(),
      DirectorProfileModel.findOne().lean(),
      SiteContentModel.findOne().lean(),
    ]);

    services = fetchedServices.map((service) => ({
      _id: service._id.toString(),
      title: service.title,
      description: service.description,
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
          presentationAbout: fetchedContent.presentationAbout,
          presentationVision: fetchedContent.presentationVision,
          presentationMission: fetchedContent.presentationMission,
          presentationValues: fetchedContent.presentationValues,
          contactAddress: fetchedContent.contactAddress,
          contactPhone: fetchedContent.contactPhone,
          contactEmail: fetchedContent.contactEmail,
          mapEmbedUrl: fetchedContent.mapEmbedUrl,
        }
      : null;
  } catch (error) {
    services = [];
    director = null;
    content = null;
  }

  return (
    <div className="bg-white">
      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-2 py-16">
          <h1 className="text-3xl font-semibold text-slate-900">
            Présentation · Services · Contact
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Toutes les informations détaillées sur EKR Africa Agrovision Group,
            ses services et ses contacts.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              Présentation de la société
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-700">
              {content?.presentationAbout ||
                "EKR AFRICA AGROVISION GROUP est une société spécialisée dans l'accompagnement, le conseil et le développement des activités agricoles en Afrique. Nous accompagnons les investisseurs, producteurs et institutions dans la structuration de projets à fort impact."}
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border-l-4 border-emerald-600 bg-white p-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Vision</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {content?.presentationVision || "Une agriculture africaine innovante, durable et inclusive."}
                </p>
              </div>
              <div className="rounded-xl border-l-4 border-emerald-600 bg-white p-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Mission</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {content?.presentationMission || "Mettre en place des solutions techniques et financières pour accélérer la performance des filières."}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">
              Direction Générale
            </h3>
            <div className="mt-6 flex flex-col items-center text-center">
              <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg ring-4 ring-slate-100">
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
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                {director?.title || "Fonction"}
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {director?.name || "Directeur Général"}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 line-clamp-4">
                {director?.bio ||
                  "Photo officielle, biographie complète et message du Directeur Général seront disponibles ici."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-50">
        <div className="mx-auto w-full max-w-7xl px-2 py-16">
          <h2 className="text-3xl font-semibold text-slate-900">Nos services</h2>
          <p className="mt-2 text-base text-slate-600">
            Découvrez notre expertise au service de votre projet agricole.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.length === 0 && (
              <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-sm text-slate-600">
                Aucun service enregistré pour le moment.
              </div>
            )}
            {services.map((service) => (
              <div
                key={service._id}
                className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-300"
              >
                <h3 className="text-lg font-bold text-emerald-700">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Contact</h2>
            <p className="mt-4 text-base text-slate-600">
              Pour toute collaboration ou demande d'information, contactez-nous.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 rounded-xl bg-white p-4 border border-slate-200">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Adresse</p>
                  <p className="mt-1 text-sm text-slate-700">{content?.contactAddress || "Abidjan, Côte d'Ivoire"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-white p-4 border border-slate-200">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Téléphone</p>
                  <p className="mt-1 text-sm text-slate-700">{content?.contactPhone || "+225 00 00 00 00"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-white p-4 border border-slate-200">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
                  <p className="mt-1 text-sm text-slate-700">{content?.contactEmail || "contact@ekr-africa.com"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Formulaire de contact
            </h3>
            <form className="mt-6 space-y-4">
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Nom complet"
              />
              <input
                type="email"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Email"
              />
              <textarea
                rows={4}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Votre message"
              />
              <button
                type="button"
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-2 py-16">
          <h2 className="text-2xl font-semibold text-slate-900">Localisation</h2>
          <p className="mt-2 text-sm text-slate-600">
            {content?.contactAddress || "Adresse à préciser"}
          </p>
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4">
            {content?.mapEmbedUrl ? (
              <iframe
                src={content.mapEmbedUrl}
                className="h-80 w-full rounded-2xl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            ) : (
              <div className="flex h-80 items-center justify-center rounded-2xl bg-slate-100 text-sm text-slate-500">
                Ajoute une URL Google Maps dans l’admin pour afficher la carte.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
