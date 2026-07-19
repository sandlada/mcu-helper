import { defineConfig } from 'rolldown'

export default defineConfig({
    input: {
        'index'                              : './src/index.ts',
        'generators/material-color.service'  : './src/generators/material-color.service.ts',
        'generators/material-palette.service': './src/generators/material-palette.service.ts',
        'generators/serialization.service'   : './src/generators/serialization.service.ts',
        'material/material-colors'           : './src/material/material-colors.ts',
        'material/material-contrast-level'   : './src/material/material-contrast-level.ts',
        'material/material-variant'          : './src/material/material-variant.ts',
        'utils/string-util'                  : './src/utils/string-util.ts',
    },
    output: {
        format        : 'esm',
        dir           : 'build',
        entryFileNames: '[name].js',
        minify        : true,
        sourcemap     : true,
        cleanDir      : true,
    },
    external: ['@material/material-color-utilities'],
})
