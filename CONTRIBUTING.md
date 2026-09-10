# Contributing

Thank you for taking the time to contribute to this project.

## Before you start

- Check existing issues and pull requests before opening a new one.
- For security vulnerabilities, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.
- For larger changes, open an issue first so the approach can be discussed.

## Local setup

Requirements:

- Node.js 22 or newer
- npm
- MongoDB 8, locally or through Docker

Install dependencies and create a local environment file:

```bash
npm install
touch .env
```

Configure the required values for MongoDB, JWT, and optional integrations in `.env`.
Never commit this file or share its secrets.

Start MongoDB with Docker:

```bash
docker compose -f docker-compose-mongo.yml up -d
```

Start the API in development mode:

```bash
npm run start:dev
```

## Making changes

1. Create a focused branch from `main`.
2. Keep changes small and related to one problem.
3. Follow the existing NestJS, TypeScript, and formatting conventions.
4. Add or update tests for behavior you change.
5. Do not commit secrets, local databases, uploads, build output, or coverage files.

## Checks before opening a pull request

Run the checks relevant to your change:

```bash
npm run build
npm test
npm run test:e2e
npm run lint
```

The lint script may apply automatic fixes. Review the resulting diff before committing.

## Pull requests

- Use a clear title that describes the change.
- Explain the problem, the solution, and any configuration or migration impact.
- Link related issues.
- Include test evidence and mention known limitations.
- Keep the pull request focused and respond to review feedback.

By submitting a contribution, you agree that it may be distributed under the
project's [MIT License](LICENSE).
