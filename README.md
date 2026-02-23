# [My Website](https://www.reeteshsudhakar.com)

This is my personal website! I built it using Next.js, Shadcn, and Tailwind CSS.

See [`CONTRIBUTING.md`](/Users/reeteshsudhakar/git/personal-website/CONTRIBUTING.md) for commit conventions and release rules.

## Commit Convention

This repository uses [Conventional Commits](https://www.conventionalcommits.org/):

- `fix:` -> patch release
- `feat:` -> minor release
- `feat!:` or `BREAKING CHANGE:` -> major release

Commit messages are validated locally via a Husky `commit-msg` hook and `commitlint`.

## Release Automation

Releases are automated with `semantic-release` on pushes to `master`.

- Tags are created as `vX.Y.Z`
- GitHub Releases are generated automatically
- `CHANGELOG.md` is updated automatically
- `package.json` and `package-lock.json` versions are updated automatically

Workflows:

- `.github/workflows/ci.yml`: typecheck + lint
- `.github/workflows/release.yml`: semantic release pipeline
