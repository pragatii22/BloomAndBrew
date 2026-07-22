import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // The standard "fetch on mount, setLoading in a .then/.finally" pattern
      // used across every data-fetching page in this app trips this
      // React-Compiler-oriented rule even though it's a correct, idiomatic
      // effect. Downgraded to a warning so it stays visible without failing
      // the lint gate for non-bug style preference.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
])
