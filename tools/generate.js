#!/usr/bin/env node
/**
 * Excalidraw JSON Generator
 * Generates .excalidraw.json files that open in excalidraw.com/app
 * 
 * Usage:
 *   node generate.js --title "My Diagram" --output hexclamp.excalidraw.json
 *   node generate.js --rect "OBSERVE" --at 100,100 --rect "CONDENSE" --at 300,100 ...
 *   node generate.js --flow "OBSERVE->CONDENSE->PLAN->EXECUTE->VERIFY->PERSIST"
 */

const fs = require('fs');
const path = require('path');

// Generate a simple rectangle element
function rect(id, text, x, y, w = 160, h = 60, color = '#61afef') {
  return {
    id,
    type: 'rectangle',
    x,
    y,
    width: w,
    height: h,
    angle: 0,
    strokeColor: '#1e1e1e',
    backgroundColor: color,
    fillStyle: 'solid',
    strokeWidth: 2,
    strokeStyle: 'solid',
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: { type: 3 },
    seed: Math.floor(Math.random() * 100000),
    version: 1,
    versionNonce: 0,
    isDeleted: false,
    boundElements: [],
    link: null,
    locked: false,
    text,
    fontSize: 20,
    fontFamily: 1,
    textAlign: 'center',
    verticalAlign: 'middle',
    baseline: 28,
    containerId: null,
    originalText: text,
    lineHeight: 1.25
  };
}

// Generate an arrow between two points
function arrow(id, startX, startY, endX, endY) {
  return {
    id,
    type: 'arrow',
    x: startX,
    y: startY,
    width: Math.abs(endX - startX),
    height: Math.abs(endY - startY),
    angle: 0,
    strokeColor: '#1e1e1e',
    backgroundColor: 'transparent',
    fillStyle: 'solid',
    strokeWidth: 2,
    strokeStyle: 'solid',
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: { type: 2 },
    seed: Math.floor(Math.random() * 100000),
    version: 1,
    versionNonce: 0,
    isDeleted: false,
    boundElements: [],
    link: null,
    locked: false,
    points: [[0, 0], [endX - startX, endY - startY]],
    lastCommittedPoint: null,
    startBinding: null,
    endBinding: null,
    startArrowhead: null,
    endArrowhead: 'arrow',
    fluid: false
  };
}

// Generate text element
function text(id, content, x, y) {
  return {
    id,
    type: 'text',
    x,
    y,
    width: 200,
    height: 30,
    angle: 0,
    strokeColor: '#1e1e1e',
    backgroundColor: 'transparent',
    fillStyle: 'solid',
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 0,
    opacity: 100,
    groupIds: [],
    frameId: null,
    seed: Math.floor(Math.random() * 100000),
    version: 1,
    versionNonce: 0,
    isDeleted: false,
    boundElements: [],
    link: null,
    locked: false,
    text: content,
    fontSize: 24,
    fontFamily: 1,
    textAlign: 'left',
    verticalAlign: 'top',
    baseline: 19,
    containerId: null,
    originalText: content,
    lineHeight: 1.25
  };
}

// Generate full Excalidraw document
function generateExcalidraw(elements, title = 'Excalidraw Diagram') {
  return {
    type: 'excalidraw',
    version: 2,
    source: 'showsee-generator',
    elements,
    appState: {
      gridSize: null,
      viewBackgroundColor: '#fafafa'
    },
    files: {}
  };
}

// Parse command line args
const args = process.argv.slice(2);
let title = 'Excalidraw Diagram';
let output = 'diagram.excalidraw.json';
let elements = [];

if (args.includes('--flow')) {
  const idx = args.indexOf('--flow');
  const flow = args[idx + 1].split('->');
  
  const colors = ['#61afef', '#e5c07b', '#c678dd', '#98c379', '#e06c75', '#d19a66'];
  const startX = 100;
  const startY = 200;
  const gapX = 200;
  const gapY = 120;
  
  flow.forEach((label, i) => {
    label = label.trim();
    const x = startX + i * gapX;
    const y = startY;
    const color = colors[i % colors.length];
    
    elements.push(rect(`rect-${i}`, label, x, y, 150, 55, color));
    
    if (i < flow.length - 1) {
      elements.push(arrow(`arrow-${i}`, x + 155, y + 27, x + gapX - 5, startY + 27));
    }
  });
  
  if (args[idx + 2] === '--loop') {
    // Add loop back arrow
    const lastX = startX + (flow.length - 1) * gapX;
    elements.push(arrow('loop-back', lastX + 75, startY + 60, startX + 75, startY + 110));
    elements.push(arrow('loop-to', startX + 75, startY + 105, startX + 155, startY + 27));
  }
  
  title = 'Flow Diagram';
  output = 'flow.excalidraw.json';
}

