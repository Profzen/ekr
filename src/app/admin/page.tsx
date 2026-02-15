import AdminClient from "./AdminClient";

export default function AdminPage() {
  return (
    <div className="bg-white">
      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-6 py-16">
          <h1 className="text-3xl font-semibold text-slate-900">Administration</h1>
          <p className="mt-4 text-base text-slate-600">
            Espace réservé au Directeur Général pour gérer les contenus du site.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <AdminClient />
      </section>
    </div>
  );
}
