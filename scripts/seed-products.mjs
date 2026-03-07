import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";

function loadEnvLocalIfNeeded() {
  if (process.env.MONGODB_URI) return;

  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index <= 0) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvLocalIfNeeded();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI is missing. Add it to environment or .env.local");
}

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },
    form: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    cultivatedVarieties: { type: String, default: "" },
    packagingDetails: { type: String, default: "" },
    labelingDetails: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const ProductVarietySchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },
    form: { type: String, required: true, trim: true },
    varietyName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    shortDescription: { type: String, default: "" },
    detailedDescription: { type: String, default: "" },
    cultivatedZone: { type: String, default: "" },
    qualitySpecs: { type: String, default: "" },
    packagingDetails: { type: String, default: "" },
    labelingDetails: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ProductVariety =
  mongoose.models.ProductVariety ||
  mongoose.model("ProductVariety", ProductVarietySchema);

const seedProducts = [
  {
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
    isActive: true,
    order: 1,
  },
  {
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
    isActive: true,
    order: 2,
  },
  {
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
    isActive: true,
    order: 3,
  },
  {
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
    isActive: true,
    order: 4,
  },
];

const seedVarieties = [
  {
    productName: "Gingembre",
    form: "Frais",
    varietyName: "Gingembre local",
    slug: "gingembre-local",
    shortDescription:
      "Variété fraîche avec profil aromatique marqué et texture fibreuse adaptée au marché local.",
    detailedDescription:
      "Le gingembre local est sélectionné sur des parcelles suivies techniquement pour garantir régularité de calibre, fraîcheur et bonne tenue post-récolte.",
    cultivatedZone: "Bassins agricoles suivis au Cameroun (zone tropicale humide).",
    qualitySpecs:
      "Tri manuel, contrôle visuel des défauts, humidité maîtrisée et traçabilité par lot.",
    packagingDetails: "Caisses ventilées et sacs adaptés au transport régional et export.",
    labelingDetails: "Origine, lot, date de conditionnement et informations logistiques.",
    imageUrl:
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    isActive: true,
    order: 1,
  },
  {
    productName: "Gingembre",
    form: "Séché",
    varietyName: "Gingembre séchage export",
    slug: "gingembre-sechage-export",
    shortDescription:
      "Sélection dédiée au séchage, avec stabilité organoleptique et conservation longue durée.",
    detailedDescription:
      "Cette variété est orientée transformation et séchage pour maintenir une qualité homogène sur les lots destinés aux clients professionnels.",
    cultivatedZone: "Parcelles contractuelles avec protocole de récolte tardive.",
    qualitySpecs: "Contrôle du taux d’humidité, tri granulométrique et constance des lots.",
    packagingDetails: "Sachets multicouches et cartons renforcés.",
    labelingDetails: "Mentions réglementaires export, code lot et poids net.",
    imageUrl:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    isActive: true,
    order: 2,
  },
  {
    productName: "Piment long",
    form: "Frais",
    varietyName: "Piment long local",
    slug: "piment-long-local",
    shortDescription: "Variété fraîche, ferme et intense, adaptée au conditionnement B2B.",
    detailedDescription:
      "Le piment long local est récolté à maturité commerciale avec tri manuel pour garantir homogénéité visuelle et bonne tenue durant la chaîne logistique.",
    cultivatedZone: "Zones de culture tropicales avec suivi agronomique continu.",
    qualitySpecs:
      "Tri par calibre et couleur, contrôle sanitaire et traçabilité documentaire.",
    packagingDetails: "Barquettes, cagettes ou cartons selon le cahier des charges.",
    labelingDetails: "Origine, lot, date de récolte/conditionnement et catégorie.",
    imageUrl:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    isActive: true,
    order: 3,
  },
  {
    productName: "Piment long",
    form: "Séché",
    varietyName: "Piment long séchage",
    slug: "piment-long-sechage",
    shortDescription: "Variété orientée séchage pour préserver puissance et stabilité des lots.",
    detailedDescription:
      "Cette sélection de piment long supporte bien les process de séchage et permet un approvisionnement régulier des clients professionnels.",
    cultivatedZone: "Parcelles à faible pression hydrique en phase de maturation.",
    qualitySpecs:
      "Stabilité couleur, homogénéité du niveau de séchage et contrôle final par lot.",
    packagingDetails: "Sacs PE/PP et cartons adaptés au stockage prolongé.",
    labelingDetails: "Marquage produit, lot, poids et conformité commerciale.",
    imageUrl:
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    isActive: true,
    order: 4,
  },
];

async function run() {
  await mongoose.connect(mongoUri, { bufferCommands: false });

  for (const product of seedProducts) {
    await Product.findOneAndUpdate(
      { productName: product.productName, form: product.form },
      product,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  for (const variety of seedVarieties) {
    await ProductVariety.findOneAndUpdate(
      { slug: variety.slug },
      variety,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  const total = await Product.countDocuments({});
  const totalVarieties = await ProductVariety.countDocuments({});
  console.log(
    `Seed produits terminé. Total produits en base: ${total}. Total variétés: ${totalVarieties}`
  );
  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error("Erreur seed produits:", error?.message || error);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
