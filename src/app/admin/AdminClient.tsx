"use client";

import { useEffect, useState } from "react";

type Article = {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category?: string;
  status?: "draft" | "published";
  publishedAt?: string | null;
  createdAt?: string;
};

type Service = {
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
  order?: number;
};

type Partner = {
  _id: string;
  name: string;
  logoUrl?: string;
  isActive: boolean;
  order?: number;
};

type GalleryItem = {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  isActive: boolean;
  order?: number;
};

type DirectorProfile = {
  _id?: string;
  name: string;
  title: string;
  photoUrl: string;
  bio: string;
  message: string;
};

type FormState = {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  status: "draft" | "published";
};

const initialState: FormState = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "Actualités",
  status: "draft",
};

const initialService = {
  title: "",
  description: "",
  isActive: true,
  order: 0,
};

const initialPartner = {
  name: "",
  logoUrl: "",
  isActive: true,
  order: 0,
};

const initialGallery = {
  title: "",
  imageUrl: "",
  category: "",
  isActive: true,
  order: 0,
};

const initialDirector: DirectorProfile = {
  name: "",
  title: "",
  photoUrl: "",
  bio: "",
  message: "",
};

export default function AdminClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [director, setDirector] = useState<DirectorProfile>(initialDirector);
  const [form, setForm] = useState<FormState>(initialState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState(initialService);
  const [partnerForm, setPartnerForm] = useState(initialPartner);
  const [galleryForm, setGalleryForm] = useState(initialGallery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = async () => {
    try {
      const res = await fetch("/api/articles", { cache: "no-store" });
      const data = await res.json();
      setArticles(data.data ?? []);
    } catch (err) {
      setError("Impossible de charger les articles.");
    }
  };

  const loadServices = async () => {
    const res = await fetch("/api/services", { cache: "no-store" });
    const data = await res.json();
    setServices(data.data ?? []);
  };

  const loadPartners = async () => {
    const res = await fetch("/api/partners", { cache: "no-store" });
    const data = await res.json();
    setPartners(data.data ?? []);
  };

  const loadGallery = async () => {
    const res = await fetch("/api/gallery", { cache: "no-store" });
    const data = await res.json();
    setGallery(data.data ?? []);
  };

  const loadDirector = async () => {
    const res = await fetch("/api/director", { cache: "no-store" });
    const data = await res.json();
    if (data?.data) {
      setDirector({
        name: data.data.name ?? "",
        title: data.data.title ?? "",
        photoUrl: data.data.photoUrl ?? "",
        bio: data.data.bio ?? "",
        message: data.data.message ?? "",
      });
    }
  };

  useEffect(() => {
    loadArticles();
    loadServices();
    loadPartners();
    loadGallery();
    loadDirector();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setServiceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePartnerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setPartnerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGalleryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setGalleryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDirectorChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setDirector((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = editingId ? `/api/articles/${editingId}` : "/api/articles";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const payload = await res.json();
        throw new Error(payload.error ?? "Erreur lors de la création");
      }

      setForm(initialState);
      setEditingId(null);
      await loadArticles();
    } catch (err) {
      setError("Création impossible. Vérifie les champs.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article: Article) => {
    setEditingId(article._id);
    setForm({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      coverImage: article.coverImage ?? "",
      category: article.category ?? "Actualités",
      status: article.status ?? "draft",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    await fetch(`/api/articles/${id}`, { method: "DELETE" });
    await loadArticles();
  };

  const togglePublish = async (article: Article) => {
    const newStatus = article.status === "published" ? "draft" : "published";
    await fetch(`/api/articles/${article._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    await loadArticles();
  };

  const handleServiceSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serviceForm),
    });
    setServiceForm(initialService);
    await loadServices();
  };

  const handlePartnerSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await fetch("/api/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partnerForm),
    });
    setPartnerForm(initialPartner);
    await loadPartners();
  };

  const handleGallerySubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(galleryForm),
    });
    setGalleryForm(initialGallery);
    await loadGallery();
  };

  const deleteService = async (id: string) => {
    if (!confirm("Supprimer ce service ?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    await loadServices();
  };

  const deletePartner = async (id: string) => {
    if (!confirm("Supprimer ce partenaire ?")) return;
    await fetch(`/api/partners/${id}`, { method: "DELETE" });
    await loadPartners();
  };

  const deleteGalleryItem = async (id: string) => {
    if (!confirm("Supprimer ce média ?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    await loadGallery();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const handleDirectorSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await fetch("/api/director", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(director),
    });
    await loadDirector();
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const data = await res.json();
    return data.url as string;
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
        >
          Se déconnecter
        </button>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Créer un article</h2>
          <p className="mt-2 text-sm text-slate-600">
            Les articles publiés apparaîtront sur le site public.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="Titre"
              required
            />
            <input
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="Résumé court"
              required
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="Contenu détaillé"
              required
            />
            <div className="space-y-2">
              <input
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="URL de l’image de couverture (optionnel)"
              />
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  const url = await uploadFile(file);
                  setForm((prev) => ({ ...prev, coverImage: url }));
                }}
              />
            </div>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="Catégorie"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
            </select>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
            >
              {loading
                ? "Enregistrement..."
                : editingId
                ? "Mettre à jour"
                : "Créer l’article"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Articles existants</h2>
          <div className="mt-6 space-y-4">
            {articles.length === 0 && (
              <p className="text-sm text-slate-500">Aucun article enregistré.</p>
            )}
            {articles.map((article) => (
              <div
                key={article._id}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {article.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{article.category}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      article.status === "published"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {article.status === "published" ? "Publié" : "Brouillon"}
                  </span>
                </div>
                <p className="mt-3 text-xs text-slate-600">{article.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(article)}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => togglePublish(article)}
                    className="rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700"
                  >
                    {article.status === "published"
                      ? "Passer en brouillon"
                      : "Publier"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(article._id)}
                    className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Services</h2>
          <form onSubmit={handleServiceSubmit} className="mt-4 space-y-3">
            <input
              name="title"
              value={serviceForm.title}
              onChange={handleServiceChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="Titre du service"
              required
            />
            <textarea
              name="description"
              value={serviceForm.description}
              onChange={handleServiceChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              rows={3}
              placeholder="Description"
              required
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
            >
              Ajouter
            </button>
          </form>
          <div className="mt-4 space-y-2 text-sm">
            {services.map((service) => (
              <div key={service._id} className="rounded-xl border border-slate-200 p-3">
                <p className="font-semibold text-slate-900">{service.title}</p>
                <p className="text-xs text-slate-600">{service.description}</p>
                <button
                  type="button"
                  onClick={() => deleteService(service._id)}
                  className="mt-2 text-xs font-semibold text-red-600"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Partenaires</h2>
          <form onSubmit={handlePartnerSubmit} className="mt-4 space-y-3">
            <input
              name="name"
              value={partnerForm.name}
              onChange={handlePartnerChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="Nom du partenaire"
              required
            />
            <input
              name="logoUrl"
              value={partnerForm.logoUrl}
              onChange={handlePartnerChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="URL du logo (optionnel)"
            />
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const url = await uploadFile(file);
                setPartnerForm((prev) => ({ ...prev, logoUrl: url }));
              }}
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
            >
              Ajouter
            </button>
          </form>
          <div className="mt-4 space-y-2 text-sm">
            {partners.map((partner) => (
              <div key={partner._id} className="rounded-xl border border-slate-200 p-3">
                <p className="font-semibold text-slate-900">{partner.name}</p>
                <p className="text-xs text-slate-600">{partner.logoUrl || "Sans logo"}</p>
                <button
                  type="button"
                  onClick={() => deletePartner(partner._id)}
                  className="mt-2 text-xs font-semibold text-red-600"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Galerie</h2>
          <form onSubmit={handleGallerySubmit} className="mt-4 space-y-3">
            <input
              name="title"
              value={galleryForm.title}
              onChange={handleGalleryChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="Titre"
              required
            />
            <input
              name="category"
              value={galleryForm.category}
              onChange={handleGalleryChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="Catégorie"
              required
            />
            <input
              name="imageUrl"
              value={galleryForm.imageUrl}
              onChange={handleGalleryChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="URL de l’image"
              required
            />
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const url = await uploadFile(file);
                setGalleryForm((prev) => ({ ...prev, imageUrl: url }));
              }}
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
            >
              Ajouter
            </button>
          </form>
          <div className="mt-4 space-y-2 text-sm">
            {gallery.map((item) => (
              <div key={item._id} className="rounded-xl border border-slate-200 p-3">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-600">{item.category}</p>
                <button
                  type="button"
                  onClick={() => deleteGalleryItem(item._id)}
                  className="mt-2 text-xs font-semibold text-red-600"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Profil du Directeur Général</h2>
        <form onSubmit={handleDirectorSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
          <input
            name="name"
            value={director.name}
            onChange={handleDirectorChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            placeholder="Nom complet"
            required
          />
          <input
            name="title"
            value={director.title}
            onChange={handleDirectorChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            placeholder="Titre / Fonction"
            required
          />
          <input
            name="photoUrl"
            value={director.photoUrl}
            onChange={handleDirectorChange}
            className="md:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            placeholder="URL de la photo"
          />
          <input
            type="file"
            accept="image/*"
            className="md:col-span-2 w-full text-sm"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const url = await uploadFile(file);
              setDirector((prev) => ({ ...prev, photoUrl: url }));
            }}
          />
          <textarea
            name="bio"
            value={director.bio}
            onChange={handleDirectorChange}
            className="md:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            rows={4}
            placeholder="Biographie"
            required
          />
          <textarea
            name="message"
            value={director.message}
            onChange={handleDirectorChange}
            className="md:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            rows={3}
            placeholder="Message du DG"
            required
          />
          <button
            type="submit"
            className="md:col-span-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
          >
            Enregistrer le profil
          </button>
        </form>
      </div>
    </div>
  );
}
