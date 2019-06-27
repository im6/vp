module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["react", "jsx-a11y", "import", "prettier"],
  rules: {
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "react/forbid-prop-types": 0,
    "prettier/prettier": ["error"]
  },
  env: {
    browser: true
  }
};
