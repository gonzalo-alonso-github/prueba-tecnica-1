module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react"
    ],
    "ignorePatterns": [".eslintrc.cjs", "vite.config.ts", "src/vite-env.d.ts"],
    "rules": {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/quotes': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        'no-multi-spaces': 'off',
        '@typescript-eslint/key-spacing': 'off',
        '@typescript-eslint/space-before-blocks': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/object-curly-spacing': 'off',
        '@typescript-eslint/block-spacing': 'off',
        'operator-linebreak': 'off',
        'react/react-in-jsx-scope': 'off'
    }
}
