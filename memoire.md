# Memoire projet - EKR

## 1) Contexte global
- Projet: site institutionnel de EKR Africa Agrovision Group.
- Objectif: presenter l entreprise, ses services, activites, produits, partenaires, equipe, actualites, galerie media.
- Stack principale: Next.js App Router + React + TypeScript + Tailwind.
- Le projet tourne en mode dynamique (beaucoup de pages avec `export const dynamic = "force-dynamic"`).

## 2) Stack technique
- Framework: Next.js 16.1.6
- UI: React 19, Tailwind CSS 4, lucide-react
- Carousels: react-slick + slick-carousel
- DB: MongoDB Atlas via Mongoose
- Media: Cloudinary
- Auth admin: cookie httpOnly base64 token + middleware `/admin/*`
- Build/lint: `npm run build`, `npm run lint`

## 3) Arborescence utile
- `src/app/`: pages publiques, admin, routes API
- `src/components/`: composants UI (home, presentation, articles, products)
- `src/models/`: schemas Mongoose
- `src/lib/`: db, auth admin, cloudinary
- `public/`: assets statiques
- `fe/`: ancien front Vite (legacy/reference). Le site actif est celui de `src/app/`.

## 4) Base de donnees (Mongo/Mongoose)
Modeles principaux:
- `Article`
- `Service`
- `Activity`
- `Partner`
- `TeamMember`
- `DirectorProfile`
- `GalleryItem`
- `SiteContent`
- `Product`
- `ProductVariety`

Connexion DB:
- `src/lib/db.ts`
- Cache global mongoose pour eviter multi-connections en dev/hot-reload.

## 5) Variables d environnement
Dans `.env.local`:
- `MONGODB_URI`
- `MONGODB_DB`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `ADMIN_TOKEN_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- (optionnelles) `NEXT_PUBLIC_SITE_ADDRESS`, `NEXT_PUBLIC_SITE_PHONE`, `NEXT_PUBLIC_SITE_EMAIL`

## 6) Auth admin
- Middleware protege `/admin/*` (sauf `/admin/login`) via cookie `ekr_admin`.
- Session max age: 2h.
- Verification token sur `ADMIN_TOKEN_SECRET`.
- Helpers: `src/lib/adminAuth.ts`, `middleware.ts`.

## 7) API routes importantes
- CRUD contenus: `/api/articles`, `/api/services`, `/api/activities`, `/api/partners`, `/api/team`, `/api/gallery`, `/api/products`, `/api/product-varieties`, `/api/content`, `/api/director`
- Upload media: `/api/upload` (Cloudinary `resource_type: auto`)
- Admin auth: `/api/admin/login`, `/api/admin/check`, `/api/admin/logout`

## 8) Organisation public/admin
### Public
- Home: `src/app/page.tsx`
- Presentation: `src/app/presentation/page.tsx`
- Produits: `src/app/produits/*`
- Articles liste: `src/app/articles/page.tsx`
- Article detail: `src/app/articles/[slug]/page.tsx`
- Articles + galerie: `src/app/articles-galerie/page.tsx`

### Admin
- UI monolithique: `src/app/admin/AdminClient.tsx`
- Sections: articles, services, activities, partners, team, gallery, content, profile, products/varieties.

## 9) Mapping admin -> public (important)
- Activites admin -> section Activites de la Home (`<Activities />` dans `src/app/page.tsx`).
- Services admin -> Home + page Presentation (carrousels/services cards).
- Articles admin -> page Articles + Home (preview) + detail article.
- Gallery admin -> page Articles (section Galerie Media) + page Articles-Galerie.
- Team admin -> carrousel equipe (home/presentation selon page).
- Director profile admin -> section DG de la Home.
- Partner admin -> carrousel partenaires Home.
- Content admin -> textes institutionnels, hero, contact, etc.
- Home hero background admin -> hero Home.
- Article reading banner admin -> hero de la page detail article.

## 10) Decisions recentes importantes
- Galerie publique maintenant alimentee par la DB (avant: liste statique locale).
- Miniatures ajoutees dans la liste galerie admin pour visualiser les medias deja postes.
- Carrousel partenaires: correction pour defiler meme avec peu d items (duplication quand necessaire).
- Multiple textes "cooperative" remplaces par "entreprise".
- Hero detail article remanie en layout gauche/droite pour eviter superposition agressive du titre.
- Consignes de format ajoutees dans les uploaders admin (16:9 ou 1:1 selon section).

## 11) Conventions media recommandes (etat actuel)
- 16:9: banniere article, cover article, services, produits, varietes, galerie image, fond accueil, logos partenaires (affiches en contain).
- 1:1: photo equipe, photo DG.
- Galerie: harmonisation orientee 16:9 demandee; attention `object-cover` peut rogner les images 4:3.

## 12) Flux upload media
1. Admin choisit un fichier (image/video selon section).
2. Front appelle `/api/upload`.
3. URL Cloudinary enregistree dans le document Mongo correspondant.
4. Les pages publiques lisent Mongo et affichent le media.

## 13) Commandes de travail
- Dev: `npm run dev`
- Build prod: `npm run build`
- Start prod local: `npm run start`
- Lint: `npm run lint`
- Seed produits: `npm run seed:products`

## 14) Deployment
- Hebergement: Vercel
- DB: MongoDB Atlas
- Media: Cloudinary
- Domaine: DNS vers Vercel

## 15) Points de vigilance
- Des fallbacks statiques existent dans plusieurs pages. Toujours verifier si la page lit bien la DB en priorite.
- Si un contenu admin n apparait pas, verifier: statut actif/published, route API, mapping dans la page publique.
- Pour les medias galerie: videos detectees via URL Cloudinary video ou extension.
- Index git peut parfois se corrompre localement (`fatal: index file corrupt`):
  - supprimer `.git/index`
  - `git reset`
  - recommiter

## 16) Facon de travailler sur ce repo
- Faire des changements cibles, eviter le refactor massif de `AdminClient.tsx` sans besoin.
- Verifier toujours les effets public + admin apres modif d une section.
- Prioriser coherence UX mobile + desktop.
- Quand on modifie des cartes/media, verifier ratio reel et classe CSS (`object-cover` vs `object-contain`).
- Avant push: verifier `git status`, puis build si possible.

## 17) Resume rapide pour reprise immediate
- Projet Next.js dynamique, Mongo + Cloudinary.
- Centre de controle: `src/app/admin/AdminClient.tsx`.
- Les pages publiques lisent DB et utilisent parfois fallbacks.
- Les parties les plus sensibles: galerie media, hero article detail, carrousels partenaires/equipe/services.
- Si objectif = corriger affichage: commencer par ratio + classes CSS des images + source de donnees (DB vs fallback).
