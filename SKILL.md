# Showsee Skill

**Visual presentation layer for the agent — renders HTML views locally**

## What It Does

Showsee runs a local HTTP server that serves visual HTML presentations. When you want to see something visually — a diagram, board, animation, comparison — I build it as an HTML template and serve it here. You bookmark the URL and just refresh to see updates.

## Setup

```bash
# Install (handled by OpenClaw skills install)
# Start the server
openclaw skills run showsee

# Or manually
python3 ~/showsee/server.py
```

## Access

- **URL:** http://localhost:8765/showsee
- **Bookmark this** — it always shows the latest view I've built

## Templates

Templates are HTML files I generate dynamically. Available types:

| Template | Use When |
|----------|----------|
| `kanban` | Show a board with columns and cards |
| `engine` | Animated workflow/loop visualization |
| `flowchart` | Node-and-arrow diagrams |
| `timeline` | Horizontal time-based views |
| `comparison` | Side-by-side before/after |
| `state-diagram` | Box-and-arrow state machines |
| `architecture` | Component relationship diagrams |

## Usage

When you ask me to show something visually, I:
1. Pick the right template for the job
2. Generate the HTML with your content
3. Save it to the active view
4. You refresh http://localhost:8765/showsee

## Custom Templates

Add templates to `~/showsee/templates/` — they're just HTML files with CSS and JS. I can reference them by name.

## Port

Default: `8765` — change in `~/.showsee/config.json`

## GitHub

https://github.com/sidonsoft/showsee
