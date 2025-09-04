import tsParser from '@typescript-eslint/parser'
import tseslint from 'typescript-eslint';
import tsPlugin from '@typescript-eslint/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals'

export default [
  ...tseslint.configs.recommended,

  {
    ignores: ['node_modules/**', 'build/**', 'release/**', '**/*.json', '**/*.html', '**/*.css', '**/*.js'],
  },

  {
    files: ['packages/shared/**/*.{js,ts}'],
    ignores: ['config/**/*.{js,ts}'],
  },

  {
    files: ['packages/**/*.{js,ts}'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.es2022,
        ...globals.node,
        ...globals.browser,
        ...globals.devtools,
      },
    },

    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
  },
];
