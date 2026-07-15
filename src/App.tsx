import { useState, useEffect } from 'react'

const VERSION = '0.0.4'
const GITHUB_URL = 'https://github.com/Dacuvis/writerly'
const RELEASES_URL = `${GITHUB_URL}/releases`
const INSTALLER_NAME = `Writerly Setup ${VERSION}.exe`
const INSTALLER_HREF = `${GITHUB_URL}/releases/latest/download/Writerly%20Setup%20${VERSION}.exe`

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.26 1.23-.26 1.86v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

const features = [
  {
    title: 'Manuscripts & chapters',
    body: 'Create, rename, and organize manuscripts with a clear sidebar built for long-form work.',
    icon: 'manuscripts',
  },
  {
    title: 'Rich text editor',
    body: 'Headings, bold, italics, underline, lists, quotes, and full text alignment.',
    icon: 'editor',
  },
  {
    title: 'Autosave & goals',
    body: 'Chapter content and word counts save automatically. Set a goal and watch progress fill in.',
    icon: 'autosave',
  },
  {
    title: 'PDF export',
    body: 'Export a chapter as a polished PDF with alignment preserved from the editor.',
    icon: 'pdf',
  },
  {
    title: 'Local & private',
    body: 'Runs with a local Bun + SQLite API. Your drafts stay on your machine.',
    icon: 'private',
  },
  {
    title: 'Calm themes',
    body: 'Switch between Green, Pink, and Dark appearance themes. Your choice is remembered.',
    icon: 'themes',
  },
] as const

type FeatureIconName = (typeof features)[number]['icon']

function FeatureIcon({ name }: { name: FeatureIconName }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  switch (name) {
    case 'manuscripts':
      // Open book — manuscripts & chapters
      return (
        <svg {...common}>
          <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4H12v16H4.5A2.5 2.5 0 0 1 2 17.5v-11Z" />
          <path d="M22 6.5A2.5 2.5 0 0 0 19.5 4H12v16h7.5A2.5 2.5 0 0 0 22 17.5v-11Z" />
          <path d="M12 4v16" />
        </svg>
      )
    case 'editor':
      // Type / text tool — rich text editor
      return (
        <svg {...common}>
          <path d="M4 7V4h16v3" />
          <path d="M9 20h6" />
          <path d="M12 4v16" />
        </svg>
      )
    case 'autosave':
      // Save + progress arc — autosave & goals
      return (
        <svg {...common}>
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
          <path d="M17 21v-8H7v8" />
          <path d="M7 3v5h8" />
        </svg>
      )
    case 'pdf':
      // Document with download arrow — PDF export
      return (
        <svg {...common}>
          <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6" />
          <path d="M12 18v-6" />
          <path d="m9 15 3 3 3-3" />
        </svg>
      )
    case 'private':
      // Shield lock — local & private
      return (
        <svg {...common}>
          <path d="M12 3 4.5 6.5v5.2c0 4.6 3.1 8.8 7.5 9.8 4.4-1 7.5-5.2 7.5-9.8V6.5L12 3Z" />
          <rect x="9.5" y="11" width="5" height="4.5" rx="1" />
          <path d="M10.5 11V9.5a1.5 1.5 0 0 1 3 0V11" />
        </svg>
      )
    case 'themes':
      // Palette — calm themes
      return (
        <svg {...common}>
          <path d="M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a1.5 1.5 0 0 1 0-3h5.5A3.5 3.5 0 0 0 21 9.5 9 9 0 0 0 12 3Z" />
          <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="10" cy="7" r="1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
  }
}

const steps = [
  {
    n: '01',
    title: 'Download the installer',
    body: `Get ${INSTALLER_NAME} for Windows (about 130 MB).`,
  },
  {
    n: '02',
    title: 'Run the setup',
    body: 'Choose your install folder, desktop shortcut, and Start menu entry.',
  },
  {
    n: '03',
    title: 'Start writing',
    body: 'Open Writerly and create your first manuscript and chapter.',
  },
] as const

function BrandMark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`grid size-7 place-items-center rounded-[7px] bg-lime font-display text-[15px] font-bold text-forest ${className}`}
      aria-hidden
    >
      W
    </span>
  )
}

