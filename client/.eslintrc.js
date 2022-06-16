module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    extends: ['plugin:prettier/recommended', 'prettier', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: ['react'],
    rules: {},
};
