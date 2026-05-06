# Publishing

For maintainers cutting releases. If you're contributing code, see [CONTRIBUTING.md](../CONTRIBUTING.md) instead.

This guide covers versioning and publishing `cnj-br` to public npm.

## Release model

- Versions are bumped with `pnpm version`, which writes the new version to [package.json](../package.json), commits, and creates a `vX.Y.Z` git tag.
- Pushing a `v*` tag triggers automation in [release.yml](../.github/workflows/release.yml), which publishes to https://registry.npmjs.org with provenance.

## Safety nets

Tests are verified three times before any artifact reaches npm:

1. **Husky `pre-push` hook** runs `pnpm test` locally when pushing to `main`.
2. **CI workflow** runs `pnpm test` and `pnpm lint` on every PR to `main`. Branch protection requires the `test` check to pass before a PR can be merged.
3. **Release workflow** re-runs `pnpm test`, verifies the tag points to a commit on `main`, verifies the tag version matches `package.json`, then publishes with provenance.

If any step fails, no broken artifact reaches npm.

## Cut a release

From the project root, with a clean working tree on `main`:

```bash
pnpm version patch    # or: minor / major / 0.2.0 / 1.0.0-rc.0
git push --follow-tags
```

`pnpm version` does three things in one step: edits `package.json`, commits the bump, and creates the matching tag. `--follow-tags` pushes both the commit and the tag.

The release workflow takes over from there.

## Required secret

`NPM_TOKEN` — npm granular access token with:

- **Allow this token to bypass two-factor authentication** ✅ (required; npm rejects publishes from 2FA-protected accounts otherwise).
- Permission: read and write on `cnj-br`.

Set it with:

```bash
gh secret set NPM_TOKEN -R vitorklock/cnj-br
```

## Troubleshooting

- **"Tag does not point to a commit on main"** — you tagged from a feature branch. Delete the tag (`git tag -d vX.Y.Z && git push origin :refs/tags/vX.Y.Z`), switch to `main`, re-tag.
- **"Tag version does not match package.json"** — you ran `git tag` manually instead of `pnpm version`. Let `pnpm version` create the tag so the two stay in sync.
- **npm 403 / 2FA error during publish** — the `NPM_TOKEN` is missing the bypass-2FA flag. Regenerate the token with that option enabled and update the secret.
