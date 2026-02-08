"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("Mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="bg-white">
      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-md px-6 py-16">
          <h1 className="text-3xl font-semibold text-slate-900">Connexion Admin</h1>
          <p className="mt-4 text-base text-slate-600">
            Entrez le mot de passe pour accéder à l’administration.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-md px-6 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="Mot de passe"
              required
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
