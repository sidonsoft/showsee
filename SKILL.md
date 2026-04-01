# Showsee Skill

Present information visually using bookmarkable HTML views.

## Workflow

### Step 1: Determine Intent
What does the user want to see?
- Explanation of a concept?
- History/timeline of something?
- Comparison of options?
- How something works?
- Current state/status?

### Step 2: Pick View Layout
Choose the layout that fits the content:

| Layout | Use When |
|--------|----------|
| **Single** | One flowchart, one diagram, one piece of info |
| **Split (2-col)** | Explanation + diagram, intro + details |
| **Timeline** | History, evolution, chronological events |
| **Comparison** | X vs Y vs Z, pros/cons, side-by-side |
| **Multi-view** | Combine 2+ layouts for richer information |

### Step 3: Get Fresh Information
**Never use training knowledge.** Always fetch fresh data:
- Web search for current info
- Web fetch for specific pages
- Local files if relevant

### Step 4: Markdown First
Write the content in markdown first, then format.

### Step 5: Apply Template
Use the templates in `/Users/burnz/showsee/views/`:

| Template | File | Best For |
|----------|------|----------|
| Timeline | `view-timeline.html` | History, evolution, releases |
| Comparison | `view-comparison.html` | X vs Y, specs, pros/cons |
| Multi | Create custom | Rich views combining layouts |

## Examples

**User asks: "Tell me about LLaMA"**
1. Intent: Overview + comparison
2. Layout: Multi-view (split + timeline + table)
3. Fresh info: Search for LLaMA 4 specs
4. Content: Markdown overview
5. Template: Custom multi-view

**User asks: "History of iPhones"**
1. Intent: Timeline
2. Layout: Timeline view
3. Fresh info: Search iPhone releases
4. Content: Markdown events
5. Template: Timeline

**User asks: "Compare GPT vs Claude"**
1. Intent: Comparison
2. Layout: 3-column comparison
3. Fresh info: Current model specs
4. Content: Markdown comparison
5. Template: Comparison

## Output

Create a new `.html` file in `/Users/burnz/showsee/views/` named:
`view-{topic}-{type}.html`

Example: `view-llama-multi.html`

Then update `showsee.html` to set it as the default:
```javascript
currentViewId = 'view-llama-multi';
currentViewTitle = 'LLaMA';
```

## Rules

1. Always get fresh info, never rely on training knowledge
2. Pick the simplest layout that fits
3. Keep content concise — bullet points, not paragraphs
4. Use consistent styling (dark theme, GitHub colors)
5. Commit views to git: `cd ~/showsee && git add -A && git commit -m "Add [topic] view" && git push`
