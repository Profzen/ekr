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

type TeamMember = {
  _id: string;
  name: string;
  role: string;
  photoUrl?: string;
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
  homeHeroBackgroundUrl: string;
  homeStat1Value: string;
  homeStat1Label: string;
  homeStat2Value: string;
  homeStat2Label: string;
  homeStat3Value: string;
  homeStat3Label: string;
  homeStat4Value: string;
  homeStat4Label: string;
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

const initialTeam = {
  name: "",
  role: "",
  photoUrl: "",
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
  homeHeroBackgroundUrl: "/agro2.jpg",
  homeStat1Value: "",
  homeStat1Label: "",
  homeStat2Value: "",
  homeStat2Label: "",
  homeStat3Value: "",
  homeStat3Label: "",
  homeStat4Value: "",
  homeStat4Label: "",
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
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [director, setDirector] = useState<DirectorProfile>(initialDirector);
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [form, setForm] = useState<FormState>(initialState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState(initialService);
  const [partnerForm, setPartnerForm] = useState(initialPartner);
  const [teamForm, setTeamForm] = useState(initialTeam);
  const [galleryForm, setGalleryForm] = useState(initialGallery);
  const [articleFile, setArticleFile] = useState<File | null>(null);
  const [articlePreview, setArticlePreview] = useState<string>("");
  const [partnerFile, setPartnerFile] = useState<File | null>(null);
  const [partnerPreview, setPartnerPreview] = useState<string>("");
  const [teamFile, setTeamFile] = useState<File | null>(null);
  const [teamPreview, setTeamPreview] = useState<string>("");
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string>("");
  const [directorFile, setDirectorFile] = useState<File | null>(null);
  const [directorPreview, setDirectorPreview] = useState<string>("");
  const [heroBackgroundFile, setHeroBackgroundFile] = useState<File | null>(null);
  const [heroBackgroundPreview, setHeroBackgroundPreview] = useState<string>("");
  const [articleSaving, setArticleSaving] = useState(false);
  const [serviceSaving, setServiceSaving] = useState(false);
  const [partnerSaving, setPartnerSaving] = useState(false);
  const [teamSaving, setTeamSaving] = useState(false);
  const [gallerySaving, setGallerySaving] = useState(false);
  const [directorSaving, setDirectorSaving] = useState(false);
  const [contentSaving, setContentSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [directorEditing, setDirectorEditing] = useState(false);
  const [partnerEditingId, setPartnerEditingId] = useState<string | null>(null);
  const [teamEditingId, setTeamEditingId] = useState<string | null>(null);
  const [sessionStatus, setSessionStatus] = useState<"ok" | "expired" | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const articleFormRef = useRef<HTMLFormElement | null>(null);

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

  const loadTeam = async () => {
    const result = await fetchJsonSafe("/api/team", { cache: "no-store" });
    setTeam(result.data?.data ?? []);
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
      const heroBackgroundUrl = result.data.data.homeHeroBackgroundUrl ?? "/agro2.jpg";
      setContent({
        homeMessage: result.data.data.homeMessage ?? "",
        homeAbout: result.data.data.homeAbout ?? "",
        homeHistory: result.data.data.homeHistory ?? "",
        homeHeroBackgroundUrl: heroBackgroundUrl,
        homeStat1Value: result.data.data.homeStat1Value ?? "",
        homeStat1Label: result.data.data.homeStat1Label ?? "",
        homeStat2Value: result.data.data.homeStat2Value ?? "",
        homeStat2Label: result.data.data.homeStat2Label ?? "",
        homeStat3Value: result.data.data.homeStat3Value ?? "",
        homeStat3Label: result.data.data.homeStat3Label ?? "",
        homeStat4Value: result.data.data.homeStat4Value ?? "",
        homeStat4Label: result.data.data.homeStat4Label ?? "",
        presentationAbout: result.data.data.presentationAbout ?? "",
        presentationVision: result.data.data.presentationVision ?? "",
        presentationMission: result.data.data.presentationMission ?? "",
        presentationValues: result.data.data.presentationValues ?? "",
        contactAddress: result.data.data.contactAddress ?? "",
        contactPhone: result.data.data.contactPhone ?? "",
        contactEmail: result.data.data.contactEmail ?? "",
        mapEmbedUrl: result.data.data.mapEmbedUrl ?? "",
      });
      setHeroBackgroundPreview(heroBackgroundUrl);
    }
  };

  const checkAdminSession = async () => {
    try {
      const res = await fetch("/api/admin/check", { cache: "no-store" });
      setSessionStatus(res.ok ? "ok" : "expired");
    } catch (error) {
      setSessionStatus("expired");
    }
  };

  useEffect(() => {
    loadArticles();
    loadServices();
    loadPartners();
    loadTeam();
    loadGallery();
    loadDirector();
    loadContent();
    checkAdminSession();
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

  const handleTeamChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setTeamForm((prev) => ({ ...prev, [name]: value }));
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
    if (articleFormRef.current) {
      articleFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
      const url = partnerEditingId ? `/api/partners/${partnerEditingId}` : "/api/partners";
      const method = partnerEditingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...partnerForm, logoUrl }),
      });
      await ensureOk(res, "Enregistrement impossible.");
      setPartnerForm(initialPartner);
      setPartnerFile(null);
      setPartnerPreview("");
      setPartnerEditingId(null);
      await loadPartners();
      showSuccess(partnerEditingId ? "Partenaire mis à jour." : "Partenaire enregistré.");
    } catch (err) {
      setError("Impossible d'enregistrer le partenaire.");
    } finally {
      setPartnerSaving(false);
    }
  };

  const handlePartnerEdit = (partner: Partner) => {
    setPartnerEditingId(partner._id);
    setPartnerForm({
      name: partner.name,
      logoUrl: partner.logoUrl ?? "",
      isActive: partner.isActive,
      order: partner.order ?? 0,
    });
    setPartnerFile(null);
    setPartnerPreview(partner.logoUrl ?? "");
  };

  const handlePartnerCancel = () => {
    setPartnerEditingId(null);
    setPartnerForm(initialPartner);
    setPartnerFile(null);
    setPartnerPreview("");
  };

  const handleTeamSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setTeamSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const photoUrl = teamFile ? await uploadFile(teamFile) : teamForm.photoUrl;
      const url = teamEditingId ? `/api/team/${teamEditingId}` : "/api/team";
      const method = teamEditingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...teamForm, photoUrl }),
      });
      await ensureOk(res, "Enregistrement impossible.");
      setTeamForm(initialTeam);
      setTeamFile(null);
      setTeamPreview("");
      setTeamEditingId(null);
      await loadTeam();
      showSuccess(teamEditingId ? "Membre mis à jour." : "Membre ajouté.");
    } catch (err) {
      setError("Impossible d'enregistrer le membre.");
    } finally {
      setTeamSaving(false);
    }
  };

  const handleTeamEdit = (member: TeamMember) => {
    setTeamEditingId(member._id);
    setTeamForm({
      name: member.name,
      role: member.role,
      photoUrl: member.photoUrl ?? "",
      isActive: member.isActive,
      order: member.order ?? 0,
    });
    setTeamFile(null);
    setTeamPreview(member.photoUrl ?? "");
  };

  const handleTeamCancel = () => {
    setTeamEditingId(null);
    setTeamForm(initialTeam);
    setTeamFile(null);
    setTeamPreview("");
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

  const deleteTeamMember = async (id: string) => {
    if (!confirm("Supprimer ce membre ?")) return;
    setActionLoading((prev) => ({ ...prev, [`team-${id}`]: true }));
    const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
    await ensureOk(res, "Suppression impossible.");
    await loadTeam();
    setActionLoading((prev) => ({ ...prev, [`team-${id}`]: false }));
    showSuccess("Membre supprimé.");
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
      const heroBackgroundUrl = heroBackgroundFile
        ? await uploadFile(heroBackgroundFile)
        : content.homeHeroBackgroundUrl;
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...content,
          homeHeroBackgroundUrl: heroBackgroundUrl,
        }),
      });
      await ensureOk(res, "Enregistrement impossible.");
      await loadContent();
      setHeroBackgroundFile(null);
      showSuccess("Contenus enregistrés.");
    } finally {
      setContentSaving(false);
    }
  };

  const handleHeroBackgroundSave = async () => {
    setContentSaving(true);
    setError(null);
    setSuccess(null);
    try {
      let heroBackgroundUrl = content.homeHeroBackgroundUrl;
      if (heroBackgroundFile) {
        heroBackgroundUrl = await uploadFile(heroBackgroundFile);
      }
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...content,
          homeHeroBackgroundUrl: heroBackgroundUrl,
        }),
      });
      await ensureOk(res, "Enregistrement impossible.");
      await loadContent();
      setHeroBackgroundFile(null);
      showSuccess("Fond Accueil mise à jour.");
    } catch (err) {
      setError("Impossible de mettre à jour le fond.");
    } finally {
      setContentSaving(false);
    }
  };

  const handleRevertToDefaultBackground = async () => {
    setContentSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...content,
          homeHeroBackgroundUrl: "/agro2.jpg",
        }),
      });
      await ensureOk(res, "Enregistrement impossible.");
      await loadContent();
      setHeroBackgroundFile(null);
      setHeroBackgroundPreview("");
      showSuccess("Fond Accueil revenu à la valeur par défaut.");
    } catch (err) {
      setError("Impossible de revenir au fond par défaut.");
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
      {sessionStatus && (
        <div
          className={`rounded-2xl border px-4 py-3 text-xs font-semibold ${
            sessionStatus === "ok"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>
              {sessionStatus === "ok"
                ? "Session admin active."
                : "Session expirée ou invalide. Reconnecte-toi."}
            </span>
            {sessionStatus === "expired" && (
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/admin/login";
                }}
                className="rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-semibold text-red-700"
              >
                Se reconnecter
              </button>
            )}
          </div>
        </div>
      )}
      {(success || error) && (
        <div className="fixed left-1/2 top-6 z-50 w-[90%] max-w-xl -translate-x-1/2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base shadow-xl">
          {success && <p className="text-emerald-700">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      )}
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Créer un article</h2>
          <p className="mt-2 text-sm text-slate-600">
            Les articles publiés apparaîtront sur le site public.
          </p>

          <form ref={articleFormRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Titre de l'article</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Titre"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Résumé court</label>
              <input
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Résumé court"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Contenu détaillé</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Contenu détaillé"
                required
              />
            </div>
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
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Catégorie</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Catégorie"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Statut</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
              </select>
            </div>

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
        <div className="flex h-full flex-col gap-10">
          <div className="flex flex-1 flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
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
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Nom complet</label>
                  <input
                    name="name"
                    value={director.name}
                    onChange={handleDirectorChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                    placeholder="Nom complet"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Titre / Fonction</label>
                  <input
                    name="title"
                    value={director.title}
                    onChange={handleDirectorChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                    placeholder="Titre / Fonction"
                    required
                  />
                </div>
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
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Biographie</label>
                  <textarea
                    name="bio"
                    value={director.bio}
                    onChange={handleDirectorChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                    rows={5}
                    placeholder="Biographie"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Message du DG</label>
                  <textarea
                    name="message"
                    value={director.message}
                    onChange={handleDirectorChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                    rows={4}
                    placeholder="Message du DG"
                    required
                  />
                </div>
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
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Fond Accueil</h2>
            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      setHeroBackgroundFile(file);
                      setHeroBackgroundPreview(URL.createObjectURL(file));
                    }}
                  />
                  Choisir une image
                </label>
              </div>
              {(heroBackgroundPreview || content.homeHeroBackgroundUrl) && (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <img
                      src={heroBackgroundPreview || content.homeHeroBackgroundUrl}
                      alt="Prévisualisation fond accueil"
                      className="h-96 w-full object-cover"
                    />
                  </div>
                  {heroBackgroundFile && (
                    <button
                      type="button"
                      onClick={handleHeroBackgroundSave}
                      disabled={contentSaving}
                      className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white"
                    >
                      {contentSaving ? (
                        <span className="inline-flex items-center gap-2">
                          <Spinner className="h-3 w-3 border-white" />
                          Enregistrement...
                        </span>
                      ) : (
                        "Valider le fond"
                      )}
                    </button>
                  )}
                </div>
              )}
              <button
                type="button"
                onClick={handleRevertToDefaultBackground}
                disabled={contentSaving}
                className="w-full rounded-xl bg-slate-600 px-4 py-2 text-xs font-semibold text-white"
              >
                {contentSaving ? (
                  <span className="inline-flex items-center gap-2">
                    <Spinner className="h-3 w-3 border-white" />
                    Enregistrement...
                  </span>
                ) : (
                  "Revenir au fond par defaut"
                )}
              </button>
            </div>
          </div>
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
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Titre du service</label>
              <input
                name="title"
                value={serviceForm.title}
                onChange={handleServiceChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Titre du service"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Description</label>
              <textarea
                name="description"
                value={serviceForm.description}
                onChange={handleServiceChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                rows={3}
                placeholder="Description"
                required
              />
            </div>
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
          <h2 className="text-xl font-semibold text-slate-900">Equipe</h2>
          <form onSubmit={handleTeamSubmit} className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Nom et prenom</label>
              <input
                name="name"
                value={teamForm.name}
                onChange={handleTeamChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Nom et prenom"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Poste</label>
              <input
                name="role"
                value={teamForm.role}
                onChange={handleTeamChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Poste"
                required
              />
            </div>
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setTeamFile(file);
                    setTeamPreview(URL.createObjectURL(file));
                  }}
                />
                Choisir une photo
              </label>
              <p className="mt-2 text-xs text-slate-500">
                Cliquez pour selectionner une photo.
              </p>
            </div>
            {teamPreview && (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <img
                  src={teamPreview}
                  alt="Previsualisation"
                  className="h-48 w-full object-cover"
                />
              </div>
            )}
            <button
              type="submit"
              disabled={teamSaving}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
            >
              {teamSaving ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner />
                  Enregistrement...
                </span>
              ) : teamEditingId ? "Mettre a jour" : "Ajouter"}
            </button>
            {teamEditingId && (
              <button
                type="button"
                onClick={handleTeamCancel}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600"
              >
                Annuler
              </button>
            )}
          </form>
          <div className="mt-4 space-y-2 text-sm">
            {team.map((member) => (
              <div key={member._id} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-slate-200 bg-white">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                        Photo
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleTeamEdit(member)}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteTeamMember(member._id)}
                    disabled={actionLoading[`team-${member._id}`]}
                    className="text-xs font-semibold text-red-600"
                  >
                    {actionLoading[`team-${member._id}`] ? (
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

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Partenaires</h2>
          <form onSubmit={handlePartnerSubmit} className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Nom du partenaire</label>
              <input
                name="name"
                value={partnerForm.name}
                onChange={handlePartnerChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Nom du partenaire"
                required
              />
            </div>
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
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <img
                  src={partnerPreview}
                  alt="Prévisualisation logo"
                  className="h-48 w-full object-contain"
                />
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
              ) : partnerEditingId ? "Mettre à jour" : "Ajouter"}
            </button>
            {partnerEditingId && (
              <button
                type="button"
                onClick={handlePartnerCancel}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600"
              >
                Annuler
              </button>
            )}
          </form>
          <div className="mt-4 space-y-2 text-sm">
            {partners.map((partner) => (
              <div key={partner._id} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-slate-200 bg-white">
                    {partner.logoUrl ? (
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="h-full w-full object-contain p-1"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                        Logo
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{partner.name}</p>
                    <p className="text-xs text-slate-500">
                      {partner.logoUrl ? "Logo enregistré" : "Sans logo"}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handlePartnerEdit(partner)}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    Modifier
                  </button>
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
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Galerie</h2>
          <form onSubmit={handleGallerySubmit} className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Titre du projet/photo</label>
              <input
                name="title"
                value={galleryForm.title}
                onChange={handleGalleryChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Titre"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Catégorie</label>
              <input
                name="category"
                value={galleryForm.category}
                onChange={handleGalleryChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                placeholder="Catégorie"
                required
              />
            </div>
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
        <h2 className="text-xl font-semibold text-slate-900">
          Contenus institutionnels
        </h2>
        <form onSubmit={handleContentSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Message institutionnel (Accueil)</label>
            <textarea
              name="homeMessage"
            value={content.homeMessage}
            onChange={handleContentChange}
            className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
              content.homeMessage ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
            }`}
            rows={3}
              placeholder="Message institutionnel (Accueil)"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Présentation synthétique (Accueil)</label>
            <textarea
              name="homeAbout"
            value={content.homeAbout}
            onChange={handleContentChange}
            className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
              content.homeAbout ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
            }`}
            rows={3}
              placeholder="Présentation synthétique (Accueil)"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Historique résumé (Accueil)</label>
            <textarea
              name="homeHistory"
            value={content.homeHistory}
            onChange={handleContentChange}
            className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
              content.homeHistory ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
            }`}
            rows={3}
              placeholder="Historique résumé (Accueil)"
            />
          </div>
          <div className="md:col-span-2 mt-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Chiffres clés (Accueil)
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <input
                name="homeStat1Value"
                value={content.homeStat1Value}
                onChange={handleContentChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm ${
                  content.homeStat1Value ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
                }`}
                placeholder="Valeur 1 (ex: +12)"
              />
              <input
                name="homeStat1Label"
                value={content.homeStat1Label}
                onChange={handleContentChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm ${
                  content.homeStat1Label ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
                }`}
                placeholder="Libellé 1 (ex: Services spécialisés)"
              />
              <input
                name="homeStat2Value"
                value={content.homeStat2Value}
                onChange={handleContentChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm ${
                  content.homeStat2Value ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
                }`}
                placeholder="Valeur 2 (ex: +40)"
              />
              <input
                name="homeStat2Label"
                value={content.homeStat2Label}
                onChange={handleContentChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm ${
                  content.homeStat2Label ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
                }`}
                placeholder="Libellé 2 (ex: Projets accompagnés)"
              />
              <input
                name="homeStat3Value"
                value={content.homeStat3Value}
                onChange={handleContentChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm ${
                  content.homeStat3Value ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
                }`}
                placeholder="Valeur 3 (ex: 8)"
              />
              <input
                name="homeStat3Label"
                value={content.homeStat3Label}
                onChange={handleContentChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm ${
                  content.homeStat3Label ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
                }`}
                placeholder="Libellé 3 (ex: Pays partenaires)"
              />
              <input
                name="homeStat4Value"
                value={content.homeStat4Value}
                onChange={handleContentChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm ${
                  content.homeStat4Value ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
                }`}
                placeholder="Valeur 4 (ex: 24/7)"
              />
              <input
                name="homeStat4Label"
                value={content.homeStat4Label}
                onChange={handleContentChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm ${
                  content.homeStat4Label ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
                }`}
                placeholder="Libellé 4 (ex: Suivi des actions)"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Présentation détaillée (Page Présentation)</label>
            <textarea
              name="presentationAbout"
            value={content.presentationAbout}
            onChange={handleContentChange}
            className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
              content.presentationAbout ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
            }`}
            rows={4}
              placeholder="Présentation détaillée (Page Présentation)"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Vision</label>
            <textarea
              name="presentationVision"
            value={content.presentationVision}
            onChange={handleContentChange}
            className={`w-full rounded-xl border px-4 py-3 text-sm ${
              content.presentationVision ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
            }`}
            rows={3}
              placeholder="Vision"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Mission</label>
            <textarea
              name="presentationMission"
            value={content.presentationMission}
            onChange={handleContentChange}
            className={`w-full rounded-xl border px-4 py-3 text-sm ${
              content.presentationMission ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
            }`}
            rows={3}
              placeholder="Mission"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Valeurs</label>
            <textarea
              name="presentationValues"
            value={content.presentationValues}
            onChange={handleContentChange}
            className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
              content.presentationValues ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
            }`}
            rows={3}
              placeholder="Valeurs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Adresse</label>
            <input
              name="contactAddress"
            value={content.contactAddress}
            onChange={handleContentChange}
            className={`w-full rounded-xl border px-4 py-3 text-sm ${
              content.contactAddress ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
            }`}
              placeholder="Adresse"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Téléphone</label>
            <input
              name="contactPhone"
            value={content.contactPhone}
            onChange={handleContentChange}
            className={`w-full rounded-xl border px-4 py-3 text-sm ${
              content.contactPhone ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
            }`}
              placeholder="Téléphone"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Email</label>
            <input
              name="contactEmail"
            value={content.contactEmail}
            onChange={handleContentChange}
            className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
              content.contactEmail ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
            }`}
              placeholder="Email"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">URL d'iframe Google Maps</label>
            <input
              name="mapEmbedUrl"
            value={content.mapEmbedUrl}
            onChange={handleContentChange}
            className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
              content.mapEmbedUrl ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
            }`}
            placeholder="URL d’iframe Google Maps"
          />
          </div>
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
