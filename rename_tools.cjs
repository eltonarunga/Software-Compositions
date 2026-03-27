const fs = require('fs');

// 1. types.ts
let types = fs.readFileSync('types.ts', 'utf8');
types = types.replace(/aiModels\?: string\[\]/g, 'aiTools?: string[]');
fs.writeFileSync('types.ts', types);

// 2. constants.ts
let constants = fs.readFileSync('constants.ts', 'utf8');
constants = constants.replace(/aiModels:/g, 'aiTools:');
fs.writeFileSync('constants.ts', constants);

// 3. App.tsx
let app = fs.readFileSync('App.tsx', 'utf8');
app = app.replace(/AiModels/g, 'AiTools');
app = app.replace(/AiModel/g, 'AiTool');
app = app.replace(/aiModels/g, 'aiTools');
app = app.replace(/aiModel/g, 'aiTool');
app = app.replace(/AI Models/g, 'AI Tools');
app = app.replace(/AI models/g, 'AI tools');
app = app.replace(/Remove model/g, 'Remove tool');
app = app.replace(/model =>/g, 'tool =>');
app = app.replace(/\(model\)/g, '(tool)');
app = app.replace(/\{model\}/g, '{tool}');
app = app.replace(/key=\{model\}/g, 'key={tool}');
app = app.replace(/m => m !== model/g, 't => t !== tool');

fs.writeFileSync('App.tsx', app);
console.log('Renaming complete');
