# Malik Fajar — Portfolio

Personal developer portfolio for **Muhammad Malik Fajar El Syarif**.

Stack: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Motion, React Bits (ClickSpark + Magnet), Lucide.

Profile, projects, stack, and links live in `lib/site.ts`.

## Requirements

- Node.js 20.9 or later (this machine has a current Node 26 install)
- npm

## Development

From this folder:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run lint
npm run build
```

`npm run build` writes an optimized app to `.next`. To serve that build locally:

```bash
npm run start
```

That command is for a one-off check. Do not leave a public process running on the VPS unless you explicitly choose a port, process manager, and reverse-proxy setup.

## Deploy later

When you are ready to publish:

1. Point a process manager (for example systemd or PM2) at `npm run start` after `npm run build`, or put the app behind your existing reverse proxy.
2. Set the public URL in `lib/site.ts` (`siteUrl`) if it changes.
3. Do not commit secrets. This site does not need API keys.

This repo does not configure DNS, Nginx, or production restarts by itself.
