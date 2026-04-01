#!/usr/bin/env python3
"""
Showsee - Local HTML presentation server for OpenClaw agent
Serves: http://localhost:8765/showsee
"""

import http.server
import socketserver
import os
import json
from pathlib import Path
from urllib.parse import urlparse
import threading

DEFAULT_PORT = 8765
SHOWSEE_DIR = Path.home() / "showsee"
TEMPLATES_DIR = SHOWSEE_DIR / "templates"
VIEWS_DIR = SHOWSEE_DIR / "views"
CONFIG_FILE = Path.home() / ".showsee" / "config.json"

class ShowseeHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(VIEWS_DIR), **kwargs)
    
    def do_GET(self):
        parsed = urlparse(self.path)
        
        if parsed.path == "/" or parsed.path == "/showsee":
            self.path = "/showsee.html"
        
        return super().do_GET()
    
    def log_message(self, format, *args):
        # quieter logging
        pass

def load_config():
    CONFIG_FILE.parent.mkdir(parents=True, exist_ok=True)
    if CONFIG_FILE.exists():
        return json.loads(CONFIG_FILE.read_text())
    return {"port": DEFAULT_PORT}

def save_config(config):
    CONFIG_FILE.parent.mkdir(parents=True, exist_ok=True)
    CONFIG_FILE.write_text(json.dumps(config, indent=2))

def ensure_dirs():
    TEMPLATES_DIR.mkdir(parents=True, exist_ok=True)
    VIEWS_DIR.mkdir(parents=True, exist_ok=True)

def copy_assets():
    """Copy any shared assets to views dir"""
    assets_dir = VIEWS_DIR / "assets"
    assets_dir.mkdir(exist_ok=True)

def run_server(port=DEFAULT_PORT):
    ensure_dirs()
    copy_assets()
    
    # Create default showsee.html if it doesn't exist
    default_view = VIEWS_DIR / "showsee.html"
    if not default_view.exists():
        default_view.write_text("""<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Showsee</title>
<style>
  body { 
    background: #0d1117; 
    color: #c9d1d9; 
    font-family: -apple-system, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
  }
  .container { text-align: center; }
  h1 { color: #58a6ff; font-weight: 300; }
  p { color: #8b949e; }
</style>
</head>
<body>
  <div class="container">
    <h1>Showsee</h1>
    <p>Refresh to see the latest view</p>
  </div>
</body>
</html>""")
    
    config = load_config()
    port = config.get("port", DEFAULT_PORT)
    
    with socketserver.TCPServer(("", port), ShowseeHandler) as httpd:
        print(f"Showsee running at http://localhost:{port}/showsee")
        print(f"Views dir: {VIEWS_DIR}")
        httpd.serve_forever()

if __name__ == "__main__":
    import sys
    port = DEFAULT_PORT
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    run_server(port)
