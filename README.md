# EKR Africa Agrovision Group

Site institutionnel (Next.js) basé sur le cahier des charges EKR.

## Démarrage

1. Installer les dépendances :

	```bash
	npm install
	```

2. Créer l’environnement local :

	```bash
	copy .env.example .env.local
	```

3. Lancer le serveur :

	```bash
	npm run dev
	```

Ouvrir http://localhost:3000

## Variables d’environnement

Renseigner les valeurs dans `.env.local` :

- `MONGODB_URI` et `MONGODB_DB` (MongoDB Atlas)
- `CLOUDINARY_*` (Cloudinary)
- `NEXT_PUBLIC_SITE_URL`

## Déploiement conseillé

- App Next.js sur Vercel
- Base MongoDB Atlas
- Médias sur Cloudinary
- Domaine chez Hostinger (DNS pointé vers Vercel)

## Pages principales

- Accueil
- Présentation · Services · Contact
- Articles & Galerie
- Administration (placeholder)
