import connectToDatabase from "@/lib/db";
import ProductModel from "@/models/Product";
import { ProductCardLink } from "@/components/products/ProductCardLink";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Produits",
  description:
    "Produits agricoles EKR Africa Agrovision Group: gingembre frais, gingembre séché, piment long frais et séché.",
};

const fallbackProducts = [
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

type ProductView = {
  id: string;
  productName: string;
  form: string;
  description: string;
  imageUrl: string;
};

export default async function ProductsPage() {
  let products: ProductView[] = [];

  try {
    await connectToDatabase();
    const records = await ProductModel.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    products = records.map((item) => ({
      id: item._id.toString(),
      productName: item.productName || "Produit",
      form: item.form || "Forme",
      description: item.description || "",
      imageUrl: item.imageUrl || "",
    }));
  } catch {
    products = [];
  }

  const resolvedProducts = products.length > 0 ? products : fallbackProducts;

  return (
    <div className="pt-16 md:pt-24 bg-background min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px] relative z-10">
          <div className="max-w-4xl space-y-6">
            <p className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Nos Produits
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] text-foreground">
              Gingembre et piment long, en version fraîche et séchée
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              EKR Africa Agrovision Group propose des produits rigoureusement sélectionnés, avec un suivi de qualité complet de la culture au conditionnement, pour répondre aux standards du marché local et international.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resolvedProducts.map((product) => (
            <ProductCardLink
              key={product.id}
              href={`/produits/${product.id}`}
              title={product.productName}
              form={product.form}
              description={product.description}
              imageUrl={product.imageUrl || "/agro2.jpg"}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
