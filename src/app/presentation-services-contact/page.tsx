import connectToDatabase from "@/lib/db";
import ServiceModel from "@/models/Service";
import SiteContentModel from "@/models/SiteContent";
import TeamMemberModel from "@/models/TeamMember";
import TeamCarousel from "@/components/TeamCarousel";

export const dynamic = "force-dynamic";

export default async function PresentationServicesContactPage() {
  let services: Array<{ _id: string; title: string; description: string }> = [];
  let team: Array<{ _id: string; name: string; role: string; photoUrl?: string }> = [];
  let content: {
    presentationAbout?: string;
    presentationVision?: string;
    presentationMission?: string;
    presentationValues?: string;
    contactAddress?: string;
    contactPhone?: string;
    contactEmail?: string;
    mapEmbedUrl?: string;
    socialXUrl?: string;
    socialFacebookUrl?: string;
    socialWhatsappUrl?: string;
    socialInstagramUrl?: string;
  } | null = null;

  try {
    await connectToDatabase();
    const [fetchedServices, fetchedTeam, fetchedContent] = await Promise.all([
      ServiceModel.find({ isActive: true })
        .sort({ order: 1, createdAt: -1 })
        .lean(),
      TeamMemberModel.find({ isActive: true })
        .sort({ order: 1, createdAt: -1 })
        .lean(),
      SiteContentModel.findOne().lean(),
    ]);

    services = fetchedServices.map((service) => ({
      _id: service._id.toString(),
      title: service.title,
      description: service.description,
    }));

    team = fetchedTeam.map((member) => ({
      _id: member._id.toString(),
      name: member.name,
      role: member.role,
      photoUrl: member.photoUrl,
    }));
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
          socialXUrl: fetchedContent.socialXUrl,
          socialFacebookUrl: fetchedContent.socialFacebookUrl,
          socialWhatsappUrl: fetchedContent.socialWhatsappUrl,
          socialInstagramUrl: fetchedContent.socialInstagramUrl,
        }
      : null;
  } catch (error) {
    services = [];
    team = [];
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
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              Présentation de la société
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-700">
              {content?.presentationAbout ||
                "EKR AFRICA AGROVISION GROUP est une société spécialisée dans l’accompagnement, le conseil et le développement des activités agricoles en Afrique. Nous accompagnons les investisseurs, producteurs et institutions dans la structuration de projets à fort impact."}
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
              Equipe EKR AFRICA AGROVISION GROUP
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Les talents qui portent la vision et l'execution des projets.
            </p>
            <div className="mt-6">
              <TeamCarousel members={team} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Contact</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Parlons de votre projet
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  Notre equipe repond rapidement pour cadrer votre besoin.
                </p>
              </div>
              <div className="hidden h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-700 md:flex">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10a8.9 8.9 0 0 1-4 7.4L12 21l-5-3.6A8.9 8.9 0 0 1 3 10a9 9 0 1 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M21 10a8.9 8.9 0 0 1-4 7.4L12 21l-5-3.6A8.9 8.9 0 0 1 3 10a9 9 0 1 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Adresse</p>
                    <p className="mt-1 text-sm text-slate-700">{content?.contactAddress || "Abidjan, Côte d'Ivoire"}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 3 4.2 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1l-1.2 1.2a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Telephone</p>
                    <p className="mt-1 text-sm text-slate-700">{content?.contactPhone || "+225 00 00 00 00"}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="m22 6-10 7L2 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
                    <p className="mt-1 text-sm text-slate-700">{content?.contactEmail || "contact@ekr-africa.com"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Reseaux sociaux</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={content?.socialXUrl || "https://x.com/ekr-africa"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-md transition hover:-translate-y-0.5"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M4.5 4h3.2l2.7 3.7L12.8 4H15l-3.9 5.3 4.4 6.7h-3.2l-2.9-4-3.1 4H4l4.6-6.3L4.5 4z" />
                  </svg>
                </a>
                <a
                  href={content?.socialFacebookUrl || "https://facebook.com/ekr-africa"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-md transition hover:-translate-y-0.5"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M14 8h2V5h-2c-2.2 0-3.5 1.4-3.5 3.5V11H8v3h2.5v5H14v-5h2.1l.4-3H14V8.6c0-.4.3-.6.6-.6z" />
                  </svg>
                </a>
                <a
                  href={content?.socialWhatsappUrl || "https://wa.me/225000000000?text=Bonjour"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:-translate-y-0.5"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M12 3a9 9 0 0 0-7.5 13.9L4 21l4.3-1.1A9 9 0 1 0 12 3z" />
                    <path d="M9.6 7.8c.2-.4.4-.4.7-.4h.6c.2 0 .4 0 .6.5.2.5.7 1.7.8 1.8.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.4-.2.7.2.4.9 1.4 2 2.3 1.4 1.1 2.6 1.4 3 1.6.4.1.6.1.8-.1.2-.2.9-1 .9-1.4s.4-.3.6-.2c.2.1 1.7.8 2 1 .3.1.5.2.6.3.1.1.1.8-.2 1.6-.3.8-1.4 1.6-2 1.7-.6.1-1.3.2-2.1 0-.5-.1-1.2-.3-2.1-.7-3.7-1.6-6.1-5.5-6.3-5.8-.2-.3-1.5-2-1.5-3.8 0-1.8.9-2.7 1.2-3.1z" />
                  </svg>
                </a>
                <a
                  href={content?.socialInstagramUrl || "https://instagram.com/ekr-africa"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white shadow-md transition hover:-translate-y-0.5"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="4" ry="4" stroke="white" strokeWidth="2" />
                    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" />
                    <circle cx="17" cy="7" r="1.5" fill="white" />
                  </svg>
                </a>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Suivez-nous pour les actualites et les projets en cours.
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Formulaire de contact
            </h3>
            <form
              className="mt-6 space-y-4"
              action="mailto:profzzen@gmail.com"
              method="post"
              encType="text/plain"
            >
              <input
                name="name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Nom complet"
              />
              <input
                type="email"
                name="email"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Email"
              />
              <textarea
                rows={4}
                name="message"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Votre message"
              />
              <button
                type="submit"
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
