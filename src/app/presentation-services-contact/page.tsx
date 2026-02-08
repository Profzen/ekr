import connectToDatabase from "@/lib/db";
import ServiceModel from "@/models/Service";
import DirectorProfileModel from "@/models/DirectorProfile";

export const dynamic = "force-dynamic";

export default async function PresentationServicesContactPage() {
  await connectToDatabase();
  const services = await ServiceModel.find({ isActive: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  const director = await DirectorProfileModel.findOne().lean();

  return (
    <div className="bg-white">
      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h1 className="text-3xl font-semibold text-slate-900">
            Présentation · Services · Contact
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Toutes les informations détaillées sur EKR Africa Agrovision Group,
            ses services et ses contacts.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Présentation de la société
            </h2>
            <p className="mt-4 text-base text-slate-600">
              EKR AFRICA AGROVISION GROUP est une société spécialisée dans
              l’accompagnement, le conseil et le développement des activités
              agricoles en Afrique. Nous accompagnons les investisseurs,
              producteurs et institutions dans la structuration de projets à fort
              impact.
            </p>
            <p className="mt-4 text-base text-slate-600">
              Vision : une agriculture africaine innovante, durable et inclusive.
              Mission : mettre en place des solutions techniques et financières
              pour accélérer la performance des filières.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Direction Générale
            </h3>
            <p className="mt-4 text-sm text-slate-600">
              {director?.bio ||
                "Photo officielle, biographie complète et message du Directeur Général seront disponibles ici."}
            </p>
            {director?.photoUrl ? (
              <img
                src={director.photoUrl}
                alt={director.name}
                className="mt-6 h-40 w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="mt-6 h-40 rounded-2xl bg-emerald-100"></div>
            )}
            <p className="mt-4 text-sm font-semibold text-slate-800">
              {director?.name || "Message du DG"}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {director?.message ||
                "« L’agriculture est la clé de la transformation économique en Afrique. »"}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-emerald-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-slate-900">Nos services</h2>
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
                <h3 className="text-base font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr,0.8fr]">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Contact</h2>
            <p className="mt-4 text-base text-slate-600">
              Pour toute collaboration ou demande d’information, contactez-nous.
            </p>
            <div className="mt-6 space-y-2 text-sm text-slate-600">
              <p>Abidjan, Côte d’Ivoire</p>
              <p>+225 00 00 00 00</p>
              <p>contact@ekr-africa.com</p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Formulaire de contact
            </h3>
            <form className="mt-4 space-y-4">
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
    </div>
  );
}
