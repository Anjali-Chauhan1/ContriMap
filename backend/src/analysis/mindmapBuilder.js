class MindMapBuilder {
    constructor() {
        this.nodeSpacing = 200;
        this.levelSpacing = 150;
    }

    
    buildMindMap(structure, repoName, repoData = {}) {
        const { maintainerStats = {}, languages = [], openIssues = 0 } = repoData;
        const primaryLang = languages[0] || 'General';

      
        const beginnerAreas = this.getBeginnerFriendlyAreas(structure);
        const coreAreas = this.getCoreAreas(structure);
        const essentialFiles = this.getEssentialFiles(structure);
        const testDirs = this.getTestDirectories(structure);
        
    
        const waitTime = maintainerStats.avgResponseDays || 3;
        const activityEmoji = maintainerStats.activityLevel === 'very-active' ? '⚡' :
                             maintainerStats.activityLevel === 'active' ? '🔥' :
                             maintainerStats.activityLevel === 'moderate' ? '⏳' : '🐌';

        let mermaid = 'flowchart TD\n';
        mermaid += '    classDef startNode fill:#10b981,stroke:#059669,stroke-width:3px,color:#fff\n';
        mermaid += '    classDef easyNode fill:#22c55e,stroke:#16a34a,stroke-width:2px,color:#fff\n';
        mermaid += '    classDef mediumNode fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff\n';
        mermaid += '    classDef hardNode fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff\n';
        mermaid += '    classDef successNode fill:#fbbf24,stroke:#f59e0b,stroke-width:3px,color:#000\n\n';

       
        const filesList = essentialFiles.slice(0, 3).map(f => f.name).join(', ');
        mermaid += `    A["📖 Step 1: Read These First<br/>${filesList}"]:::easyNode\n`;

        
        const techList = languages.slice(0, 3).join(', ');
        mermaid += `    B["💻 Step 2: Learn ${primaryLang}<br/>Stack: ${techList}"]:::easyNode\n`;
        mermaid += '    A --> B\n\n';

        
        mermaid += `    C{"🚀 Step 3: Pick Your Area<br/>${beginnerAreas.length} beginner | ${coreAreas.length} advanced"}:::startNode\n`;
        mermaid += '    B --> C\n\n';

        
        const beginnerList = beginnerAreas.slice(0, 2).map(a => a.name).join(', ');
        mermaid += `    D["🟢 Beginner Areas<br/>Start: ${beginnerList}"]:::easyNode\n`;
        mermaid += '    C -->|"Easy Start"| D\n\n';

       
        const coreList = coreAreas.slice(0, 2).map(a => a.name).join(', ');
        mermaid += `    E["🔴 Advanced Areas<br/>Complex: ${coreList}"]:::hardNode\n`;
        mermaid += '    C -->|"Advanced"| E\n\n';

       
        mermaid += '    F["✏️ Step 4: Make Changes<br/>Edit your chosen files"]:::mediumNode\n';
        mermaid += '    D --> F\n';
        mermaid += '    E --> F\n\n';

     
        const testDir = testDirs.length > 0 ? testDirs[0].name : 'tests';
        mermaid += `    G["🧪 Step 5: Write Tests<br/>Add in: ${testDir}"]:::mediumNode\n`;
        mermaid += '    F --> G\n\n';

       
        mermaid += `    H["✅ Step 6: Pre-PR Checklist<br/>Run ${primaryLang} tests + format"]:::mediumNode\n`;
        mermaid += '    G --> H\n\n';

        mermaid += `    I["📤 Step 7: Submit PR<br/>${openIssues} open issues available"]:::mediumNode\n`;
        mermaid += '    H --> I\n\n';

     
        mermaid += `    J["${activityEmoji} Step 8: Maintainer Review<br/>Avg response: ~${waitTime} days"]:::mediumNode\n`;
        mermaid += '    I --> J\n\n';


        mermaid += `    K["🎉 Merged to ${repoName}!<br/>You're now a contributor!"]:::successNode\n`;
        mermaid += '    J --> K\n';

        return { mermaidCode: mermaid };
    }

    
    getEssentialFiles(structure) {
        const essentialPatterns = [
            { pattern: 'README.md', priority: 1, description: 'Project overview' },
            { pattern: 'CONTRIBUTING.md', priority: 2, description: 'How to contribute' },
            { pattern: 'package.json', priority: 3, description: 'Dependencies & scripts' },
            { pattern: 'requirements.txt', priority: 3, description: 'Python dependencies' }
        ];

        const found = [];
        Object.values(structure.files).forEach(file => {
            const match = essentialPatterns.find(p => 
                file.name.toLowerCase() === p.pattern.toLowerCase()
            );
            if (match) {
                found.push({
                    name: file.name,
                    path: file.path,
                    priority: match.priority,
                    description: match.description
                });
            }
        });

        return found.sort((a, b) => a.priority - b.priority);
    }

    getBeginnerFriendlyAreas(structure) {
        const beginnerPatterns = [
            { name: 'docs', description: 'Documentation files', type: 'documentation' },
            { name: 'public', description: 'Static assets', type: 'assets' },
            { name: 'styles', description: 'CSS/Styling', type: 'styling' },
            { name: 'assets', description: 'Images & resources', type: 'assets' },
            { name: 'components', description: 'UI components', type: 'frontend' },
            { name: 'utils', description: 'Helper functions', type: 'utilities' },
            { name: 'helpers', description: 'Utility functions', type: 'utilities' }
        ];

        const areas = [];
        Object.values(structure.directories).forEach(dir => {
            const match = beginnerPatterns.find(p => 
                dir.name.toLowerCase().includes(p.name.toLowerCase())
            );
            if (match) {
                areas.push({
                    name: dir.name,
                    path: dir.path,
                    description: match.description,
                    type: match.type,
                    fileCount: dir.fileCount || 0
                });
            }
        });

        return areas;
    }

   
    getCoreAreas(structure) {
        const corePatterns = [
            { name: 'controllers', description: 'Business logic', type: 'backend' },
            { name: 'models', description: 'Data models', type: 'backend' },
            { name: 'services', description: 'Core services', type: 'backend' },
            { name: 'routes', description: 'API routes', type: 'backend' },
            { name: 'middleware', description: 'Request processing', type: 'backend' },
            { name: 'api', description: 'API layer', type: 'backend' },
            { name: 'core', description: 'Core functionality', type: 'system' },
            { name: 'engine', description: 'Main engine', type: 'system' }
        ];

        const areas = [];
        Object.values(structure.directories).forEach(dir => {
            const match = corePatterns.find(p => 
                dir.name.toLowerCase().includes(p.name.toLowerCase())
            );
            if (match) {
                areas.push({
                    name: dir.name,
                    path: dir.path,
                    description: match.description,
                    type: match.type,
                    fileCount: dir.fileCount || 0
                });
            }
        });

        return areas;
    }

    getTestDirectories(structure) {
        const testDirs = [];
        Object.values(structure.directories).forEach(dir => {
            const name = dir.name.toLowerCase();
            if (name.includes('test') || name.includes('spec') || name.includes('__tests__')) {
                testDirs.push({
                    name: dir.name,
                    path: dir.path,
                    type: 'test-directory'
                });
            }
        });
        return testDirs;
    }

    isBeginnerFriendly(dirName) {
        const beginnerFriendlyPatterns = [
            'docs',
            'documentation',
            'examples',
            'tutorials',
            'guides',
            'public',
            'assets',
            'static',
            'styles',
            'css',
            'images',
            'fonts'
        ];

        return beginnerFriendlyPatterns.some(pattern =>
            dirName.toLowerCase().includes(pattern)
        );
    }

   
    getImportantFiles(structure) {
        const importantPatterns = [
            'package.json',
            'requirements.txt',
            'Cargo.toml',
            'go.mod',
            'README.md',
            'CONTRIBUTING.md',
            'tsconfig.json',
            'webpack.config.js',
            'vite.config.js',
            'next.config.js',
            'Dockerfile'
        ];

        const importantFiles = [];

        Object.values(structure.files).forEach(file => {
            if (importantPatterns.some(pattern =>
                file.name.toLowerCase() === pattern.toLowerCase()
            )) {
                importantFiles.push(file);
            }
        });

        return importantFiles;
    }

   
    buildSimplifiedMindMap(structure, repoName, maxNodes = 30) {
        const nodes = [];
        const edges = [];
        let nodeId = 0;

        const rootNode = {
            id: `node-${nodeId++}`,
            type: 'root',
            data: {
                label: repoName,
                description: 'Repository Root',
                type: 'repository'
            },
            position: { x: 0, y: 0 }
        };
        nodes.push(rootNode);

     
        const categories = this.categorizeDirectories(structure);

        const categoryNodes = [];
        const categoryCount = Object.keys(categories).length;
        const angleStep = (2 * Math.PI) / categoryCount;
        const radius = 250;

        Object.entries(categories).forEach(([category, dirs], index) => {
            const angle = index * angleStep;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const categoryNode = {
                id: `node-${nodeId++}`,
                type: 'category',
                data: {
                    label: category,
                    type: 'category',
                    count: dirs.length
                },
                position: { x, y }
            };
            nodes.push(categoryNode);
            categoryNodes.push(categoryNode);

            edges.push({
                id: `edge-${rootNode.id}-${categoryNode.id}`,
                source: rootNode.id,
                target: categoryNode.id,
                type: 'smoothstep'
            });
        });

        return { nodes, edges };
    }


    categorizeDirectories(structure) {
        const categories = {
            'Source Code': [],
            'Configuration': [],
            'Documentation': [],
            'Tests': [],
            'Assets': [],
            'Other': []
        };

        Object.values(structure.directories).forEach(dir => {
            const name = dir.name.toLowerCase();

            if (name.includes('src') || name.includes('lib') || name.includes('app')) {
                categories['Source Code'].push(dir);
            } else if (name.includes('config') || name.includes('settings')) {
                categories['Configuration'].push(dir);
            } else if (name.includes('doc') || name.includes('guide')) {
                categories['Documentation'].push(dir);
            } else if (name.includes('test') || name.includes('spec')) {
                categories['Tests'].push(dir);
            } else if (name.includes('asset') || name.includes('public') || name.includes('static')) {
                categories['Assets'].push(dir);
            } else {
                categories['Other'].push(dir);
            }
        });

        // Remove empty categories
        Object.keys(categories).forEach(key => {
            if (categories[key].length === 0) {
                delete categories[key];
            }
        });

        return categories;
    }
}

export default new MindMapBuilder();
