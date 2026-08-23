# CODE CONVENTION

## Purpose
Project-wide rules for humans and AI coding agents. Optimize for secure, correct, readable, testable, debuggable, maintainable software without unnecessary complexity.

## Core Rules
1. Security > correctness > data integrity > requirements > maintainability > performance.
2. Prefer the simplest solution that fully satisfies the requirement.
3. Do not add abstractions, dependencies, services, queues, caches, or frameworks without a real need.
4. Separate responsibilities; keep modules cohesive and loosely coupled.
5. Make business logic independent from infrastructure where practical.
6. Validate all external input. Never trust the client.
7. Never expose secrets, tokens, passwords, internal errors, or sensitive data.
8. Never silently swallow errors.
9. Do not invent requirements, APIs, files, configuration, or test results.
10. Minimize the change surface; do not modify unrelated code.

## SOLID
- **S**ingle Responsibility: one clear reason to change.
- **O**pen/Closed: extend behavior without unnecessary modification of stable code.
- **L**iskov Substitution: implementations must honor their contracts.
- **I**nterface Segregation: prefer small, focused interfaces.
- **D**ependency Inversion: business logic should depend on contracts, not infrastructure details.

Use SOLID pragmatically. Do not create interfaces or patterns solely to satisfy a rule.

## Code Quality
- Use descriptive names.
- Keep functions focused and reasonably small.
- Prefer explicit control flow over clever code.
- Avoid God objects, deep nesting, global mutable state, magic values, and catch-all `utils` modules.
- DRY business/security logic, but do not create bad abstractions just to remove duplication.
- Comments explain **why**, constraints, invariants, or non-obvious behavior—not obvious syntax.
- Keep public APIs and important decisions documented.

## Architecture
Prefer clear flow:

`Boundary/API -> Application/Use Case -> Domain/Business Logic -> Infrastructure`

Do not force this structure onto tiny projects. Organize around the actual domain and existing framework conventions.

## Security
- Enforce authentication and authorization server-side.
- Use least privilege and defense in depth.
- Use parameterized database queries.
- Validate uploads, paths, webhooks, and external responses.
- Use secure secret management.
- Treat exposed secrets as compromised and rotate them.
- Do not log credentials, tokens, passwords, or sensitive payloads.
- Use timeouts for external calls.
- Consider retries, backoff, idempotency, and rate limits where relevant.

## Errors & Observability
Errors must be meaningful internally and safe externally.
Use structured logs, request/correlation IDs, metrics, tracing, and health checks where appropriate.
Never claim a command, test, build, migration, or security check was run unless it actually was.

## Data & Concurrency
Consider constraints, indexes, transactions, migrations, pagination, concurrency, race conditions, duplicate requests, and idempotency.
Do not optimize database queries or application performance speculatively; measure first.

## Testing
Test behavior, not implementation details.
Cover happy paths, validation failures, authorization failures, important edge cases, dependency failures, and security boundaries.
Add regression tests for bugs.
Prefer many focused unit/integration tests over excessive end-to-end tests.

## AI Workflow
Before non-trivial changes:
1. Inspect the repository and relevant code.
2. Identify existing patterns and reusable functionality.
3. Identify affected boundaries and security concerns.
4. Make a short implementation plan.
5. Implement the smallest clean change.
6. Add/update tests.
7. Run available validation.
8. Review security, complexity, and changed files.

AI must not:
- invent requirements or existing functionality;
- duplicate existing services/utilities;
- rewrite unrelated code;
- weaken security to make code work;
- fabricate verification results.

## Definition of Done
- Requirement satisfied.
- Existing architecture respected.
- Security reviewed.
- Errors handled.
- Tests added/updated where appropriate.
- Documentation updated where needed.
- No unnecessary dependencies or abstractions.
- No unrelated changes.
- Code is understandable and debuggable.

## Final Question
Before finalizing, ask:

> If I had to debug this at 3 AM six months from now, would I understand what is happening, why, and where to fix it?

If not, simplify or restructure it.
