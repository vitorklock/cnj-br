# Contributing

Thanks for thinking about contributing to `cnj-br`. Bug reports, fixes, new features, docs improvements, and questions are all welcome - you don't need permission to open an issue or a PR. For larger changes (new features, breaking API changes), opening an issue first is a good idea so we can talk through the design before you spend time on the implementation.

## Dev setup

Requires Node 24+ and pnpm.

```bash
git clone https://github.com/<your-fork>/cnj-br
cd cnj-br
pnpm install
```

`pnpm install` also sets up the husky `pre-push` hook (via the `prepare` script). When you push to `main`, your tests run locally first. Pushes to other branches don't run tests, so feel free to use them as work-in-progress or backup branches.

## Running tests and lint

```bash
pnpm test           # run all tests once
pnpm test:watch     # watch mode while you work
pnpm test:coverage  # generate a coverage report
pnpm lint           # ESLint
pnpm build          # type-check and emit dist/
```

CI runs `pnpm test` and `pnpm lint` on every PR - both must pass before a PR can be merged.

## Making a change

Fork the repo, branch off `main`, and open a PR back to `main`. Keep PRs focused on one logical change - it makes review faster and revertible if something goes sideways. If your PR addresses an issue, write `Closes #123` in the description so it auto-closes on merge.

## Tests

New features should come with tests under `src/tests/unit/`. Bug fixes should come with a regression test that fails before your fix and passes after. Look at [src/tests/unit/cnj.spec.ts](./src/tests/unit/cnj.spec.ts) for the style - vitest globals, one `describe` per unit, `it('should …')` per case.

## Reporting bugs

Open an issue with:

- repro steps,
- what you expected,
- what actually happened,
- the `cnj-br` and Node versions you're on.

A failing test case in the repro is the fastest path to a fix.

## Suggesting a feature

Open an issue describing the use case before you build it. There might already be a way to do it, or we might want to design the API together - either way, a quick chat saves you time.

## Review process

This is a side project maintained by one person, so reviews can take a few days to a couple of weeks. If your PR has been sitting for more than two weeks without a reply, please ping me (vitorklock).

## Code of conduct

Be kind, be patient, assume good faith. We're all here to make something useful.

## License

By contributing you agree your work is licensed under MIT (see [LICENSE](./LICENSE)).
