"use client";

import { useEffect, useRef, useState } from "react";

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

type SiteContent = {
  homeMessage: string;
  homeAbout: string;
  homeHistory: string;
  presentationAbout: string;
  presentationVision: string;
  presentationMission: string;
  presentationValues: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  mapEmbedUrl: string;
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

const initialContent: SiteContent = {
  homeMessage: "",
  homeAbout: "",
  homeHistory: "",
  presentationAbout: "",
  presentationVision: "",
  presentationMission: "",
  presentationValues: "",
  contactAddress: "",
  contactPhone: "",
  contactEmail: "",
  mapEmbedUrl: "",
};

export default function AdminClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [director, setDirector] = useState<DirectorProfile>(initialDirector);
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [form, setForm] = useState<FormState>(initialState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState(initialService);
  const [partnerForm, setPartnerForm] = useState(initialPartner);
  const [galleryForm, setGalleryForm] = useState(initialGallery);
  const [articleFile, setArticleFile] = useState<File | null>(null);
  const [articlePreview, setArticlePreview] = useState<string>("");
  const [partnerFile, setPartnerFile] = useState<File | null>(null);
  const [partnerPreview, setPartnerPreview] = useState<string>("");
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string>("");
  const [directorFile, setDirectorFile] = useState<File | null>(null);
  const [directorPreview, setDirectorPreview] = useState<string>("");
  const [articleSaving, setArticleSaving] = useState(false);
  const [serviceSaving, setServiceSaving] = useState(false);
  const [partnerSaving, setPartnerSaving] = useState(false);
  const [gallerySaving, setGallerySaving] = useState(false);
  const [directorSaving, setDirectorSaving] = useState(false);
  const [contentSaving, setContentSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [directorEditing, setDirectorEditing] = useState(false);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const Spinner = ({ className = "h-4 w-4 border-white" }) => (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-t-transparent ${className}`}
      aria-hidden="true"
    />
  );

  const showSuccess = (message: string) => {
    setError(null);
    setSuccess(message);
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }
    successTimerRef.current = setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  const ensureOk = async (res: Response, fallbackMessage: string) => {
    if (res.status === 401) {
      handleUnauthorized();
      throw new Error("Unauthorized");
    }
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      setError(text || fallbackMessage);
      throw new Error(fallbackMessage);
    }
  };

  const handleUnauthorized = () => {
    setError("Session admin expirée. Reconnecte-toi.");
    window.location.href = "/admin/login";
  };

  const fetchJsonSafe = async (url: string, options?: RequestInit) => {
    try {
      const res = await fetch(url, options);
      if (res.status === 401) {
        handleUnauthorized();
        return { ok: false, data: null };
      }
      const text = await res.text();
      const data = text ? JSON.parse(text) : null;
      return { ok: res.ok, data };
    } catch (err) {
      return { ok: false, data: null };
    }
  };

  const loadArticles = async () => {
    try {
      const result = await fetchJsonSafe("/api/articles", { cache: "no-store" });
      setArticles(result.data?.data ?? []);
    } catch (err) {
      setError("Impossible de charger les articles.");
    }
  };

  const loadServices = async () => {
    const result = await fetchJsonSafe("/api/services", { cache: "no-store" });
    setServices(result.data?.data ?? []);
  };

  const loadPartners = async () => {
    const result = await fetchJsonSafe("/api/partners", { cache: "no-store" });
    setPartners(result.data?.data ?? []);
  };

  const loadGallery = async () => {
    const result = await fetchJsonSafe("/api/gallery", { cache: "no-store" });
    setGallery(result.data?.data ?? []);
  };

  const loadDirector = async () => {
    const result = await fetchJsonSafe("/api/director", { cache: "no-store" });
    if (result.data?.data) {
      setDirector({
        name: result.data.data.name ?? "",
        title: result.data.data.title ?? "",
        photoUrl: result.data.data.photoUrl ?? "",
        bio: result.data.data.bio ?? "",
        message: result.data.data.message ?? "",
      });
    }
  };

  const loadContent = async () => {
    const result = await fetchJsonSafe("/api/content", { cache: "no-store" });
    if (result.data?.data) {
      setContent({
        homeMessage: result.data.data.homeMessage ?? "",
        homeAbout: result.data.data.homeAbout ?? "",
        homeHistory: result.data.data.homeHistory ?? "",
        presentationAbout: result.data.data.presentationAbout ?? "",
        presentationVision: result.data.data.presentationVision ?? "",
        presentationMission: result.data.data.presentationMission ?? "",
        presentationValues: result.data.data.presentationValues ?? "",
        contactAddress: result.data.data.contactAddress ?? "",
        contactPhone: result.data.data.contactPhone ?? "",
        contactEmail: result.data.data.contactEmail ?? "",
        mapEmbedUrl: result.data.data.mapEmbedUrl ?? "",
      });
    }
  };

  useEffect(() => {
    loadArticles();
    loadServices();
    loadPartners();
    loadGallery();
    loadDirector();
    loadContent();
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

  const handleContentChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setArticleSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const coverImage = articleFile
        ? await uploadFile(articleFile)
        : form.coverImage;
      const url = editingId ? `/api/articles/${editingId}` : "/api/articles";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, coverImage }),
      });

      await ensureOk(res, "Erreur lors de l'enregistrement.");

      setForm(initialState);
      setEditingId(null);
      setArticleFile(null);
      setArticlePreview("");
      await loadArticles();
      showSuccess("Article enregistré.");
    } catch (err) {
      setError("Création impossible. Vérifie les champs.");
    } finally {
      setLoading(false);
      setArticleSaving(false);
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
    setArticlePreview(article.coverImage ?? "");
    setArticleFile(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    setActionLoading((prev) => ({ ...prev, [`delete-${id}`]: true }));
    const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
    await ensureOk(res, "Suppression impossible.");
    await loadArticles();
    setActionLoading((prev) => ({ ...prev, [`delete-${id}`]: false }));
    showSuccess("Article supprimé.");
  };

  const togglePublish = async (article: Article) => {
    const newStatus = article.status === "published" ? "draft" : "published";
    setActionLoading((prev) => ({ ...prev, [`publish-${article._id}`]: true }));
    const res = await fetch(`/api/articles/${article._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    await ensureOk(res, "Mise à jour impossible.");
    await loadArticles();
    setActionLoading((prev) => ({ ...prev, [`publish-${article._id}`]: false }));
    showSuccess("Statut de l’article mis à jour.");
  };

  const handleServiceSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setServiceSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceForm),
      });
      await ensureOk(res, "Enregistrement impossible.");
      setServiceForm(initialService);
      await loadServices();
      showSuccess("Service enregistré.");
    } catch (err) {
      setError("Impossible d'enregistrer le service.");
    } finally {
      setServiceSaving(false);
    }
  };

  const handlePartnerSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setPartnerSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const logoUrl = partnerFile
        ? await uploadFile(partnerFile)
        : partnerForm.logoUrl;
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...partnerForm, logoUrl }),
      });
      await ensureOk(res, "Enregistrement impossible.");
      setPartnerForm(initialPartner);
      setPartnerFile(null);
      setPartnerPreview("");
      await loadPartners();
      showSuccess("Partenaire enregistré.");
    } catch (err) {
      setError("Impossible d'enregistrer le partenaire.");
    } finally {
      setPartnerSaving(false);
    }
  };

  const handleGallerySubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setGallerySaving(true);
    setError(null);
    setSuccess(null);
    try {
      const imageUrl = galleryFile
        ? await uploadFile(galleryFile)
        : galleryForm.imageUrl;
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...galleryForm, imageUrl }),
      });
      await ensureOk(res, "Enregistrement impossible.");
      setGalleryForm(initialGallery);
      setGalleryFile(null);
      setGalleryPreview("");
      await loadGallery();
      showSuccess("Média enregistré.");
    } catch (err) {
      setError("Impossible d'enregistrer le média.");
    } finally {
      setGallerySaving(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Supprimer ce service ?")) return;
    setActionLoading((prev) => ({ ...prev, [`service-${id}`]: true }));
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
    await ensureOk(res, "Suppression impossible.");
    await loadServices();
    setActionLoading((prev) => ({ ...prev, [`service-${id}`]: false }));
    showSuccess("Service supprimé.");
  };

  const deletePartner = async (id: string) => {
    if (!confirm("Supprimer ce partenaire ?")) return;
    setActionLoading((prev) => ({ ...prev, [`partner-${id}`]: true }));
    const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
    await ensureOk(res, "Suppression impossible.");
    await loadPartners();
    setActionLoading((prev) => ({ ...prev, [`partner-${id}`]: false }));
    showSuccess("Partenaire supprimé.");
  };

  const deleteGalleryItem = async (id: string) => {
    if (!confirm("Supprimer ce média ?")) return;
    setActionLoading((prev) => ({ ...prev, [`gallery-${id}`]: true }));
    const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    await ensureOk(res, "Suppression impossible.");
    await loadGallery();
    setActionLoading((prev) => ({ ...prev, [`gallery-${id}`]: false }));
    showSuccess("Média supprimé.");
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const handleDirectorSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setDirectorSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const photoUrl = directorFile
        ? await uploadFile(directorFile)
        : director.photoUrl;
      const res = await fetch("/api/director", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...director, photoUrl }),
      });
      await ensureOk(res, "Enregistrement impossible.");
      await loadDirector();
      setDirectorFile(null);
      setDirectorPreview("");
      setDirectorEditing(false);
      showSuccess("Profil du DG mis à jour.");
    } catch (err) {
      setError("Impossible d'enregistrer le profil.");
    } finally {
      setDirectorSaving(false);
    }
  };

  const handleContentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setContentSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      await ensureOk(res, "Enregistrement impossible.");
      await loadContent();
      showSuccess("Contenus enregistrés.");
    } catch (err) {
      setError("Impossible d'enregistrer le contenu.");
    } finally {
      setContentSaving(false);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      if (res.status === 401) {
        handleUnauthorized();
      } else {
        setError("Échec de l'upload. Réessaie.");
      }
      throw new Error("Upload failed");
    }

    const data = await res.json();
    return data.url as string;
  };

  const isVideo = (url: string) =>
    url.includes("/video/upload/") || url.endsWith(".mp4") || url.endsWith(".mov");

  return (
    <div className="space-y-10">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutLoading}
          className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
        >
          {logoutLoading ? (
            <span className="inline-flex items-center gap-2">
              <Spinner className="h-3 w-3 border-slate-600" />
              Déconnexion...
            </span>
          ) : (
            "Se déconnecter"
          )}
        </button>
      </div>
      {(success || error) && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-lg">
          {success && <p className="text-emerald-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      )}
      <div className="grid gap-10 lg:grid-cols-2">
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
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      setArticleFile(file);
                      setArticlePreview(URL.createObjectURL(file));
                    }}
                  />
                  Choisir une image
                </label>
                <p className="mt-2 text-xs text-slate-500">
                  Cliquez pour sélectionner l’image de couverture.
                </p>
              </div>
              {(articlePreview || form.coverImage) && (
                <div className="overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={articlePreview || form.coverImage}
                    alt="Prévisualisation"
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}
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

            <button
              type="submit"
              disabled={loading || articleSaving}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
            >
              {loading || articleSaving ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner />
                  Enregistrement...
                </span>
              ) : editingId ? (
                "Mettre à jour"
              ) : (
                "Créer l’article"
              )}
            </button>
          </form>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Profil du Directeur Général
            </h2>
            <button
              type="button"
              onClick={() => setDirectorEditing((prev) => !prev)}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
            >
              {directorEditing ? "Fermer" : "Modifier"}
            </button>
          </div>

          {!directorEditing && (
            <div className="mt-6 flex flex-wrap items-center gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="h-28 w-20 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {director.photoUrl ? (
                  <img
                    src={director.photoUrl}
                    alt="Photo DG"
                    className="h-full w-full object-contain p-1"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                    Photo
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {director.name || "Directeur Général"}
                </p>
                <p className="text-xs text-slate-600">{director.title || "Fonction"}</p>
              </div>
            </div>
          )}

          {directorEditing && (
            <form onSubmit={handleDirectorSubmit} className="mt-6 grid gap-4">
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
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      setDirectorFile(file);
                      setDirectorPreview(URL.createObjectURL(file));
                    }}
                  />
                  Choisir une photo
                </label>
                <p className="mt-2 text-xs text-slate-500">
                  Cliquez pour sélectionner la photo officielle.
                </p>
              </div>
              {(directorPreview || director.photoUrl) && (
                <div className="max-w-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <img
                    src={directorPreview || director.photoUrl}
                    alt="Photo DG"
                    className="aspect-[3/4] w-full object-contain p-2"
                  />
                </div>
              )}
              <textarea
                name="bio"
                value={director.bio}
                onChange={handleDirectorChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                rows={5}
                placeholder="Biographie"
                required
              />
              <textarea
                name="message"
                value={director.message}
                onChange={handleDirectorChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                rows={4}
                placeholder="Message du DG"
                required
              />
              <button
                type="submit"
                disabled={directorSaving}
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
              >
                {directorSaving ? (
                  <span className="inline-flex items-center gap-2">
                    <Spinner />
                    Enregistrement...
                  </span>
                ) : (
                  "Enregistrer le profil"
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Articles existants</h2>
        <div className="mt-6 space-y-4">
          {articles.length === 0 && (
            <p className="text-sm text-slate-500">Aucun article enregistré.</p>
          )}
          {articles.map((article) => (
            <div key={article._id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{article.title}</p>
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
                  disabled={actionLoading[`publish-${article._id}`]}
                  className="rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700"
                >
                  {actionLoading[`publish-${article._id}`] ? (
                    <span className="inline-flex items-center gap-2">
                      <Spinner className="h-3 w-3 border-emerald-600" />
                      En cours...
                    </span>
                  ) : article.status === "published" ? (
                    "Passer en brouillon"
                  ) : (
                    "Publier"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(article._id)}
                  disabled={actionLoading[`delete-${article._id}`]}
                  className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600"
                >
                  {actionLoading[`delete-${article._id}`] ? (
                    <span className="inline-flex items-center gap-2">
                      <Spinner className="h-3 w-3 border-red-500" />
                      Suppression...
                    </span>
                  ) : (
                    "Supprimer"
                  )}
                </button>
              </div>
            </div>
          ))}
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
              disabled={serviceSaving}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
            >
              {serviceSaving ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner />
                  Ajout...
                </span>
              ) : (
                "Ajouter"
              )}
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
                  disabled={actionLoading[`service-${service._id}`]}
                  className="mt-2 text-xs font-semibold text-red-600"
                >
                  {actionLoading[`service-${service._id}`] ? (
                    <span className="inline-flex items-center gap-2">
                      <Spinner className="h-3 w-3 border-red-500" />
                      Suppression...
                    </span>
                  ) : (
                    "Supprimer"
                  )}
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
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setPartnerFile(file);
                    setPartnerPreview(URL.createObjectURL(file));
                  }}
                />
                Choisir un logo
              </label>
              <p className="mt-2 text-xs text-slate-500">
                Cliquez pour sélectionner le logo.
              </p>
            </div>
            {partnerPreview && (
              <div className="flex items-center gap-3">
                <img
                  src={partnerPreview}
                  alt="Logo partenaire"
                  className="h-20 w-20 rounded-full object-contain"
                />
                <span className="text-xs text-slate-500">Prévisualisation</span>
              </div>
            )}
            <button
              type="submit"
              disabled={partnerSaving}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
            >
              {partnerSaving ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner />
                  Ajout...
                </span>
              ) : (
                "Ajouter"
              )}
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
                  disabled={actionLoading[`partner-${partner._id}`]}
                  className="mt-2 text-xs font-semibold text-red-600"
                >
                  {actionLoading[`partner-${partner._id}`] ? (
                    <span className="inline-flex items-center gap-2">
                      <Spinner className="h-3 w-3 border-red-500" />
                      Suppression...
                    </span>
                  ) : (
                    "Supprimer"
                  )}
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
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white">
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setGalleryFile(file);
                    setGalleryPreview(URL.createObjectURL(file));
                  }}
                />
                Choisir un média
              </label>
              <p className="mt-2 text-xs text-slate-500">
                Cliquez pour sélectionner une image ou une vidéo.
              </p>
            </div>
            {galleryPreview &&
              (galleryFile?.type.startsWith("video/") ? (
                <video
                  src={galleryPreview}
                  className="h-48 w-full rounded-xl object-cover"
                  controls
                />
              ) : (
                <img
                  src={galleryPreview}
                  alt="Prévisualisation"
                  className="h-48 w-full rounded-xl object-cover"
                />
              ))}
            <button
              type="submit"
              disabled={gallerySaving}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
            >
              {gallerySaving ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner />
                  Ajout...
                </span>
              ) : (
                "Ajouter"
              )}
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
                  disabled={actionLoading[`gallery-${item._id}`]}
                  className="mt-2 text-xs font-semibold text-red-600"
                >
                  {actionLoading[`gallery-${item._id}`] ? (
                    <span className="inline-flex items-center gap-2">
                      <Spinner className="h-3 w-3 border-red-500" />
                      Suppression...
                    </span>
                  ) : (
                    "Supprimer"
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-900">Profil du Directeur Général</h2>
          <button
            type="button"
            onClick={() => setDirectorEditing((prev) => !prev)}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
          >
            {directorEditing ? "Fermer" : "Modifier"}
          </button>
        </div>

        {!directorEditing && (
          <div className="mt-6 flex flex-wrap items-center gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="h-24 w-20 overflow-hidden rounded-xl bg-white shadow-sm">
              {director.photoUrl ? (
                <img
                  src={director.photoUrl}
                  alt="Photo DG"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                  Photo
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {director.name || "Directeur Général"}
              </p>
              <p className="text-xs text-slate-600">
                {director.title || "Fonction"}
              </p>
            </div>
          </div>
        )}

        {directorEditing && (
          <form onSubmit={handleDirectorSubmit} className="mt-6 grid gap-4 lg:grid-cols-[1fr,1.2fr]">
            <div className="space-y-4">
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
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      setDirectorFile(file);
                      setDirectorPreview(URL.createObjectURL(file));
                    }}
                  />
                  Choisir une photo
                </label>
                <p className="mt-2 text-xs text-slate-500">
                  Cliquez pour sélectionner la photo officielle.
                </p>
              </div>
              {(directorPreview || director.photoUrl) && (
                <div className="max-w-xs overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={directorPreview || director.photoUrl}
                    alt="Photo DG"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="space-y-4">
              <textarea
                name="bio"
                value={director.bio}
                onChange={handleDirectorChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                rows={6}
                placeholder="Biographie"
                required
              />
              <textarea
                name="message"
                value={director.message}
                onChange={handleDirectorChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                rows={5}
                placeholder="Message du DG"
                required
              />
              <button
                type="submit"
                disabled={directorSaving}
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
              >
                {directorSaving ? (
                  <span className="inline-flex items-center gap-2">
                    <Spinner />
                    Enregistrement...
                  </span>
                ) : (
                  "Enregistrer le profil"
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Contenus institutionnels
        </h2>
        <form onSubmit={handleContentSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
          <textarea
            name="homeMessage"
            value={content.homeMessage}
            onChange={handleContentChange}
            className="md:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            rows={3}
            placeholder="Message institutionnel (Accueil)"
          />
          <textarea
            name="homeAbout"
            value={content.homeAbout}
            onChange={handleContentChange}
            className="md:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            rows={3}
            placeholder="Présentation synthétique (Accueil)"
          />
          <textarea
            name="homeHistory"
            value={content.homeHistory}
            onChange={handleContentChange}
            className="md:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            rows={3}
            placeholder="Historique résumé (Accueil)"
          />
          <textarea
            name="presentationAbout"
            value={content.presentationAbout}
            onChange={handleContentChange}
            className="md:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            rows={4}
            placeholder="Présentation détaillée (Page Présentation)"
          />
          <textarea
            name="presentationVision"
            value={content.presentationVision}
            onChange={handleContentChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            rows={3}
            placeholder="Vision"
          />
          <textarea
            name="presentationMission"
            value={content.presentationMission}
            onChange={handleContentChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            rows={3}
            placeholder="Mission"
          />
          <textarea
            name="presentationValues"
            value={content.presentationValues}
            onChange={handleContentChange}
            className="md:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            rows={3}
            placeholder="Valeurs"
          />
          <input
            name="contactAddress"
            value={content.contactAddress}
            onChange={handleContentChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            placeholder="Adresse"
          />
          <input
            name="contactPhone"
            value={content.contactPhone}
            onChange={handleContentChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            placeholder="Téléphone"
          />
          <input
            name="contactEmail"
            value={content.contactEmail}
            onChange={handleContentChange}
            className="md:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            placeholder="Email"
          />
          <input
            name="mapEmbedUrl"
            value={content.mapEmbedUrl}
            onChange={handleContentChange}
            className="md:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            placeholder="URL d’iframe Google Maps"
          />
          <button
            type="submit"
            disabled={contentSaving}
            className="md:col-span-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
          >
            {contentSaving ? (
              <span className="inline-flex items-center gap-2">
                <Spinner />
                Enregistrement...
              </span>
            ) : (
              "Enregistrer les contenus"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
