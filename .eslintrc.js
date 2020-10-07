module.exports = {
  "plugins": ["import"],
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".d.ts",
          ".android.js",
          ".android.jsx",
          ".android.ts",
          ".android.tsx",
          ".ios.js",
          ".ios.jsx",
          ".ios.ts",
          ".ios.tsx",
          ".web.js",
          ".web.jsx",
          ".web.ts",
          ".web.tsx"
        ]
      }
    }
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "@react-native-community",
  ],
  "rules": {
    "prettier/prettier": 0,
    "quotes": 0,
    "semi": 0,
    "comma-dangle": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-function": 0,
  }
};
