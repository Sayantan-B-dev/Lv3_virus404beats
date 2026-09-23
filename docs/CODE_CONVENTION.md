# CODE CONVENTION

## Purpose

Project-wide rules for humans and AI coding agents.

Optimize for:
security > correctness > data integrity > requirements > maintainability > performance.

## Core Rules

1. Prefer the simplest solution that fully satisfies the requirement.
2. No unnecessary abstractions, dependencies, services, queues, caches, or frameworks.
3. Keep responsibilities separated; modules cohesive; coupling low.
4. Keep business logic independent from infrastructure where practical.
5. Validate all external input. Never trust the client.
6. Never expose secrets, tokens, passwords, internal errors, or sensitive data.
7. Never silently swallow errors.
8. Never invent requirements, APIs, files, configuration, or test results.
9. Minimize change surface. Do not modify unrelated code.
10. Preserve existing architecture unless a real requirement justifies changing it.

## SOLID

**S — Single Responsibility**
One clear reason to change.

**O — Open/Closed**
Extend behavior without unnecessary modification of stable code.

**L — Liskov Substitution**
Implementations must honor contracts.

**I — Interface Segregation**
Prefer small, focused interfaces.

**D — Dependency Inversion**
Business logic should depend on contracts, not infrastructure details.

Use SOLID pragmatically.
Do not create interfaces/patterns only to satisfy SOLID.

## Code Quality

- Descriptive names.
- Focused, reasonably small functions.
- Explicit control flow > clever code.
- Avoid God objects, deep nesting, global mutable state, magic values.
- Avoid catch-all `utils` modules.
- DRY business/security logic.
- Do not create abstractions only to remove superficial duplication.
- Comments explain WHY, constraints, invariants, or non-obvious behavior.
- Document public APIs and important decisions.
- Prefer readable code over compressed code.

## Architecture

Preferred flow:

`Boundary/API -> Application/Use Case -> Domain/Business Logic -> Infrastructure`

Do not force this structure onto tiny/simple code.

Follow actual domain boundaries and existing framework conventions.

For this project:

`Next.js boundary -> server/application logic -> domain/content logic -> Turso/Cloudinary/external services`

Never put DB/provider secrets or privileged operations in client components.

## Next.js

- Server Components by default.
- Client Components only where browser APIs, client state, or interaction require them.
- Keep client islands small.
- Do not turn an entire page into a Client Component for one interactive feature.
- Server-side auth/authz.
- Server-side DB access.
- Server actions/route handlers only where appropriate.

## Database

- Parameterized queries only.
- Validate inputs before DB operations.
- Use constraints and indexes intentionally.
- Use transactions for atomic multi-step changes.
- Consider pagination for growing collections.
- Consider duplicate requests, race conditions, and idempotency where relevant.
- Do not optimize speculative query performance; measure first.
- Migrations must be explicit and reviewable.

## External Services

For Google OAuth, Resend, Cloudinary, Turso, and future providers:

- validate external responses
- use timeouts where supported
- use safe retries where appropriate
- consider backoff
- consider idempotency
- do not assume external services are always available
- do not leak raw provider errors to users

## Data & Concurrency

Consider:
- constraints
- indexes
- transactions
- migrations
- pagination
- race conditions
- duplicate requests
- stale state
- idempotency

Do not add concurrency complexity without a concrete requirement.

## Errors & Observability

Errors must be:

- meaningful internally
- safe externally
- actionable for debugging

Use structured logging where practical.

Use request/correlation IDs, metrics, tracing, and health checks where appropriate.

Never expose:
- stack traces
- SQL
- provider secrets
- internal filesystem paths
- auth internals
- sensitive payloads

Never claim a command, test, build, migration, deployment, or security check
was run unless it actually was.

## Testing

Test behavior, not implementation details.

Cover:
- happy paths
- validation failures
- authorization failures
- important edge cases
- dependency/provider failures
- security boundaries

Add regression tests for bugs.

Prefer focused unit/integration tests over excessive E2E tests.

## Security

See `SECURITY.md`.

Security-sensitive code must follow the project security baseline.

Minimum:
- server-side authorization
- parameterized DB access
- input validation
- secret protection
- safe external-service handling
- upload/path protection
- safe errors/logging
- least privilege
- defense in depth

Do not weaken security to make code easier.

## AI Workflow

Before non-trivial changes:

1. Inspect repository and relevant code.
2. Read relevant project docs.
3. Identify existing patterns/reusable code.
4. Identify affected boundaries and security concerns.
5. Make a short implementation plan.
6. Implement smallest clean change.
7. Add/update tests.
8. Run available validation.
9. Review security, complexity, and changed files.
10. Update docs when behavior/architecture changes.

AI must not:
- invent requirements
- invent existing functionality
- duplicate existing services/utilities unnecessarily
- rewrite unrelated code
- weaken security
- fabricate verification results

## Styling

Pure CSS only. This rule binds humans and AI agents alike.

- All CSS lives in `src/styles/*.css`, imported in order by
  `src/app/globals.css`. That file holds imports only, never declarations.
- TSX files must not contain `style` props, inline `<style>` blocks,
  CSS-in-JS, or hardcoded presentation values.
- Runtime values (audio levels, progress, rotation) use quantized state
  classes defined in CSS, for example `sb-0` to `sb-12` or `p-0` to `p-100`.
  JS may switch classes, never compute colors, sizes, or transforms.
- One documented exception: internals of vendored files inside
  `src/components/react-bits-component/`.
- New styles go in the matching split file. Breakpoints go only in
  `src/styles/responsive.css`. Tokens go only in `src/styles/variables.css`.

## Change Discipline

Before changing a shared abstraction:

- find all consumers
- understand current behavior
- check whether a local change is sufficient
- preserve backward compatibility where required

Prefer localized changes when possible.

## Definition of Done

- Requirement satisfied.
- Existing architecture respected.
- Security reviewed.
- Errors handled.
- Tests added/updated where appropriate.
- Documentation updated where needed.
- No unnecessary dependency.
- No unnecessary abstraction.
- No unrelated changes.
- Code understandable and debuggable.

## Final Question

> If I had to debug this at 3 AM six months from now, would I understand what
> is happening, why, and where to fix it?

If not, simplify or restructure it.