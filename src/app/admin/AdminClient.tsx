"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  Settings,
  Image as ImageIcon,
  LogOut,
} from "lucide-react";

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
  imageUrl?: string;
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

type Activity = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  order?: number;
};

type AdminSectionKey =
  | "articles"
  | "services"
  | "activities"
  | "partners"
  | "team"
  | "gallery"
  | "content"
  | "profile"
  | "settings";

type DirectorProfile = {
  _id?: string;
  name: string;
  title: string;
  photoUrl: string;
  bio: string;
  message: string;
};

type SiteContent = {
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introText: string;
  homeHeroIntro: string;
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
  presentationHistoryTitle: string;
  presentationHistoryParagraph1: string;
  presentationHistoryParagraph2: string;
  presentationHistoryStatYear: string;
  presentationHistoryStatYearLabel: string;
  presentationHistoryStatJobs: string;
  presentationHistoryStatJobsLabel: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  mapEmbedUrl: string;
  socialLinkedinUrl: string;
  socialXUrl: string;
  socialFacebookUrl: string;
  socialWhatsappUrl: string;
  socialInstagramUrl: string;
};

type FormState = {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  status: "draft" | "published";
  publishedAt: string;
};

const initialState: FormState = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "Actualités",
  status: "draft",
  publishedAt: new Date().toISOString().split('T')[0],
};

const initialService = {
  title: "",
  description: "",
  imageUrl: "",
  isActive: true,
  order: 0,
};

const initialActivity = {
  title: "",
  description: "",
  icon: "",
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
  heroTitle: "",
  heroSubtitle: "",
  introTitle: "",
  introText: "",
  homeHeroIntro: "",
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
  presentationHistoryTitle: "Notre Histoire",
  presentationHistoryParagraph1: "",
  presentationHistoryParagraph2: "",
  presentationHistoryStatYear: "2018",
  presentationHistoryStatYearLabel: "Année de création",
  presentationHistoryStatJobs: "500+",
  presentationHistoryStatJobsLabel: "Emplois indirects",
  contactAddress: "",
  contactPhone: "",
  contactEmail: "",
  mapEmbedUrl: "",
  socialLinkedinUrl: "",
  socialXUrl: "",
  socialFacebookUrl: "",
  socialWhatsappUrl: "",
  socialInstagramUrl: "",
};

