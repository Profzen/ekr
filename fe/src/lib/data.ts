import { 
  Sprout, 
  Globe, 
  Users, 
  TrendingUp, 
  Leaf, 
  Ship, 
  Briefcase 
} from 'lucide-react';

export const siteContent = {
  hero: {
    title: "L'Excellence Agricole au Service du Développement",
    subtitle: "EKR Africa Agrovision Group : Une coopérative visionnaire dédiée à la valorisation des filières piment long et gingembre, de la production à l'exportation.",
    ctaPrimary: "Découvrir nos services",
    ctaSecondary: "Nous contacter",
    image: "https://images.unsplash.com/photo-1688240818501-2881b90f1b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  intro: {
    title: "Une Vision Durable pour l'Agriculture Africaine",
    text: "Nous croyons en une agriculture qui respecte la terre et valorise l'humain. EKR Africa Agrovision Group s'engage à structurer les filières agricoles, garantir la qualité de nos produits et accompagner les porteurs de projets innovants.",
    stats: [
      { id: 1, value: "150+", label: "Producteurs Partenaires" },
      { id: 2, value: "500T", label: "Volume Exporté Annuel" },
      { id: 3, value: "12", label: "Pays de Destination" },
      { id: 4, value: "95%", label: "Satisfaction Client" }
    ]
  },
  mission: {
    title: "Notre Mission",
    text: "Transformer le potentiel agricole africain en réussite économique durable par l'excellence opérationnelle et l'innovation sociale."
  },
  vision: {
    title: "Notre Vision",
    text: "Devenir la référence panafricaine dans l'exportation de produits agricoles premium et l'incubation de talents."
  },
  values: {
    title: "Nos Valeurs",
    list: ["Intégrité", "Excellence", "Responsabilité", "Innovation"]
  },
  ceo: {
    name: "Jean-Marc Kabore",
    title: "Directeur Général",
    bio: "Fort de 20 ans d'expérience dans l'agrobusiness international, Jean-Marc pilote la stratégie de croissance d'EKR avec une vision humaniste et rigoureuse.",
    quote: "L'agriculture est le socle de notre avenir. La valoriser, c'est construire l'Afrique de demain.",
    image: "https://images.unsplash.com/photo-1758519289200-384c7ef2d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
  },
  contact: {
    address: "Zone Industrielle, Abidjan, Côte d'Ivoire",
    email: "contact@ekrafrica.com",
    phone: "+225 07 00 00 00 00",
    mapUrl: "https://www.google.com/maps/embed?pb=..."
  }
};

export const services = [
  {
    id: 1,
    title: "Production & Collecte",
    description: "Encadrement technique des producteurs et collecte rigoureuse de piment long et gingembre pour garantir une qualité premium.",
    icon: Sprout,
    image: "https://images.unsplash.com/photo-1762245289207-cf35224bb727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 2,
    title: "Exportation Internationale",
    description: "Logistique maîtrisée et conformité aux normes internationales pour l'exportation vers l'Europe, l'Asie et l'Amérique.",
    icon: Ship,
    image: "https://images.unsplash.com/photo-1596434220574-9af8bf9a0891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 3,
    title: "Transformation Agroalimentaire",
    description: "Valorisation des matières premières par des processus de séchage et de transformation respectant les standards d'hygiène.",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1717769071502-e9b5d06c5fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 4,
    title: "Incubation de Projets",
    description: "Accompagnement, formation et financement de jeunes agri-preneurs pour développer l'écosystème local.",
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

export const articles = [
  {
    id: 1,
    title: "La demande mondiale de gingembre en hausse",
    date: "12 Octobre 2023",
    excerpt: "Analyse des tendances du marché et opportunités pour les producteurs africains dans la filière gingembre.",
    content: "Le marché mondial du gingembre connaît une croissance soutenue...",
    category: "Marché",
    image: "https://images.unsplash.com/photo-1717769071502-e9b5d06c5fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 2,
    title: "EKR lance son programme d'incubation 2024",
    date: "05 Novembre 2023",
    excerpt: "Un appel à candidature pour soutenir 50 nouveaux projets agricoles innovants en Côte d'Ivoire.",
    content: "Nous sommes fiers d'annoncer le lancement de...",
    category: "Institutionnel",
    image: "https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 3,
    title: "Les bienfaits du Piment Long",
    date: "20 Janvier 2024",
    excerpt: "Au-delà de son goût, le piment long possède des vertus médicinales reconnues.",
    content: "Le piment long est riche en capsaïcine...",
    category: "Produit",
    image: "https://images.unsplash.com/photo-1762245289207-cf35224bb727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

export const partners = [
  { id: 1, name: "AgriTech Solutions", logo: "ATS" },
  { id: 2, name: "Global Logistics", logo: "GL" },
  { id: 3, name: "BioCert International", logo: "BCI" },
  { id: 4, name: "Banque Agricole", logo: "BA" },
  { id: 5, name: "Coopérative Sud", logo: "CS" }
];

export const team = [
  {
    id: 1,
    name: "Sarah Kouassi",
    role: "Responsable Export",
    image: "https://images.unsplash.com/photo-1758519289200-384c7ef2d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
  },
  {
    id: 2,
    name: "Michel Yao",
    role: "Chef d'Exploitation",
    image: "https://images.unsplash.com/photo-1688240818501-2881b90f1b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 3,
    name: "Amina Diop",
    role: "Responsable Qualité",
    image: "https://images.unsplash.com/photo-1717769071502-e9b5d06c5fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];
