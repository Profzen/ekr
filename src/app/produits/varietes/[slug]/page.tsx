import connectToDatabase from "@/lib/db";
import ProductVarietyModel from "@/models/ProductVariety";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type VarietyView = {
  slug: string;
  productName: string;
  form: string;
  varietyName: string;
  shortDescription: string;
  detailedDescription: string;
  cultivatedZone: string;
  qualitySpecs: string;
  packagingDetails: string;
  labelingDetails: string;
  imageUrl: string;
};

const fallbackVarieties: VarietyView[] = [
  {
    slug: "gingembre-local",
    productName: "Gingembre",
    form: "Frais",
    varietyName: "Gingembre local",
    shortDescription: "Variété fraîche avec profil aromatique marqué et texture fibreuse adaptée au marché local.",
    detailedDescription:
      "Le gingembre local est sélectionné sur des parcelles suivies techniquement pour garantir régularité de calibre, fraîcheur et bonne tenue post-récolte.",
    cultivatedZone: "Bassins agricoles suivis au Cameroun (zone tropicale humide).",
    qualitySpecs: "Tri manuel, contrôle visuel des défauts, humidité maîtrisée, traçabilité par lot.",
    packagingDetails: "Caisses ventilées et sacs adaptés au transport régional et export.",
    labelingDetails: "Origine, lot, date de conditionnement et informations logistiques.",
    imageUrl:
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  },
  {
    slug: "gingembre-sechage-export",
    productName: "Gingembre",
    form: "Séché",
    varietyName: "Gingembre séchage export",
    shortDescription: "Sélection dédiée au séchage, avec stabilité organoleptique et conservation longue durée.",
    detailedDescription:
      "Cette variété est orientée transformation et séchage pour maintenir une qualité homogène sur les lots destinés aux clients professionnels.",
    cultivatedZone: "Parcelles contractuelles avec protocole de récolte tardive.",
    qualitySpecs: "Contrôle du taux d’humidité, tri granulométrique et constance des lots.",
    packagingDetails: "Sachets multicouches et cartons renforcés.",
    labelingDetails: "Mentions réglementaires export, code lot et poids net.",
    imageUrl:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  },
  {
    slug: "piment-long-local",
    productName: "Piment long",
    form: "Frais",
    varietyName: "Piment long local",
    shortDescription: "Variété fraîche, ferme et intense, adaptée au conditionnement B2B.",
    detailedDescription:
      "Le piment long local est récolté à maturité commerciale avec tri manuel pour garantir homogénéité visuelle et bonne tenue durant la chaîne logistique.",
    cultivatedZone: "Zones de culture tropicales avec suivi agronomique continu.",
    qualitySpecs: "Tri par calibre et couleur, contrôle sanitaire et traçabilité documentaire.",
    packagingDetails: "Barquettes, cagettes ou cartons selon le cahier des charges.",
    labelingDetails: "Origine, lot, date de récolte/conditionnement et catégorie.",
    imageUrl:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  },
  {
    slug: "piment-long-sechage",
    productName: "Piment long",
    form: "Séché",
    varietyName: "Piment long séchage",
    shortDescription: "Variété orientée séchage pour préserver puissance et stabilité des lots.",
    detailedDescription:
      "Cette sélection de piment long supporte bien les process de séchage et permet un approvisionnement régulier des clients professionnels.",
    cultivatedZone: "Parcelles à faible pression hydrique en phase de maturation.",
    qualitySpecs: "Stabilité couleur, homogénéité du niveau de séchage et contrôle final par lot.",
    packagingDetails: "Sacs PE/PP et cartons adaptés au stockage prolongé.",
    labelingDetails: "Marquage produit, lot, poids et conformité commerciale.",
    imageUrl:
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  },
];

export default async function ProductVarietyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let variety: VarietyView | null = null;

  try {
    await connectToDatabase();
    const record = await ProductVarietyModel.findOne({ slug, isActive: true }).lean();

    if (record) {
      variety = {
        slug: record.slug,
        productName: record.productName,
        form: record.form,
        varietyName: record.varietyName,
        shortDescription: record.shortDescription || "",
        detailedDescription: record.detailedDescription || "",
        cultivatedZone: record.cultivatedZone || "",
        qualitySpecs: record.qualitySpecs || "",
        packagingDetails: record.packagingDetails || "",
        labelingDetails: record.labelingDetails || "",
        imageUrl: record.imageUrl || "",
      };
    }
  } catch {
    variety = null;
  }

  if (!variety) {
    variety = fallbackVarieties.find((item) => item.slug === slug) || null;
  }

  if (!variety) {
    notFound();
  }

  return (
    <div className="pt-16 md:pt-24 bg-background min-h-screen">
      <section className="py-14 md:py-20 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px] space-y-5">
          <Link
            href="/produits"
            className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            ← Retour aux produits
          </Link>
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {variety.productName}
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {variety.form}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              {variety.varietyName}
            </h1>
            {variety.shortDescription && (
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {variety.shortDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px] grid gap-8 lg:grid-cols-[1fr,1.1fr]">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={variety.imageUrl || "/agro2.jpg"}
              alt={variety.varietyName}
              className="h-full min-h-[280px] w-full object-cover"
            />
          </div>

          <div className="space-y-4">
            {variety.detailedDescription && (
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Description détaillée</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{variety.detailedDescription}</p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Zone de culture</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {variety.cultivatedZone || "Non renseigné."}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Spécifications qualité</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {variety.qualitySpecs || "Non renseigné."}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Conditionnement</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {variety.packagingDetails || "Non renseigné."}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Étiquetage</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {variety.labelingDetails || "Non renseigné."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
