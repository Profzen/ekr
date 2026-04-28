import connectToDatabase from "@/lib/db";
import ProductModel from "@/models/Product";
import ProductVarietyModel from "@/models/ProductVariety";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await connectToDatabase();
    const record = await ProductModel.findById(id).lean();
    const productName = record?.productName || "Produit";
    const form = record?.form || "";
    const description = record?.description || "Produit agricole EKR Africa Agrovision Group.";

    return {
      title: form ? `${productName} ${form}` : productName,
      description,
      alternates: { canonical: `/produits/${id}` },
      openGraph: {
        title: form ? `${productName} ${form}` : productName,
        description,
        type: "article",
        images: [record?.imageUrl || "/agro2.jpg"],
      },
    };
  } catch {
    return {
      title: "Produit",
      description: "Produit agricole EKR Africa Agrovision Group.",
    };
  }
}

type ProductDetail = {
  id: string;
  productName: string;
  form: string;
  description: string;
  cultivatedVarieties: string;
  packagingDetails: string;
  labelingDetails: string;
  imageUrl: string;
};

type VarietyLink = {
  id: string;
  slug: string;
  varietyName: string;
};

const fallbackProducts: ProductDetail[] = [
  {
    id: "1",
    productName: "Gingembre",
    form: "Frais",
    description:
      "Gingembre frais soigneusement sélectionné, récolté à maturité optimale pour garantir arôme, texture et conservation.",
    cultivatedVarieties:
      "Variétés cultivées : gingembre local sélectionné pour sa teneur en fibres et son profil aromatique.",
    packagingDetails:
      "Conditionnement : caisses ventilées et sacs adaptés à l’export, calibrage selon les exigences clients.",
    labelingDetails:
      "Étiquetage : identification lot, origine, date de conditionnement et informations de traçabilité.",
    imageUrl:
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  },
  {
    id: "2",
    productName: "Gingembre",
    form: "Séché",
    description:
      "Gingembre séché avec contrôle strict du taux d’humidité pour une meilleure durée de conservation et une qualité constante.",
    cultivatedVarieties:
      "Variétés cultivées : lots dédiés au séchage, sélectionnés pour stabilité organoleptique et régularité.",
    packagingDetails:
      "Conditionnement : sachets et cartons multicouches selon les standards de transport longue distance.",
    labelingDetails:
      "Étiquetage : conformité export, mentions réglementaires, code lot et traçabilité documentaire.",
    imageUrl:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  },
  {
    id: "3",
    productName: "Piment long",
    form: "Frais",
    description:
      "Piment long frais trié manuellement pour préserver la qualité visuelle, la fermeté et l’intensité gustative.",
    cultivatedVarieties:
      "Variétés cultivées : piment long local à haut rendement, sélectionné pour sa résistance et son profil aromatique.",
    packagingDetails:
      "Conditionnement : barquettes, cagettes ou cartons selon cahier des charges clients B2B.",
    labelingDetails:
      "Étiquetage : origine, catégorie, date de récolte/conditionnement et marquage logistique.",
    imageUrl:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  },
  {
    id: "4",
    productName: "Piment long",
    form: "Séché",
    description:
      "Piment long séché avec un process maîtrisé pour conserver couleur, puissance et stabilité pendant le transport.",
    cultivatedVarieties:
      "Variétés cultivées : sélections orientées transformation et séchage pour assurer homogénéité des lots.",
    packagingDetails:
      "Conditionnement : sacs PE/PP et cartons renforcés, adaptés au stockage et à l’exportation.",
    labelingDetails:
      "Étiquetage : informations produit, lot, poids net et mentions de conformité commerciale.",
    imageUrl:
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  },
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: ProductDetail | null = null;
  let varietyLinks: VarietyLink[] = [];

  try {
    await connectToDatabase();

    const record = await ProductModel.findById(id).lean();
    if (record && record.isActive) {
      product = {
        id: record._id.toString(),
        productName: record.productName || "Produit",
        form: record.form || "Forme",
        description: record.description || "",
        cultivatedVarieties: record.cultivatedVarieties || "",
        packagingDetails: record.packagingDetails || "",
        labelingDetails: record.labelingDetails || "",
        imageUrl: record.imageUrl || "",
      };

      const varietyRecords = await ProductVarietyModel.find({
        isActive: true,
        productName: product.productName,
        form: product.form,
      })
        .sort({ order: 1, createdAt: -1 })
        .lean();

      varietyLinks = varietyRecords.map((item) => ({
        id: item._id.toString(),
        slug: item.slug,
        varietyName: item.varietyName,
      }));
    }
  } catch {
    product = null;
  }

  if (!product) {
    product = fallbackProducts.find((item) => item.id === id) || null;
  }

  if (!product) {
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
                {product.productName}
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {product.form}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              {product.productName} - {product.form}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-border/50 space-y-8">
            <div className="overflow-hidden rounded-xl border border-border/40 shadow-md max-w-3xl mx-auto">
              <img
                src={product.imageUrl || "/agro2.jpg"}
                alt={`${product.productName} ${product.form}`}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Description générale</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {product.description || "Non renseigné."}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Conditionnement</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {product.packagingDetails || "Non renseigné."}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Étiquetage</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {product.labelingDetails || "Non renseigné."}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5 sm:col-span-2">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Variétés cultivées</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {product.cultivatedVarieties || "Non renseigné."}
                  </p>

                  {varietyLinks.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {varietyLinks.map((variety) => (
                        <Link
                          key={variety.id}
                          href={`/produits/varietes/${variety.slug}`}
                          className="rounded-full border border-border bg-muted/20 px-3 py-1 text-xs font-semibold text-foreground hover:bg-muted"
                        >
                          {variety.varietyName}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
