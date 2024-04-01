# Technical Test
The objetive of this technical test is to create a similar application to the one provided in this link: https://aaaaa.
To achieve this, you must use the API provided by https://randomuser.me/.

Here are the steps to follow:

- [X] Fetch 100 rows of data using the API
- [X] Display the data in a table format, similar to the example
- [X] Provide the option to color rows as shown in the example
- [X] Allow the data to be sorted by country as demonstrated in the example
- [X] Enable the ability to delete a row as shown in the example
- [X] Implement a feature thst allows the users to restore the initil state, meaning that all deleted rows will be recovered
- [X] Handle any potential errors that may occurs
- [X] Implement a feature that allows the user to filter the data by country
- [?] Avoid sorting users again the data when the user is changing filter by country
- [] Sort by clicking on the column header
- [] Provide a README.md file with instructions on how to run the application

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
