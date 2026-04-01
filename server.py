#!/usr/bin/env python3
"""
Showsee - Local HTML presentation server for OpenClaw agent
Serves views at: http://localhost:8765/showsee
View files at:   http://localhost:8765/views/<name>.html
"""

import http.server
import socketserver
import os
import json
import mimetypes
from pathlib import Path
from urllib.parse import urlparse, parse_qs
import threading
import webbrowser

DEFAULT_PORT = 8765
SHOWSEE_DIR = Path.home() / "showsee"
VIEWS_DIR = SHOWSEE_DIR / "views"
CONFIG_FILE = Path.home() / ".showsee" / "config.json"
INDEX_FILE = VIEWS_DIR / "showsee.html"

class ShowseeHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(VIEWS_DIR), **kwargs)
    
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        
        # Main app
        if path in ("/", "/showsee", "/index.html"):
            self.path = "/showsee.html"
            return super().do_GET()
        
        # Serve from views dir
        return super().do_GET()
    
    def log_message(self, format, *args):
        pass

def load_config():
    CONFIG_FILE.parent.mkdir(parents=True, exist_ok=True)
    if CONFIG_FILE.exists():
        return json.loads(CONFIG_FILE.read_text())
    return {"port": DEFAULT_PORT}

def ensure_dirs():
    VIEWS_DIR.mkdir(parents=True, exist_ok=True)
    # Ensure shell exists
    if not INDEX_FILE.exists():
        INDEX_FILE.write_text("""<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Showsee</title>
<style>
  body { background: #0d1117; color: #c9d1d9; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
  .container { text-align: center; }
  h1 { color: #58a6ff; }
  p { color: #8b949e; }
</style>
</head>
<body>
  <div class="container">
    <h1>Showsee</h1>
    <p>Open http://localhost:8765/showsee in your browser to use Showsee.</p>
  </div>
</body>
</html>""")

def run_server(port=DEFAULT_PORT, open_browser=False):
    ensure_dirs()
    
    config = load_config()
    port = config.get("port", DEFAULT_PORT)
    
    # Enable CORS for local iframe use
    class CORSRequestHandler(ShowseeHandler):
        def end_headers(self):
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Cache-Control', 'no-cache')
            super().end_headers()
        
        def do_OPTIONS(self):
            self.send_response(200)
            self.end_headers()
    
    with socketserver.TCPServer(("", port), CORSRequestHandler) as httpd:
        url = f"http://localhost:{port}/showsee"
        print(f"Showsee running at {url}")
        print(f"Views dir: {VIEWS_DIR}")
        print(f"Add new view: POST to {url}/save or use server.save_view(title, html)")
        if open_browser:
            webbrowser.open(url)
        httpd.serve_forever()

# Server-side view save (can be called by agent)
def save_view(title, html_content, filename=None):
    """Save a new view to the views directory."""
    if filename is None:
        # Slug from title
        slug = title.lower().replace(' ', '-').replace('/', '-')[:50]
        filename = f"view-{slug}.html"
    
    # Ensure unique
    filepath = VIEWS_DIR / filename
    counter = 1
    while filepath.exists():
        filepath = VIEWS_DIR / f"view-{slug}-{counter}.html"
        counter += 1
    
    filepath.write_text(html_content)
    return filepath.name

def list_views():
    """List all view files."""
    return sorted([f.name for f in VIEWS_DIR.glob("*.html") if f.name != "showsee.html"])

if __name__ == "__main__":
    import sys
    port = DEFAULT_PORT
    open_browser = False
    if "--open" in sys.argv:
        open_browser = True
        sys.argv.remove("--open")
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    run_server(port, open_browser)
