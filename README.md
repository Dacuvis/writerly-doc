# Writerly — Download landing page

Marketing / download site for [Writerly](https://github.com/Dacuvis/writerly), a calm desktop writing workspace for manuscripts and chapters.

## Stack

- [Bun](https://bun.sh/)
- React + TypeScript + Vite
- Tailwind CSS v4
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

## Installer

The Windows NSIS installer is served from `public/`:

```text
public/Writerly Setup 0.0.4.exe
```

Update the version constants in `src/App.tsx` when you ship a new build, and replace the file in `public/`.

## Commands

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `bun install`     | Install dependencies                  |
| `bun run dev`     | Start the development server          |
| `bun run build`   | Type-check and production build       |
| `bun run lint`    | Run Oxlint                            |
| `bun run preview` | Preview the production build locally  |

## Development

```bash
bun install
bun run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The download button serves the installer from `/Writerly%20Setup%200.0.4.exe`.

## Production

```bash
bun run build
bun run preview
```

Deploy the `dist/` folder to any static host. Keep the installer file under `public/` so it is copied into `dist/` on build.
