# SECURITY BASELINE

- Never commit secrets.
- Validate every external input.
- Enforce authorization on every protected operation.
- Use parameterized database access.
- Do not expose stack traces or internal details to users.
- Do not log secrets or sensitive data.
- Use secure defaults and least privilege.
- Protect file uploads and paths against traversal and malicious content.
- Use timeouts and safe retry behavior for external services.
- Treat webhooks and external responses as untrusted.
- Rotate any accidentally exposed credential immediately.
- Report security-sensitive changes and assumptions clearly.
