class StructureParser {
    constructor() {
        this.ignoredPaths = [
            'node_modules',
            '.git',
            'dist',
            'build',
            'coverage',
            '.next',
            '.cache',
            'vendor',
            '__pycache__',
            '.pytest_cache',
            'venv',
            'env'
        ];
    }

  
    parseRepoStructure(tree) {
        const structure = {
            root: [],
            directories: {},
            files: {},
            stats: {
                totalFiles: 0,
                totalDirs: 0,
                filesByType: {}
            }
        };

        // Filter out ignored paths
        const filteredTree = tree.filter(item => {
            return !this.ignoredPaths.some(ignored => item.path.includes(ignored));
        });

        // Organize files and directories
        filteredTree.forEach(item => {
            const pathParts = item.path.split('/');

            if (item.type === 'tree') {
                structure.stats.totalDirs++;
                structure.directories[item.path] = {
                    path: item.path,
                    name: pathParts[pathParts.length - 1],
                    depth: pathParts.length
                };
            } else if (item.type === 'blob') {
                structure.stats.totalFiles++;

                const ext = this.getFileExtension(item.path);
                structure.stats.filesByType[ext] = (structure.stats.filesByType[ext] || 0) + 1;

                structure.files[item.path] = {
                    path: item.path,
                    name: pathParts[pathParts.length - 1],
                    extension: ext,
                    size: item.size,
                    depth: pathParts.length
                };
            }
        });

        // Build hierarchy
        structure.hierarchy = this.buildHierarchy(filteredTree);

        return structure;
    }

    // Build hierarchical tree structure
    buildHierarchy(tree) {
        const root = { name: 'root', children: [], type: 'directory' };
        const pathMap = { '': root };

        tree.forEach(item => {
            const pathParts = item.path.split('/');
            let currentPath = '';

            pathParts.forEach((part, index) => {
                const parentPath = currentPath;
                currentPath = currentPath ? `${currentPath}/${part}` : part;

                if (!pathMap[currentPath]) {
                    const node = {
                        name: part,
                        path: currentPath,
                        type: index === pathParts.length - 1 ? item.type : 'tree',
                        children: []
                    };

                    pathMap[currentPath] = node;

                    if (pathMap[parentPath]) {
                        pathMap[parentPath].children.push(node);
                    }
                }
            });
        });

        return root;
    }

    // Get file extension
    getFileExtension(path) {
        const parts = path.split('.');
        return parts.length > 1 ? parts[parts.length - 1] : 'no-ext';
    }

    // Identify important files
    identifyImportantFiles(structure) {
        const importantPatterns = [
            'package.json',
            'requirements.txt',
            'Cargo.toml',
            'go.mod',
            'pom.xml',
            'build.gradle',
            'Makefile',
            'Dockerfile',
            'docker-compose.yml',
            'README.md',
            'CONTRIBUTING.md',
            'LICENSE',
            '.env.example',
            'tsconfig.json',
            'webpack.config.js',
            'vite.config.js',
            'next.config.js'
        ];

        const importantFiles = [];

        Object.values(structure.files).forEach(file => {
            if (importantPatterns.some(pattern =>
                file.name.toLowerCase().includes(pattern.toLowerCase())
            )) {
                importantFiles.push(file.path);
            }
        });

        return importantFiles;
    }

    // Identify key directories
    identifyKeyDirectories(structure) {
        const keyPatterns = {
            'src': 'Source code',
            'lib': 'Library code',
            'app': 'Application code',
            'components': 'React/Vue components',
            'pages': 'Page components',
            'routes': 'Route definitions',
            'api': 'API endpoints',
            'controllers': 'Controllers',
            'models': 'Data models',
            'views': 'View templates',
            'services': 'Business logic services',
            'utils': 'Utility functions',
            'helpers': 'Helper functions',
            'config': 'Configuration files',
            'tests': 'Test files',
            'docs': 'Documentation',
            'public': 'Public assets',
            'static': 'Static files',
            'assets': 'Assets',
            'styles': 'Stylesheets',
            'css': 'CSS files',
            'scripts': 'Scripts',
            'bin': 'Binary/executable files',
            'migrations': 'Database migrations',
            'seeds': 'Database seeds'
        };

        const keyDirs = [];

        Object.values(structure.directories).forEach(dir => {
            const dirName = dir.name.toLowerCase();

            Object.entries(keyPatterns).forEach(([pattern, description]) => {
                if (dirName.includes(pattern)) {
                    keyDirs.push({
                        path: dir.path,
                        name: dir.name,
                        description
                    });
                }
            });
        });

        return keyDirs;
    }

    // Detect project type
    detectProjectType(structure) {
        const files = Object.keys(structure.files);

        const patterns = {
            'React': ['package.json', 'jsx', 'tsx'],
            'Vue': ['package.json', 'vue'],
            'Angular': ['package.json', 'angular.json'],
            'Next.js': ['next.config.js', 'package.json'],
            'Node.js': ['package.json', 'server.js', 'index.js'],
            'Python': ['requirements.txt', 'setup.py', 'pyproject.toml'],
            'Django': ['manage.py', 'settings.py'],
            'Flask': ['app.py', 'requirements.txt'],
            'FastAPI': ['main.py', 'requirements.txt'],
            'Go': ['go.mod', 'main.go'],
            'Rust': ['Cargo.toml', 'src/main.rs'],
            'Java': ['pom.xml', 'build.gradle'],
            'Spring Boot': ['pom.xml', 'application.properties'],
            'Ruby on Rails': ['Gemfile', 'config.ru'],
            'PHP': ['composer.json', 'index.php'],
            'Laravel': ['artisan', 'composer.json']
        };

        const detectedTypes = [];

        Object.entries(patterns).forEach(([type, indicators]) => {
            const matches = indicators.filter(indicator =>
                files.some(file => file.includes(indicator))
            );

            if (matches.length > 0) {
                detectedTypes.push({
                    type,
                    confidence: matches.length / indicators.length
                });
            }
        });

        return detectedTypes.sort((a, b) => b.confidence - a.confidence);
    }
}

export default new StructureParser();
