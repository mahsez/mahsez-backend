import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
      'no-unused-expressions': ['error'],
      'prefer-const': ['error'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-undefined': ['error'],
    },
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
    ignores: ['.node_modules/*', 'dist/*'],
  },
])
