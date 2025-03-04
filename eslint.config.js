const tseslint = require('typescript-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
module.exports = [
  // 应用 TypeScript ESLint 推荐配置
  ...tseslint.configs.recommended,

  // 全局配置
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        // 浏览器环境
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        // Chrome 扩展 API
        chrome: 'readonly',
      },
    },

    // 从 .eslintignore 迁移的忽略规则
    ignores: [
      'node_modules/**',
      'build/**',
      'release/**',
      '**/*.json',
      '**/*.html',
      '**/*.css',
    ],

    // 从 .eslintrc.js 迁移的规则
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },

    plugins: {
      prettier: prettierPlugin,
    },
  },
];
