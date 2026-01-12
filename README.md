# Rendu Info POC

Monorepo Turborepo contenant une app Expo et un backend Payload CMS.

## Structure

- `apps/app` - Application mobile/web Expo (React Native)
- `apps/payload` - Backend Payload CMS (Next.js + SQLite)
- `packages/types` - Types TypeScript et schemas Zod partagés

## Installation

```bash
pnpm install
```

## Lancer Payload CMS

1. Configurer l'environnement
   ```bash
   cd apps/payload
   cp .env.example .env
   ```

2. Lancer le serveur
   ```bash
   pnpm dev --filter=payload
   ```

3. Ouvrir http://localhost:3000 et créer le premier utilisateur admin

## Lancer l'App Expo

```bash
pnpm dev --filter=app
```

Options de lancement :
- `i` - iOS Simulator
- `a` - Android Emulator
- `w` - Web
- Scanner le QR code pour Expo Go

## Lancer les deux en parallèle

```bash
pnpm dev
```