export default function AdminClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [director, setDirector] = useState<DirectorProfile>(initialDirector);
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [form, setForm] = useState<FormState>(initialState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState(initialService);
  const [activityForm, setActivityForm] = useState(initialActivity);
  const [partnerForm, setPartnerForm] = useState(initialPartner);
  const [teamForm, setTeamForm] = useState(initialTeam);
  const [galleryForm, setGalleryForm] = useState(initialGallery);
  const [articleFile, setArticleFile] = useState<File | null>(null);
  const [articlePreview, setArticlePreview] = useState<string>("");
  const [serviceFile, setServiceFile] = useState<File | null>(null);
  const [servicePreview, setServicePreview] = useState<string>("");
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
  const [activitySaving, setActivitySaving] = useState(false);
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
  const [activeSection, setActiveSection] = useState<AdminSectionKey>("content");
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

  const loadActivities = async () => {
    const result = await fetchJsonSafe("/api/activities", { cache: "no-store" });
    setActivities(result.data?.data ?? []);
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
        heroTitle: result.data.data.heroTitle ?? "",
        heroSubtitle: result.data.data.heroSubtitle ?? "",
        introTitle: result.data.data.introTitle ?? "",
        introText: result.data.data.introText ?? "",
        homeHeroIntro: result.data.data.homeHeroIntro ?? "",
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
        presentationHistoryTitle: result.data.data.presentationHistoryTitle ?? "Notre Histoire",
        presentationHistoryParagraph1: result.data.data.presentationHistoryParagraph1 ?? "",
        presentationHistoryParagraph2: result.data.data.presentationHistoryParagraph2 ?? "",
        presentationHistoryStatYear: result.data.data.presentationHistoryStatYear ?? "2018",
        presentationHistoryStatYearLabel:
          result.data.data.presentationHistoryStatYearLabel ?? "Année de création",
        presentationHistoryStatJobs: result.data.data.presentationHistoryStatJobs ?? "500+",
        presentationHistoryStatJobsLabel:
          result.data.data.presentationHistoryStatJobsLabel ?? "Emplois indirects",
        contactAddress: result.data.data.contactAddress ?? "",
        contactPhone: result.data.data.contactPhone ?? "",
        contactEmail: result.data.data.contactEmail ?? "",
        mapEmbedUrl: result.data.data.mapEmbedUrl ?? "",
        socialLinkedinUrl: result.data.data.socialLinkedinUrl ?? "",
        socialXUrl: result.data.data.socialXUrl ?? "",
        socialFacebookUrl: result.data.data.socialFacebookUrl ?? "",
        socialWhatsappUrl: result.data.data.socialWhatsappUrl ?? "",
        socialInstagramUrl: result.data.data.socialInstagramUrl ?? "",
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
    loadActivities();
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

  const handleActivityChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivityForm((prev) => ({ ...prev, [name]: value }));
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
    const publishedAtValue = article.publishedAt
      ? new Date(article.publishedAt).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];
    setForm({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      coverImage: article.coverImage ?? "",
      category: article.category ?? "Actualités",
      status: article.status ?? "draft",
      publishedAt: publishedAtValue,
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
      const imageUrl = serviceFile
        ? await uploadFile(serviceFile)
        : serviceForm.imageUrl;
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...serviceForm, imageUrl }),
      });
      await ensureOk(res, "Enregistrement impossible.");
      setServiceForm(initialService);
      setServiceFile(null);
      setServicePreview("");
      await loadServices();
      showSuccess("Service enregistré.");
    } catch (err) {
      setError("Impossible d'enregistrer le service.");
    } finally {
      setServiceSaving(false);
    }
  };

  const handleActivitySubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setActivitySaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activityForm),
      });
      await ensureOk(res, "Enregistrement impossible.");
      setActivityForm(initialActivity);
      await loadActivities();
      showSuccess("Activité enregistrée.");
    } catch (err) {
      setError("Impossible d'enregistrer l'activité.");
    } finally {
      setActivitySaving(false);
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

  const deleteActivity = async (id: string) => {
    if (!confirm("Supprimer cette activité ?")) return;
    setActionLoading((prev) => ({ ...prev, [`activity-${id}`]: true }));
    const res = await fetch(`/api/activities/${id}`, { method: "DELETE" });
    await ensureOk(res, "Suppression impossible.");
    await loadActivities();
    setActionLoading((prev) => ({ ...prev, [`activity-${id}`]: false }));
    showSuccess("Activité supprimée.");
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

  const menuItems: Array<{
    key: AdminSectionKey;
    label: string;
    description: string;
    icon: ComponentType<{ size?: number }>;
  }> = [
    { key: "content", label: "General", description: "Textes et stats", icon: LayoutDashboard },
    { key: "services", label: "Services", description: "Mettre a jour les services", icon: Briefcase },
    { key: "activities", label: "Activités", description: "Gestion des activites", icon: Briefcase },
    { key: "articles", label: "Articles", description: "Creer et gerer les articles", icon: FileText },
    { key: "team", label: "Equipe", description: "Gestion de l'equipe", icon: Users },
    { key: "partners", label: "Partenaires", description: "Logos et partenaires", icon: Users },
    { key: "gallery", label: "Galerie", description: "Photos et videos", icon: ImageIcon },
    { key: "profile", label: "Profil + Fond", description: "DG et fond d'accueil", icon: Settings },
    { key: "settings", label: "Parametres", description: "Session et acces", icon: Settings },
  ];

  const sectionTitle: Record<AdminSectionKey, { title: string; subtitle: string }> = {
    articles: {
      title: "Gestion des articles",
      subtitle: "Creer, modifier et publier vos articles.",
    },
    services: {
      title: "Gestion des services",
      subtitle: "Mettez a jour les services proposes.",
    },
    activities: {
      title: "Gestion des activités",
      subtitle: "Organisez les principales activités de l'entreprise.",
    },
    partners: {
      title: "Gestion des partenaires",
      subtitle: "Ajoutez et maintenez les partenaires.",
    },
    team: {
      title: "Gestion de l'equipe",
      subtitle: "Membres, postes et photos.",
    },
    gallery: {
      title: "Gestion de la galerie",
      subtitle: "Photos et videos du site.",
    },
    content: {
      title: "Contenus institutionnels",
      subtitle: "Textes de presentation et informations de contact.",
    },
    profile: {
      title: "Profil DG et fond d'accueil",
      subtitle: "Edition du directeur et du visuel d'accueil.",
    },
    settings: {
      title: "Parametres",
      subtitle: "Etat de session et actions admin.",
    },
  };

  return (
    <div className="min-h-screen bg-muted/20 flex">
      <aside className="w-64 bg-card border-r border-border h-screen flex flex-col fixed left-0 top-0 overflow-y-auto hidden md:flex">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary">EKR Admin</h2>
          <p className="text-xs text-muted-foreground mt-1">v1.0.0</p>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                  activeSection === item.key
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutLoading}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors text-sm font-medium"
          >
            {logoutLoading ? (
              <span className="inline-flex items-center gap-2">
                <Spinner className="h-3 w-3 border-destructive" />
                Deconnexion...
              </span>
            ) : (
              <>
                <LogOut size={18} />
                Deconnexion
              </>
            )}
          </button>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-screen space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {sectionTitle[activeSection].title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {sectionTitle[activeSection].subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={checkAdminSession}
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground"
          >
            Verifier la session
          </button>
        </div>
        {sessionStatus && (
          <div
            className={`rounded-2xl border px-4 py-3 text-xs font-semibold ${
              sessionStatus === "ok"
                ? "border-emerald-200 bg-muted/20 text-primary"
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
                  className="rounded-full border border-red-200 bg-card px-3 py-1 text-xs font-semibold text-red-700"
                >
                  Se reconnecter
                </button>
              )}
            </div>
          </div>
        )}
        {(success || error) && (
          <div className="fixed left-1/2 top-6 z-50 w-[90%] max-w-xl -translate-x-1/2 rounded-2xl border border-border bg-card px-6 py-4 text-base shadow-xl">
            {success && <p className="text-primary">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}
          </div>
        )}

        {activeSection === "articles" && (
          <div className="space-y-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground">Créer un article</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Les articles publiés apparaîtront sur le site public.
                </p>

                <form ref={articleFormRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Titre de l'article
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Titre"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Résumé court
                    </label>
                    <input
                      name="excerpt"
                      value={form.excerpt}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Résumé court"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Contenu détaillé
                    </label>
                    <textarea
                      name="content"
                      value={form.content}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Contenu détaillé"
                      required
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Astuce : utilisez <span className="font-semibold">**texte**</span> pour afficher du gras.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">
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
                      <p className="mt-2 text-xs text-muted-foreground">
                        Cliquez pour sélectionner l’image de couverture.
                      </p>
                    </div>
                    {(articlePreview || form.coverImage) && (
                      <div className="overflow-hidden rounded-xl bg-muted/20">
                        <img
                          src={articlePreview || form.coverImage}
                          alt="Prévisualisation"
                          className="h-48 w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Catégorie
                    </label>
                    <input
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Catégorie"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Date de publication
                    </label>
                    <input
                      type="date"
                      name="publishedAt"
                      value={form.publishedAt}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Statut
                    </label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                    >
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || articleSaving}
                    className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
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
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">Articles existants</h2>
              <div className="mt-6 space-y-4">
                {articles.length === 0 && (
                  <p className="text-sm text-muted-foreground">Aucun article enregistré.</p>
                )}
                {articles.map((article) => (
                  <div key={article._id} className="rounded-2xl border border-border p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{article.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{article.category}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          article.status === "published"
                            ? "bg-emerald-100 text-primary"
                            : "bg-muted/20 text-muted-foreground"
                        }`}
                      >
                        {article.status === "published" ? "Publié" : "Brouillon"}
                      </span>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">{article.excerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(article)}
                        className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground"
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePublish(article)}
                        disabled={actionLoading[`publish-${article._id}`]}
                        className="rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-primary"
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
          </div>
          </div>
        )}

        {activeSection === "services" && (
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">Services</h2>
            <form onSubmit={handleServiceSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Titre du service
                </label>
                <input
                  name="title"
                  value={serviceForm.title}
                  onChange={handleServiceChange}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Titre du service"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={serviceForm.description}
                  onChange={handleServiceChange}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                  rows={3}
                  placeholder="Description"
                  required
                />
              </div>
              <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">
                  <ImageIcon size={16} />
                  Choisir une image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setServiceFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => setServicePreview(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
                {servicePreview && (
                  <div className="mt-3 relative inline-block">
                    <img src={servicePreview} alt="Aperçu" className="h-12 w-12 rounded-lg object-cover" />
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={serviceSaving}
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
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
                <div key={service._id} className="rounded-xl border border-border p-3">
                  <p className="font-semibold text-foreground">{service.title}</p>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
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
        )}

        {activeSection === "activities" && (
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">Activités</h2>
            <form onSubmit={handleActivitySubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Titre de l'activité
                </label>
                <input
                  name="title"
                  value={activityForm.title}
                  onChange={handleActivityChange}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Titre de l'activité"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={activityForm.description}
                  onChange={handleActivityChange}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                  rows={3}
                  placeholder="Description"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Icon (Sprout, Ship, Leaf, TrendingUp)
                </label>
                <input
                  name="icon"
                  value={activityForm.icon}
                  onChange={handleActivityChange}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Sprout"
                />
              </div>
              <button
                type="submit"
                disabled={activitySaving}
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
              >
                {activitySaving ? (
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
              {activities.map((activity) => (
                <div key={activity._id} className="rounded-xl border border-border p-3">
                  <p className="font-semibold text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <button
                    type="button"
                    onClick={() => deleteActivity(activity._id)}
                    disabled={actionLoading[`activity-${activity._id}`]}
                    className="mt-2 text-xs font-semibold text-red-600"
                  >
                    {actionLoading[`activity-${activity._id}`] ? (
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
        )}

        {activeSection === "team" && (
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">Equipe</h2>
            <form onSubmit={handleTeamSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Nom et prenom
                </label>
                <input
                  name="name"
                  value={teamForm.name}
                  onChange={handleTeamChange}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Nom et prenom"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Poste
                </label>
                <input
                  name="role"
                  value={teamForm.role}
                  onChange={handleTeamChange}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Poste"
                  required
                />
              </div>
              <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">
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
                <p className="mt-2 text-xs text-muted-foreground">
                  Cliquez pour selectionner une photo.
                </p>
              </div>
              {teamPreview && (
                <div className="overflow-hidden rounded-xl border border-border bg-card">
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
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
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
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm font-semibold text-muted-foreground"
                >
                  Annuler
                </button>
              )}
            </form>
            <div className="mt-4 space-y-2 text-sm">
              {team.map((member) => (
                <div key={member._id} className="rounded-xl border border-border p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full border border-border bg-card">
                      {member.photoUrl ? (
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                          Photo
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleTeamEdit(member)}
                      className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground"
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
        )}

        {activeSection === "partners" && (
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">Partenaires</h2>
            <form onSubmit={handlePartnerSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Nom du partenaire
                </label>
                <input
                  name="name"
                  value={partnerForm.name}
                  onChange={handlePartnerChange}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Nom du partenaire"
                  required
                />
              </div>
              <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">
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
                <p className="mt-2 text-xs text-muted-foreground">
                  Cliquez pour sélectionner le logo.
                </p>
              </div>
              {partnerPreview && (
                <div className="overflow-hidden rounded-xl border border-border bg-card">
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
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
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
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm font-semibold text-muted-foreground"
                >
                  Annuler
                </button>
              )}
            </form>
            <div className="mt-4 space-y-2 text-sm">
              {partners.map((partner) => (
                <div key={partner._id} className="rounded-xl border border-border p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full border border-border bg-card">
                      {partner.logoUrl ? (
                        <img
                          src={partner.logoUrl}
                          alt={partner.name}
                          className="h-full w-full object-contain p-1"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                          Logo
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{partner.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {partner.logoUrl ? "Logo enregistré" : "Sans logo"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handlePartnerEdit(partner)}
                      className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground"
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
        )}

        {activeSection === "gallery" && (
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">Galerie</h2>
            <form onSubmit={handleGallerySubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Titre du projet/photo
                </label>
                <input
                  name="title"
                  value={galleryForm.title}
                  onChange={handleGalleryChange}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Titre"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Catégorie
                </label>
                <input
                  name="category"
                  value={galleryForm.category}
                  onChange={handleGalleryChange}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Catégorie"
                  required
                />
              </div>
              <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">
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
                <p className="mt-2 text-xs text-muted-foreground">
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
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
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
                <div key={item._id} className="rounded-xl border border-border p-3">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
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
        )}

        {activeSection === "content" && (
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              Contenus institutionnels
            </h2>
            <form onSubmit={handleContentSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2 mt-2 rounded-2xl border border-border bg-muted/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                  Section Hero (Accueil)
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <textarea
                    name="heroTitle"
                    value={content.heroTitle}
                    onChange={handleContentChange}
                    className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
                      content.heroTitle
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    rows={2}
                    placeholder="Titre principal du Hero (ex: L'Excellence Agricole au Service du Développement)"
                  />
                  <textarea
                    name="heroSubtitle"
                    value={content.heroSubtitle}
                    onChange={handleContentChange}
                    className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
                      content.heroSubtitle
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    rows={3}
                    placeholder="Sous-titre du Hero (ex: EKR Africa Agrovision Group : Une coopérative visionnaire...)"
                  />
                </div>
              </div>
              <div className="md:col-span-2 mt-2 rounded-2xl border border-border bg-muted/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                  Section Intro (À Propos de Nous)
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <textarea
                    name="introTitle"
                    value={content.introTitle}
                    onChange={handleContentChange}
                    className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
                      content.introTitle
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    rows={2}
                    placeholder="Titre de la section Intro (ex: Une Vision Durable pour l'Agriculture Africaine)"
                  />
                  <textarea
                    name="introText"
                    value={content.introText}
                    onChange={handleContentChange}
                    className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
                      content.introText
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    rows={4}
                    placeholder="Texte de la section Intro (ex: Nous croyons en une agriculture qui respecte la terre...)"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Message institutionnel (Accueil)
                </label>
                <textarea
                  name="homeMessage"
                  value={content.homeMessage}
                  onChange={handleContentChange}
                  className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
                    content.homeMessage
                      ? "border-emerald-200 bg-muted/20"
                      : "border-border"
                  }`}
                  rows={3}
                  placeholder="Message institutionnel (Accueil)"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Texte hero (Accueil)
                </label>
                <textarea
                  name="homeHeroIntro"
                  value={content.homeHeroIntro}
                  onChange={handleContentChange}
                  className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
                    content.homeHeroIntro
                      ? "border-emerald-200 bg-muted/20"
                      : "border-border"
                  }`}
                  rows={3}
                  placeholder="Texte du hero (Accueil)"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Présentation synthétique (Accueil)
                </label>
                <textarea
                  name="homeAbout"
                  value={content.homeAbout}
                  onChange={handleContentChange}
                  className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
                    content.homeAbout
                      ? "border-emerald-200 bg-muted/20"
                      : "border-border"
                  }`}
                  rows={3}
                  placeholder="Présentation synthétique (Accueil)"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Historique résumé (Accueil)
                </label>
                <textarea
                  name="homeHistory"
                  value={content.homeHistory}
                  onChange={handleContentChange}
                  className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
                    content.homeHistory
                      ? "border-emerald-200 bg-muted/20"
                      : "border-border"
                  }`}
                  rows={3}
                  placeholder="Historique résumé (Accueil)"
                />
              </div>
              <div className="md:col-span-2 mt-2 rounded-2xl border border-border bg-muted/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Chiffres clés (Accueil)
                </p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <input
                    name="homeStat1Value"
                    value={content.homeStat1Value}
                    onChange={handleContentChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm ${
                      content.homeStat1Value
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    placeholder="Valeur 1 (ex: +12)"
                  />
                  <input
                    name="homeStat1Label"
                    value={content.homeStat1Label}
                    onChange={handleContentChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm ${
                      content.homeStat1Label
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    placeholder="Libellé 1 (ex: Services spécialisés)"
                  />
                  <input
                    name="homeStat2Value"
                    value={content.homeStat2Value}
                    onChange={handleContentChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm ${
                      content.homeStat2Value
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    placeholder="Valeur 2 (ex: +40)"
                  />
                  <input
                    name="homeStat2Label"
                    value={content.homeStat2Label}
                    onChange={handleContentChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm ${
                      content.homeStat2Label
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    placeholder="Libellé 2 (ex: Projets accompagnés)"
                  />
                  <input
                    name="homeStat3Value"
                    value={content.homeStat3Value}
                    onChange={handleContentChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm ${
                      content.homeStat3Value
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    placeholder="Valeur 3 (ex: 8)"
                  />
                  <input
                    name="homeStat3Label"
                    value={content.homeStat3Label}
                    onChange={handleContentChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm ${
                      content.homeStat3Label
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    placeholder="Libellé 3 (ex: Pays partenaires)"
                  />
                  <input
                    name="homeStat4Value"
                    value={content.homeStat4Value}
                    onChange={handleContentChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm ${
                      content.homeStat4Value
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    placeholder="Valeur 4 (ex: 24/7)"
                  />
                  <input
                    name="homeStat4Label"
                    value={content.homeStat4Label}
                    onChange={handleContentChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm ${
                      content.homeStat4Label
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    placeholder="Libellé 4 (ex: Suivi des actions)"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Présentation détaillée (Page Présentation)
                </label>
                <textarea
                  name="presentationAbout"
                  value={content.presentationAbout}
                  onChange={handleContentChange}
                  className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
                    content.presentationAbout
                      ? "border-emerald-200 bg-muted/20"
                      : "border-border"
                  }`}
                  rows={4}
                  placeholder="Présentation détaillée (Page Présentation)"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Vision
                </label>
                <textarea
                  name="presentationVision"
                  value={content.presentationVision}
                  onChange={handleContentChange}
                  className={`w-full rounded-xl border px-4 py-3 text-sm ${
                    content.presentationVision
                      ? "border-emerald-200 bg-muted/20"
                      : "border-border"
                  }`}
                  rows={3}
                  placeholder="Vision"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Mission
                </label>
                <textarea
                  name="presentationMission"
                  value={content.presentationMission}
                  onChange={handleContentChange}
                  className={`w-full rounded-xl border px-4 py-3 text-sm ${
                    content.presentationMission
                      ? "border-emerald-200 bg-muted/20"
                      : "border-border"
                  }`}
                  rows={3}
                  placeholder="Mission"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Valeurs
                </label>
                <textarea
                  name="presentationValues"
                  value={content.presentationValues}
                  onChange={handleContentChange}
                  className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
                    content.presentationValues
                      ? "border-emerald-200 bg-muted/20"
                      : "border-border"
                  }`}
                  rows={3}
                  placeholder="Valeurs"
                />
              </div>
              <div className="md:col-span-2 mt-2 rounded-2xl border border-border bg-muted/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                  Histoire (Page Présentation)
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    name="presentationHistoryTitle"
                    value={content.presentationHistoryTitle}
                    onChange={handleContentChange}
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm"
                    placeholder="Titre (ex: Notre Histoire)"
                  />
                  <input
                    name="presentationHistoryStatYear"
                    value={content.presentationHistoryStatYear}
                    onChange={handleContentChange}
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm"
                    placeholder="Stat année (ex: 2018)"
                  />
                  <input
                    name="presentationHistoryStatYearLabel"
                    value={content.presentationHistoryStatYearLabel}
                    onChange={handleContentChange}
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm"
                    placeholder="Label année"
                  />
                  <input
                    name="presentationHistoryStatJobs"
                    value={content.presentationHistoryStatJobs}
                    onChange={handleContentChange}
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm"
                    placeholder="Stat emplois (ex: 500+)"
                  />
                  <input
                    name="presentationHistoryStatJobsLabel"
                    value={content.presentationHistoryStatJobsLabel}
                    onChange={handleContentChange}
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm md:col-span-2"
                    placeholder="Label emplois"
                  />
                  <textarea
                    name="presentationHistoryParagraph1"
                    value={content.presentationHistoryParagraph1}
                    onChange={handleContentChange}
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm md:col-span-2"
                    rows={3}
                    placeholder="Paragraphe 1"
                  />
                  <textarea
                    name="presentationHistoryParagraph2"
                    value={content.presentationHistoryParagraph2}
                    onChange={handleContentChange}
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm md:col-span-2"
                    rows={3}
                    placeholder="Paragraphe 2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Adresse
                </label>
                <input
                  name="contactAddress"
                  value={content.contactAddress}
                  onChange={handleContentChange}
                  className={`w-full rounded-xl border px-4 py-3 text-sm ${
                    content.contactAddress
                      ? "border-emerald-200 bg-muted/20"
                      : "border-border"
                  }`}
                  placeholder="Adresse"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Téléphone
                </label>
                <input
                  name="contactPhone"
                  value={content.contactPhone}
                  onChange={handleContentChange}
                  className={`w-full rounded-xl border px-4 py-3 text-sm ${
                    content.contactPhone
                      ? "border-emerald-200 bg-muted/20"
                      : "border-border"
                  }`}
                  placeholder="Téléphone"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  name="contactEmail"
                  value={content.contactEmail}
                  onChange={handleContentChange}
                  className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
                    content.contactEmail
                      ? "border-emerald-200 bg-muted/20"
                      : "border-border"
                  }`}
                  placeholder="Email"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  URL d'iframe Google Maps
                </label>
                <input
                  name="mapEmbedUrl"
                  value={content.mapEmbedUrl}
                  onChange={handleContentChange}
                  className={`md:col-span-2 w-full rounded-xl border px-4 py-3 text-sm ${
                    content.mapEmbedUrl
                      ? "border-emerald-200 bg-muted/20"
                      : "border-border"
                  }`}
                  placeholder="URL d’iframe Google Maps"
                />
              </div>
              <div className="md:col-span-2 mt-2 rounded-2xl border border-border bg-muted/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Reseaux sociaux (Contact)
                </p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <input
                    name="socialLinkedinUrl"
                    value={content.socialLinkedinUrl}
                    onChange={handleContentChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm ${
                      content.socialLinkedinUrl
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    placeholder="Lien LinkedIn"
                  />
                  <input
                    name="socialXUrl"
                    value={content.socialXUrl}
                    onChange={handleContentChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm ${
                      content.socialXUrl
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    placeholder="Lien X (Twitter)"
                  />
                  <input
                    name="socialFacebookUrl"
                    value={content.socialFacebookUrl}
                    onChange={handleContentChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm ${
                      content.socialFacebookUrl
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    placeholder="Lien Facebook"
                  />
                  <input
                    name="socialWhatsappUrl"
                    value={content.socialWhatsappUrl}
                    onChange={handleContentChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm ${
                      content.socialWhatsappUrl
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    placeholder="Lien WhatsApp"
                  />
                  <input
                    name="socialInstagramUrl"
                    value={content.socialInstagramUrl}
                    onChange={handleContentChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm ${
                      content.socialInstagramUrl
                        ? "border-emerald-200 bg-muted/20"
                        : "border-border"
                    }`}
                    placeholder="Lien Instagram"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={contentSaving}
                className="md:col-span-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
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
        )}

        {activeSection === "profile" && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-1 flex-col rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Profil du Directeur General
                </h2>
                <button
                  type="button"
                  onClick={() => setDirectorEditing((prev) => !prev)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground"
                >
                  {directorEditing ? "Fermer" : "Modifier"}
                </button>
              </div>

              {!directorEditing && (
                <div className="mt-6 flex flex-wrap items-center gap-6 rounded-2xl border border-border bg-muted/20 p-4">
                  <div className="h-28 w-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    {director.photoUrl ? (
                      <img
                        src={director.photoUrl}
                        alt="Photo DG"
                        className="h-full w-full object-contain p-1"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        Photo
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {director.name || "Directeur General"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {director.title || "Fonction"}
                    </p>
                  </div>
                </div>
              )}

              {directorEditing && (
                <form onSubmit={handleDirectorSubmit} className="mt-6 grid gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Nom complet
                    </label>
                    <input
                      name="name"
                      value={director.name}
                      onChange={handleDirectorChange}
                      className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Nom complet"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Titre / Fonction
                    </label>
                    <input
                      name="title"
                      value={director.title}
                      onChange={handleDirectorChange}
                      className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Titre / Fonction"
                      required
                    />
                  </div>
                  <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">
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
                    <p className="mt-2 text-xs text-muted-foreground">
                      Cliquez pour sélectionner la photo officielle.
                    </p>
                  </div>
                  {(directorPreview || director.photoUrl) && (
                    <div className="max-w-[260px] overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                      <img
                        src={directorPreview || director.photoUrl}
                        alt="Photo DG"
                        className="aspect-[3/4] w-full object-contain p-2"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Biographie
                    </label>
                    <textarea
                      name="bio"
                      value={director.bio}
                      onChange={handleDirectorChange}
                      className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                      rows={5}
                      placeholder="Biographie"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Message du DG
                    </label>
                    <textarea
                      name="message"
                      value={director.message}
                      onChange={handleDirectorChange}
                      className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                      rows={4}
                      placeholder="Message du DG"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={directorSaving}
                    className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
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
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">Fond Accueil</h2>
              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">
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
                    <div className="overflow-hidden rounded-xl border border-border bg-card">
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
                        className="w-full rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white"
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
                  className="w-full rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white"
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
        )}

        {activeSection === "settings" && (
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">Parametres</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Outils de session et acces administrateur.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>
                Etat de session: {sessionStatus === "ok" ? "Active" : "Expiree"}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={checkAdminSession}
                className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground"
              >
                Verifier la session
              </button>
              {sessionStatus === "expired" && (
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/admin/login";
                  }}
                  className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-700"
                >
                  Se reconnecter
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
