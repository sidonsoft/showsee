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

### Step 2: Pick Visualization
Choose the visual format that fits the topic:

| Visualization | Use When | Example |
|---------------|----------|---------|
| **Text + Icons** | Abstract concepts, processes | HexClamp loop |
| **Static Diagram** | Flows, hierarchies, org charts | Neural network layers |
| **Animated CSS** | Simple movements, transitions | Twisting helix |
| **3D (Three.js)** | Physical structure, spatial relationships | DNA, molecules, machines |
| **Interactive** | User can explore, compare, calculate | Sliders, charts, toggles |

**Interactive elements** (combine with any visualization):
- **Sliders** — adjust values, see results update
- **Charts** — Chart.js for bar/line/pie data viz
- **Toggles** — show/hide options, switch views
- **Inputs** — calculators, converters, estimators

**Rule**: If the topic has physical/spatial structure → consider 3D. Otherwise → simpler is better.

**When to add interactivity:**
- Topic involves numbers/comparisons → calculator or chart
- User might want to explore different values → sliders
- Multiple data series → chart with toggle
- "What if" questions → interactive exploration

### Step 3: Pick View Layout
Choose the layout that fits the content:

| Layout | Use When |
|--------|----------|
| **Single** | One visual, minimal text |
| **Split (2-col)** | Visual + explanation side by side |
| **Split (3-col)** | Complex topics with multiple facets |
| **Timeline** | History, evolution, chronological |
| **Comparison** | X vs Y vs Z, pros/cons, specs |
| **Multi-view** | Combine layouts for rich information |

### Step 4: Get Fresh Information
**Never use training knowledge.** Always fetch fresh data:
- Web search for current info
- Web fetch for specific pages
- Local files if relevant

**Fallback**: If search/fetch returns nothing, use training knowledge but be upfront: "Based on my training data..."

### Step 5: Markdown First
Write the content in markdown, then format.

### Step 6: Build and Push
Create the HTML file, update default view, commit to git.

## Visualization Decision Tree

```
Topic has physical/spatial structure?
├── Yes → Can it be represented in 2D?
│   ├── Yes → Static diagram or CSS animation
│   └── No → 3D (Three.js)
└── No → Text/diagram based
```

**3D candidates**: DNA, proteins, machines, buildings, molecules, engines, solar systems, anatomical structures, tools with parts

**2D diagram candidates**: Networks, flows, hierarchies, timelines, comparisons, charts

**Text-based**: Concepts, explanations, definitions, processes (with icons/flowcharts)

## Available Libraries (CDN)

- **Three.js**: `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js` — 3D
- **Chart.js**: `https://cdn.jsdelivr.net/npm/chart.js` — charts
- **D3.js**: `https://d3js.org/d3.v7.min.js` — data visualization

**Interactive examples:**
- Loan calculator: sliders + live math + bar chart
- Population chart: Chart.js line/bar with toggle

## Output

Create a new `.html` file in `/Users/burnz/showsee/views/`:
`view-{topic}.html`

Update `showsee.html` to set as default:
```javascript
currentViewId = 'view-{topic}';
currentViewTitle = '{Topic Name}';
```

Commit: `cd ~/showsee && git add -A && git commit -m "Add {topic} view" && git push`

## Rules

1. Always get fresh info first, fall back to training if needed (say so)
2. Pick the simplest visualization that works
3. Don't over-engineer — a simple diagram beats a broken 3D model
4. Keep content scannable — bullets, not paragraphs
5. Consistent dark theme: background #0d1117, text #c9d1d9, accent #58a6ff

## Preference Log

Track Russell's feedback to refine future choices.

### Liked
| View | What Worked | Layout | Visualization |
|------|-------------|--------|---------------|
| DNA Double Helix | 3D interactive helix | Visual + Info | Three.js 3D ✓ |
| Loan Calculator | Sliders, live math | Interactive | Sliders + chart ✓ |
| MacBook Pro M5 | Product image, clickable chips | Configurator | Image + buttons ✓ |
| Home Battery | Animated flow diagram | Visual + modes | Animated arrows ✓ |

### Disliked
| View | What Didn't Work | Layout | Issue |
|------|------------------|--------|-------|
| HexClamp (original) | Concept + flowchart split | 2-col | "Confusing", "errors" |

### Patterns
- **Prefers**: 3D when structure is physical, interactive elements (sliders, toggles), real product images
- **Avoid**: Split explanation+flowchart layout (didn't work for HexClamp)
- **Likes**: Animated diagrams, calculators, configurators, comparisons
- **Values**: Visual richness, clickable/draggable elements, real images over CSS graphics

### Fresh Info Fallback
When search/fetch returns nothing, use training but be upfront: "Based on my training data..."
