# Publishing

This guide covers versioning and publishing `cnj-br` to public npm.

## Release model

- Versions are bumped with `pnpm version`, which writes the new version to [package.json](../package.json), commits, and creates a `vX.Y.Z` git tag.
- Pushing a `v*` tag triggers automation in [release.yml](../.github/workflows/release.yml), which publishes to https://registry.npmjs.org with provenance.

## Cut a release

From the project root, with a clean working tree on the default branch:

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