type Theme = 'green' | 'pink' | 'dark'

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('writerly-theme')
      if (saved === 'green' || saved === 'pink' || saved === 'dark') {
        return saved
      }
    }
    return 'green'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('writerly-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-line/80 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#" className="flex items-center gap-2.5 no-underline">
            <BrandMark />
            <span className="font-display text-[1.125rem] font-semibold text-ink">
              Writerly
            </span>
          </a>
          <nav className="flex items-center gap-2 sm:gap-4">
            <a
              href="#features"
              className="hidden text-[0.8125rem] font-medium tracking-[-0.01em] text-ink-muted no-underline transition hover:text-ink sm:inline"
            >
              Features
            </a>
            <a
              href="#install"
              className="hidden text-[0.8125rem] font-medium tracking-[-0.01em] text-ink-muted no-underline transition hover:text-ink sm:inline"
            >
              Install
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-[0.8125rem] font-medium tracking-[-0.01em] text-ink-muted no-underline transition hover:text-ink"
            >
              GitHub
            </a>

            {/* Theme Switcher Pill */}
            <div className="mr-1 flex items-center gap-1.5 rounded-full border border-line bg-paper-warm/85 p-1 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <button
                onClick={() => setTheme('green')}
                className={`size-5 rounded-full bg-[#c9d75e] transition-all duration-200 cursor-pointer ${
                  theme === 'green'
                    ? 'ring-2 ring-forest scale-110 shadow-sm'
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
                title="Green Theme"
                aria-label="Switch to Green Theme"
              />
              <button
                onClick={() => setTheme('pink')}
                className={`size-5 rounded-full bg-[#f09bb0] transition-all duration-200 cursor-pointer ${
                  theme === 'pink'
                    ? 'ring-2 ring-[#c5657c] scale-110 shadow-sm'
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
                title="Pink Theme"
                aria-label="Switch to Pink Theme"
              />
              <button
                onClick={() => setTheme('dark')}
                className={`size-5 rounded-full bg-[#202322] border border-white/10 transition-all duration-200 cursor-pointer ${
                  theme === 'dark'
                    ? 'ring-2 ring-[#b8c54c] scale-110 shadow-sm'
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
                title="Dark Theme"
                aria-label="Switch to Dark Theme"
              />
            </div>

            <a
              href={GITHUB_URL}
              className="inline-flex h-9 items-center rounded-md bg-lime px-3.5 text-[0.8125rem] font-semibold tracking-[-0.01em] text-forest no-underline transition hover:brightness-95"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            aria-hidden
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 50% -10%, var(--color-hero-glow), transparent 60%)',
            }}
          />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-28">
            <div>
              <p className="eyebrow mb-5">
                Desktop · v{VERSION} · Windows
              </p>
              <h1 className="display-xl text-ink">
                A calm place
                <br />
                <em className="font-display italic font-[550]">
                  for long-form writing.
                </em>
              </h1>
              <p className="lead mt-6 max-w-lg">
                Writerly is a focused writing workspace for manuscripts and
                chapters — rich text, autosave, chapter goals, and PDF export.
                Local-first. No cloud required.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={RELEASES_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-lg bg-lime px-6 text-[0.9375rem] font-semibold tracking-[-0.015em] text-forest no-underline shadow-[0_1px_2px_rgba(35,32,22,0.06),0_8px_24px_rgba(141,172,102,0.25)] transition hover:brightness-95"
                >
                  <GitHubIcon />
                  GitHub Release
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center rounded-lg border border-line bg-paper-warm px-5 text-[0.9375rem] font-medium tracking-[-0.015em] text-ink no-underline transition hover:border-lime-deep/40 hover:bg-white"
                >
                  View source
                </a>
              </div>
              <p className="mt-4 font-mono text-[0.6875rem] tracking-[0.04em] text-ink-soft">
                {INSTALLER_NAME} · NSIS installer · ~131 MB
              </p>
            </div>

            {/* App mock preview */}
            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-line bg-paper-warm shadow-[0_1px_2px_rgba(35,32,22,0.04),0_20px_50px_rgba(45,43,35,0.1)]">
                <div className="flex h-10 items-center gap-1.5 border-b border-line bg-[var(--color-mock-header)] px-3">
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="ml-3 font-mono text-[10px] text-ink-soft">
                    Writerly
                  </span>
                </div>
                <div className="flex min-h-[280px] sm:min-h-[320px]">
                  <aside className="hidden w-[148px] shrink-0 flex-col bg-sidebar p-3 text-[#e8e7e1] sm:flex">
                    <div className="mb-4 flex items-center gap-2 px-1">
                      <BrandMark className="size-5 text-[12px]" />
                      <span className="font-display text-[0.8125rem] font-semibold">
                        Writerly
                      </span>
                    </div>
                    <div className="mb-2 rounded-md bg-lime px-2.5 py-1.5 text-[0.6875rem] font-semibold tracking-[-0.01em] text-forest">
                      + New manuscript
                    </div>
                    <p className="mt-2 px-1 font-mono text-[0.5625rem] tracking-[0.14em] text-[var(--color-sidebar-text-muted)] uppercase">
                      Manuscripts
                    </p>
                    <div className="mt-1 rounded-md bg-[var(--color-sidebar-item)] px-2 py-1.5 text-[0.6875rem] tracking-[-0.01em]">
                      Summer Novel
                    </div>
                    <p className="mt-3 px-1 font-mono text-[0.5625rem] tracking-[0.14em] text-[var(--color-sidebar-text-muted)] uppercase">
                      Chapters
                    </p>
                    <div className="mt-1 space-y-0.5 text-[0.6875rem] tracking-[-0.01em] text-[var(--color-sidebar-text-muted)]">
                      <div className="rounded-md bg-[var(--color-sidebar-item)] px-2 py-1.5 text-white">
                        01 · Opening
                      </div>
                      <div className="px-2 py-1.5">02 · The letter</div>
                      <div className="px-2 py-1.5">03 · Night train</div>
                    </div>
                  </aside>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex h-11 items-center border-b border-line px-4 text-[0.6875rem] tracking-[-0.01em] text-ink-soft">
                      Summer Novel <span className="mx-2 text-ink-soft">/</span>{' '}
                      <span className="font-medium text-ink-muted">Opening</span>
                      <span className="ml-auto flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.04em]">
                        <span className="size-1.5 rounded-full bg-lime-deep" />
                        Saved
                      </span>
                    </div>
                    <div className="flex-1 bg-[var(--color-mock-bg)] p-5 sm:p-6">
                      <div className="mx-auto max-w-sm rounded-sm bg-paper-warm px-6 py-8 shadow-[0_1px_2px_rgba(35,32,22,0.03),0_8px_28px_rgba(45,43,35,0.045)] sm:px-8 sm:py-10">
                        <p className="eyebrow !text-[0.5625rem] !text-ink-soft">
                          Chapter 01
                        </p>
                        <h2 className="mt-2 font-display text-[1.5rem] font-semibold text-ink">
                          Opening
                        </h2>
                        <p className="prose-sample mt-5 text-[0.8125rem] text-ink-muted">
                          The station clock had stopped at half past three, but
                          the platforms still filled with the soft rush of
                          evening shoes and paper tickets.
                        </p>
                        <p className="prose-sample mt-3 text-[0.8125rem] text-ink-muted">
                          She wrote the first line, then waited for the next
                          one to arrive on its own.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="pointer-events-none absolute -right-6 -bottom-6 -z-10 size-40 rounded-full bg-lime/20 blur-3xl"
                aria-hidden
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-line bg-paper-warm">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <p className="eyebrow">Features</p>
            <h2 className="display-lg mt-3 text-ink">
              Everything you need to draft.
            </h2>
            <p className="lead mt-4 max-w-xl">
              Built for novelists and long-form writers who want structure
              without noise.
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <li
                  key={f.title}
                  className="rounded-xl border border-line bg-paper p-5 transition hover:border-lime/50 hover:shadow-[0_8px_24px_rgba(45,43,35,0.04)]"
                >
                  <div className="mb-3 grid size-9 place-items-center rounded-md bg-lime-soft text-forest">
                    <FeatureIcon name={f.icon} />
                  </div>
                  <h3 className="title-sm">{f.title}</h3>
                  <p className="body-sm mt-1.5">{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Install steps + download CTA */}
        <section id="install" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
              <div>
                <p className="eyebrow">Get started</p>
                <h2 className="display-lg mt-3 text-ink">
                  Install in three steps.
                </h2>
                <ol className="mt-8 space-y-6">
                  {steps.map((s) => (
                    <li key={s.n} className="flex gap-4">
                      <span className="font-mono text-[0.875rem] font-medium tracking-[0.04em] text-lime-deep">
                        {s.n}
                      </span>
                      <div>
                        <h3 className="title-sm">{s.title}</h3>
                        <p className="body-sm mt-1">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-line bg-sidebar p-7 text-[#e8e7e1] shadow-[0_20px_50px_rgba(32,35,34,0.18)] sm:p-8">
                <div className="flex items-center gap-3">
                  <BrandMark />
                  <div>
                    <p className="font-display text-[1.25rem] font-semibold">
                      Writerly
                    </p>
                    <p className="font-mono text-[0.6875rem] tracking-[0.04em] text-[#8b918b]">
                      v{VERSION} · Windows x64
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-[0.9375rem] leading-[1.7] tracking-[-0.01em] text-[#c5c8c2]">
                  Official NSIS installer with desktop and Start menu shortcuts.
                  Includes the local writing app and bundled API.
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 font-mono text-[0.6875rem] tracking-[0.02em]">
                  <div>
                    <dt className="text-[#8b918b]">File</dt>
                    <dd className="mt-0.5 text-[#e8e7e1]">{INSTALLER_NAME}</dd>
                  </div>
                  <div>
                    <dt className="text-[#8b918b]">Size</dt>
                    <dd className="mt-0.5 text-[#e8e7e1]">~131 MB</dd>
                  </div>
                  <div>
                    <dt className="text-[#8b918b]">License</dt>
                    <dd className="mt-0.5 text-[#e8e7e1]">MIT</dd>
                  </div>
                  <div>
                    <dt className="text-[#8b918b]">Source</dt>
                    <dd className="mt-0.5">
                      <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lime no-underline hover:underline"
                      >
                        GitHub
                      </a>
                    </dd>
                  </div>
                </dl>
                <a
                  href={RELEASES_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-lime text-[0.9375rem] font-semibold tracking-[-0.015em] text-forest no-underline transition hover:brightness-95"
                >
                  <GitHubIcon />
                  GitHub Release
                </a>
                <p className="mt-3 text-center font-mono text-[0.625rem] leading-relaxed tracking-[0.03em] text-[#8b918b]">
                  Windows SmartScreen may warn on first run — choose “More info”
                  → “Run anyway” if needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Changelog blurb */}
        <section className="border-t border-line bg-paper-warm">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <p className="eyebrow">What’s new in v{VERSION}</p>
            <h2 className="display-md mt-3 text-ink">Appearance themes</h2>
            <ul className="mt-5 max-w-2xl space-y-2.5">
              <li className="body-sm flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lime" />
                Appearance menu with Green, Pink, and Dark themes — preference
                remembered in local storage
              </li>
              <li className="body-sm flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lime" />
                Themed sidebar, editor chrome, dialogs, and controls
              </li>
              <li className="body-sm flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lime" />
                Sticky section labels and selection colors match the active theme
              </li>
            </ul>
            <a
              href={`${GITHUB_URL}#changelog`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block text-[0.8125rem] font-semibold tracking-[-0.01em] text-lime-deep no-underline hover:underline"
            >
              Full changelog on GitHub →
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-2.5">
            <BrandMark className="size-6 text-[13px]" />
            <span className="font-display text-[0.9375rem] font-semibold">
              Writerly
            </span>
            <span className="text-[0.75rem] tracking-[-0.01em] text-ink-soft">
              · a simple novel text editor
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[0.75rem] tracking-[-0.01em] text-ink-soft">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-ink-muted no-underline transition hover:text-ink"
            >
              GitHub
            </a>
            <a
              href={`${GITHUB_URL}/blob/main/LICENSE`}
              target="_blank"
              rel="noreferrer"
              className="text-ink-muted no-underline transition hover:text-ink"
            >
              MIT License
            </a>
            <a
              href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`}
              target="_blank"
              rel="noreferrer"
              className="text-ink-muted no-underline transition hover:text-ink"
            >
              Contributing
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  )
}

export default App
