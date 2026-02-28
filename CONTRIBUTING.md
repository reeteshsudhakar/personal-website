# Contributing

## Commit Messages

This repository uses [Conventional Commits](https://www.conventionalcommits.org/), validated by `commitlint` in a Husky `commit-msg` hook.

Supported format:

- `type: subject`
- `type(scope): subject`

Examples:

- `fix: handle null payload in parser`
- `chore(tools): clean up shared hook usage`
- `refactor(tools/url): simplify query sync logic`

Common supported types include:

- `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`, `build`, `ci`, `perf`, `revert`

## Release Rules

Releases are automated with `semantic-release` on pushes to `master`.

- `feat` -> minor version bump
- `fix` and `perf` -> patch version bump
- `feat!` or `BREAKING CHANGE:` -> major version bump
- Other types are valid for commit clarity but usually do not trigger a release unless marked as breaking
- Releases are published as Git tags + GitHub Releases.

## CI and Merge Flow

- `CI` workflow (`.github/workflows/ci.yml`) runs on pull requests.
- `Release` workflow (`.github/workflows/release.yml`) runs on pushes to `master`, publishes semantic releases, and deploys production to Vercel when a new release is published.
- `Vercel Preview` workflow (`.github/workflows/vercel-preview.yml`) deploys PR previews and records GitHub deployment status.
  - It runs for non-draft PRs from this repository (not forks), because it requires repository secrets.
- `Vercel Production` workflow (`.github/workflows/vercel-production.yml`) is a manual fallback deploy by release tag (`workflow_dispatch`).
- Both Vercel workflows also create GitHub Deployment records so deployments appear in the repository Deployments tab.
- Vercel workflows set `NEXT_PUBLIC_APP_VERSION` from Git metadata (PR/SHA for previews, release tag for production), so `package.json` version is not the deployment source of truth.

Required repository secrets for Vercel workflows:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Push Guardrails

A Husky `pre-push` hook blocks direct pushes from the local `master` branch.
