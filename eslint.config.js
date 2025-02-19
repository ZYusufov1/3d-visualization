import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: [ 'dist' ],
        files: [ '**/*.{ts,tsx,jsx}' ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        plugins: {
            'react': react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true }
            ],
            'semi': [ 'error', 'never' ],
            'object-curly-spacing': [ 'error', 'always' ],
            'quotes': [ 'error', 'single' ],
            'react/jsx-curly-spacing': [
                'error',
                { when: 'always', attributes: false, children: true }
            ],
            'react/jsx-newline': ['warn', { prevent: false, allowMultilines: false }],
        }
    }
]
