import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // 应用 TypeScript ESLint 推荐配置
  ...tseslint.configs.recommended,

  {
    ignores: ['node_modules/**', 'build/**', 'release/**', '**/*.json', '**/*.html', '**/*.css'],
  },

  {
    files: ['packages/shared/**/*.{js,ts}'],
    ignore: ['config/**/*.{js,ts}'],
  },

  // 全局配置
  {
    files: ['packages/**/*.{js,ts}'],

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
