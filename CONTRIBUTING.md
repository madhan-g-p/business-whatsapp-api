🤝 **Contributing**
--------------------

Thank you for considering contributing to business-whatsapp-api! We appreciate your time and effort in helping improve this project. This guide will walk you through the steps and standards to follow for contributing.

## Prerequisites
- [Node](https://nodejs.org/en) Version 20 or higher
- A [GitHub account](https://github.com)
- Familiarity with [git](https://git-scm.com/) for version control

## Getting Started

  **Fork** the repository and **clone** your fork locally:

```bash
git clone https://github.com/<your-username>/business-whatsapp-api.git
cd business-whatsapp-api
```

Now you are ready to start contributing!

## Code Standards

- Follow the Conventional ESM style guide.
- Include proper Js Doc commenting for all function parameters and return types.

## Making Changes

1. Create a new branch for your changes

   ```bash
   git checkout -b my-new-feature
   ```
> Use descriptive names like `feature-add-new-apis` or `bugfix-handler-issue.`

2. Commit your changes:

   ```bash
   git add .
   git commit -m "[module-name] a brief line describing what you did in this commit"
   ```

3. Push your changes to your fork and submit a pull request:
   ```bash
   git push origin your-new-feature
   ```

## Communication

If you have questions, feel free to reach out via the issue tracker or other communication channels listed in the repository.


## License

By contributing to ```business-whatsapp-api```, you agree that your contributions will be licensed under the MIT License. See the [LICENSE](https://github.com/madhan-g-p/business-whatsapp-api/blob/master/LICENSE) file for details.

## Project Structure

```bash
business-whatsapp-api/
├── src/
│   ├── index.ts              # Aggregated export surface
│   ├── client/               # WhatsApp client, API, webhooks, authentication
│   ├── handlers/             # Long-lived event handlers and decorators
│   ├── listeners/            # Short-lived contextual listeners, decorators, helpers
│   ├── filters/              # Filter types, builders, validation logic
│   ├── messages/             # Message builders, media helpers, validation
│   ├── templates/            # Template builders, status management, validation
│   ├── flows/                # Flow builders, request/completion logic, validation
│   ├── utils/                # Utility functions, transforms, validation, versioning
│   └── types/                # Core type definitions

```

