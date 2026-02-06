class CodeParser {
    async parseFile(content, extension) {
       
        return {
            functions: this.extractFunctionsSimple(content, extension),
            classes: this.extractClassesSimple(content, extension),
            imports: this.extractImportsSimple(content, extension)
        };
    }

    extractFunctionsSimple(content, ext) {
        const functions = [];
        if (['js', 'jsx', 'ts', 'tsx'].includes(ext)) {
       
            const patterns = [
                /function\s+(\w+)\s*\(/g,
                /const\s+(\w+)\s*=\s*\(/g,
                /(\w+)\s*:\s*function\s*\(/g,
                /(\w+)\s*\([^)]*\)\s*{/g
            ];
            patterns.forEach(pattern => {
                const matches = content.matchAll(pattern);
                for (const match of matches) {
                    if (match[1]) functions.push(match[1]);
                }
            });
        } else if (ext === 'py') {
            const pattern = /def\s+(\w+)\s*\(/g;
            const matches = content.matchAll(pattern);
            for (const match of matches) {
                functions.push(match[1]);
            }
        }
        return [...new Set(functions)];
    }

    extractClassesSimple(content, ext) {
        const classes = [];
        if (['js', 'jsx', 'ts', 'tsx'].includes(ext)) {
            const pattern = /class\s+(\w+)/g;
            const matches = content.matchAll(pattern);
            for (const match of matches) {
                classes.push(match[1]);
            }
        } else if (ext === 'py') {
            const pattern = /class\s+(\w+)/g;
            const matches = content.matchAll(pattern);
            for (const match of matches) {
                classes.push(match[1]);
            }
        }
        return [...new Set(classes)];
    }

    extractImportsSimple(content, ext) {
        const imports = [];
        if (['js', 'jsx', 'ts', 'tsx'].includes(ext)) {
            const patterns = [
                /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g,
                /require\s*\(['"]([^'"]+)['"]\)/g
            ];
            patterns.forEach(pattern => {
                const matches = content.matchAll(pattern);
                for (const match of matches) {
                    imports.push(match[1]);
                }
            });
        } else if (ext === 'py') {
            const patterns = [
                /import\s+(\w+)/g,
                /from\s+(\w+)\s+import/g
            ];
            patterns.forEach(pattern => {
                const matches = content.matchAll(pattern);
                for (const match of matches) {
                    imports.push(match[1]);
                }
            });
        }
        return [...new Set(imports)];
    }
}

export default new CodeParser();
