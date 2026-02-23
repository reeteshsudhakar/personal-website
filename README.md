# [My Website](https://www.reeteshsudhakar.com)

This is my personal website! I built it using Next.js, Shadcn, and Tailwind CSS.

See [`CONTRIBUTING.md`](/Users/reeteshsudhakar/git/personal-website/CONTRIBUTING.md) for commit conventions, CI/release workflow, and push guardrails.

## CI/CD

This repo uses GitHub Actions + Vercel CLI for CI/CD:

- `CI` (`.github/workflows/ci.yml`): runs typecheck + lint on pull requests
- `Release` (`.github/workflows/release.yml`): runs on pushes to `master` and publishes semantic releases (`vX.Y.Z`) from Conventional Commits
- `Vercel Preview` (`.github/workflows/vercel-preview.yml`): deploys preview environments for PRs and posts/updates a preview URL comment
- `Vercel Production` (`.github/workflows/vercel-production.yml`): deploys production on GitHub release publish events

Required GitHub Actions secrets for Vercel workflows:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
