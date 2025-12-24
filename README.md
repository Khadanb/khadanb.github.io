# Personal Webpage - khadanb.github.io

This repository hosts my personal webpage, built to showcase projects, publications, and professional experience.

- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.14)
- **Frontend**: HTML5, Vanilla CSS, JavaScript
- **Development**: Docker & Docker Compose
- **Linting**: [Ruff](https://beta.ruff.rs/docs/)
- **Deployment**: Intended for GitHub Pages

## Local Development

To run the site locally using Docker:

```bash
docker compose up --build
```

The application will be available at `http://localhost:8000`.

### Development with Watch Mode

To enable automatic syncing of file changes and automatic image rebuilding (when dependencies change), use the `watch` command:

```bash
docker compose watch
```

This is the recommended workflow for active development.
