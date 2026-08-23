# ARCHITECTURE

## Default Direction

```text
Boundary / API
      |
Application / Use Case
      |
Domain / Business Logic
      |
Infrastructure
      |
Database / External Services
```

Keep dependency direction toward stable business rules where practical.

## Rules

- Organize around domain/features when the project becomes large.
- Keep infrastructure replaceable where that provides real value.
- Keep business rules out of controllers/UI when practical.
- Prefer composition over inheritance.
- Use dependency injection when it improves testability or decoupling.
- Prefer a modular monolith until scale or team boundaries justify distribution.
- Document major architectural decisions in `docs/adr/`.
