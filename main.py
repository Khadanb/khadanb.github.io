"""main.py -- main entry point for the FastAPI application."""

from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/assets", StaticFiles(directory="assets"), name="assets")


@app.get("/{path:path}/", response_class=HTMLResponse, response_model=None)
async def serve_subdirectory(path: str) -> str | HTMLResponse:
    """Serve a subdirectory with an index.html file."""
    index_path = Path(path) / "index.html"
    if index_path.exists():
        return index_path.read_text()
    return HTMLResponse(content="Page not found", status_code=404)


@app.get("/", response_class=HTMLResponse)
async def read_root() -> str:
    """Read the root page."""
    return Path("index.html").read_text()


@app.get("/projects", response_class=HTMLResponse, response_model=None)
async def read_projects() -> str | HTMLResponse:
    """Read the projects page."""
    return await serve_subdirectory("projects")


@app.get("/publications", response_class=HTMLResponse, response_model=None)
async def read_publications() -> str | HTMLResponse:
    """Read the publications page."""
    return await serve_subdirectory("publications")


@app.get("/resume", response_class=HTMLResponse, response_model=None)
async def read_resume() -> str | HTMLResponse:
    """Read the resume page."""
    return await serve_subdirectory("resume")


@app.get("/contact", response_class=HTMLResponse, response_model=None)
async def read_contact() -> str | HTMLResponse:
    """Read the contact page."""
    return await serve_subdirectory("contact")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
