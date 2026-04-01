# Showsee

Visual presentation layer for the OpenClaw agent.

## What

Showsee runs a local HTTP server that serves HTML visualizations. When you want to see something visually — a diagram, board, animation — the agent generates an HTML template and serves it here. Bookmark http://localhost:8765/showsee and just refresh.

## Quick Start

```bash
# Run the server
python3 ~/showsee/server.py

# Bookmark: http://localhost:8765/showsee
```

## Templates

| Template | Use Case |
|----------|----------|
| `kanban` | Board with columns and cards |
| `engine` | Animated workflow/loop |
| `flowchart` | Node-and-arrow diagrams |
| `timeline` | Horizontal time-based views |
| `comparison` | Side-by-side before/after |
| `state-diagram` | Box-and-arrow state machines |
| `architecture` | Component relationship diagrams |

## Directory Structure

```
showsee/
├── SKILL.md           # OpenClaw skill manifest
├── server.py          # HTTP server
├── README.md
├── templates/          # Reusable template components
└── views/             # Generated views (served to browser)
    └── showsee.html   # The main view (refresh here)
```

## Configuration

Port is configurable via `~/.showsee/config.json`:

```json
{"port": 8765}
```

## Development

Templates are plain HTML/CSS/JS. No framework required.

## GitHub

https://github.com/sidonsoft/showsee
