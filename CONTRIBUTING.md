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

## CI and Merge Flow

- `CI` workflow (`.github/workflows/ci.yml`) runs on pull requests.
- `Release` workflow (`.github/workflows/release.yml`) runs on pushes to `master`.

## Push Guardrails

A Husky `pre-push` hook blocks direct pushes from the local `master` branch.