// Or generate a simple HexClamp diagram
if (args.includes('--hexclamp')) {
  title = 'HexClamp Loop';
  output = 'hexclamp.excalidraw.json';
  
  const stages = ['OBSERVE', 'CONDENSE', 'PLAN', 'EXECUTE', 'VERIFY', 'PERSIST'];
  const colors = ['#61afef', '#e5c07b', '#c678dd', '#98c379', '#e06c75', '#d19a66'];
  const startX = 80;
  const startY = 100;
  const gapX = 180;
  const gapY = 100;
  
  // Top row: OBSERVE -> CONDENSE -> PLAN -> EXECUTE
  const topRow = stages.slice(0, 4);
  topRow.forEach((label, i) => {
    const x = startX + i * gapX;
    elements.push(rect(`r-${i}`, label, x, startY, 150, 55, colors[i]));
    if (i < topRow.length - 1) {
      elements.push(arrow(`a-${i}`, x + 155, startY + 27, x + gapX - 5, startY + 27));
    }
  });
  
  // Arrow down from EXECUTE to VERIFY
  elements.push(arrow('a-down', startX + 3 * gapX + 75, startY + 60, startX + 3 * gapX + 75, startY + gapY - 5));
  
  // VERIFY -> PERSIST (below EXECUTE, to the left)
  elements.push(rect('r-4', 'VERIFY', startX + 2 * gapX, startY + gapY, 150, 55, colors[4]));
  elements.push(rect('r-5', 'PERSIST', startX + 3 * gapX, startY + gapY, 150, 55, colors[5]));
  
  // Arrows between bottom row
  elements.push(arrow('a-4', startX + 2 * gapX + 155, startY + gapY + 27, startX + 3 * gapX - 5, startY + gapY + 27));
  
  // Loop back arrow
  elements.push(arrow('loop-1', startX + 3 * gapX + 75, startY + gapY + 60, startX + 3 * gapX + 75, startY + gapY + 150));
  elements.push(arrow('loop-2', startX + 3 * gapX + 75, startY + gapY + 145, startX + 75, startY + 27));
}

// Custom rectangles
if (args.includes('--rect')) {
  const idx = args.indexOf('--rect');
  let i = idx + 1;
  while (i < args.length && !args[i].startsWith('--')) {
    const text = args[i];
    const atIdx = args.indexOf('--at', i);
    if (atIdx === -1) break;
    const coords = args[atIdx + 1].split(',').map(Number);
    elements.push(rect(`rect-${i}`, text, coords[0], coords[1]));
    i = atIdx + 2;
  }
}

// Help
if (args.includes('--help') || args.length === 0) {
  console.log(`
Showsee Excalidraw Generator

Usage:
  node generate.js --flow "A->B->C"           Simple flow diagram
  node generate.js --hexclamp                 HexClamp loop diagram
  node generate.js --rect "TEXT" --at 100,200  Custom rectangle
  node generate.js --title "My Diagram"       Set title
  node generate.js --output file.json          Set output file

Output goes to ./output/ by default
  `);
  process.exit(0);
}

// Title
const titleIdx = args.indexOf('--title');
if (titleIdx !== -1 && args[titleIdx + 1]) {
  title = args[titleIdx + 1];
}

// Output
const outputIdx = args.indexOf('--output');
if (outputIdx !== -1 && args[outputIdx + 1]) {
  output = args[outputIdx + 1];
}

// Ensure output dir
const outDir = path.join(__dirname, '..', 'views', 'excalidraw');
fs.mkdirSync(outDir, { recursive: true });

// Write file
const doc = generateExcalidraw(elements, title);
const outPath = path.join(outDir, output);
fs.writeFileSync(outPath, JSON.stringify(doc, null, 2));

console.log(`Written: ${outPath}`);
console.log(`Open in browser: https://excalidraw.com/#json=$(basename "${output}")`);
