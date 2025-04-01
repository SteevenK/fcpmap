import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // Extension des configurations Next.js et Prettier
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended'
  ),
  {
    // Cible tous vos fichiers JS/TS
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Enforce Prettier formatting as an ESLint rule
      'prettier/prettier': 'error',
    },
  },
]

export default eslintConfig
