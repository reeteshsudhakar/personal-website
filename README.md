# [My Website](https://www.reeteshsudhakar.com)

This is my personal website! I built it using Next.js, Shadcn, and Tailwind CSS.

See [`CONTRIBUTING.md`](/Users/reeteshsudhakar/git/personal-website/CONTRIBUTING.md) for commit conventions, CI/release workflow, and push guardrails.

## CI/CD

This repo uses GitHub Actions + Vercel CLI for CI/CD:

- `CI` (`.github/workflows/ci.yml`): runs typecheck + lint on pull requests
- `Release` (`.github/workflows/release.yml`): runs on pushes to `master`, publishes semantic releases (`vX.Y.Z`) from Conventional Commits, and deploys production to Vercel when a new release is published
- `Vercel Preview` (`.github/workflows/vercel-preview.yml`): deploys preview environments for PRs and posts/updates a preview URL comment
- `Vercel Production` (`.github/workflows/vercel-production.yml`): manual fallback production deploy by release tag (`workflow_dispatch`)
- App version is injected at build time via `NEXT_PUBLIC_APP_VERSION` from Git metadata (PR/SHA for previews, release tag for production), not from `package.json`

Required GitHub Actions secrets for Vercel workflows:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
