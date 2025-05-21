import MCR from 'monocart-coverage-reports'

export const mcr = MCR({
    name: 'Quizmaster Frontend Coverage',
    outputDir: './coverage',
    reports: ['v8', 'v8-json'],
    baseDir: 'frontend/src',
    sourceFilter: {
        '**/*.{js,jsx,ts,tsx}': true,
        '**/node_modules/**': false,
    },
    sourcePath: {
        'frontend/src/': ''
    },
})
