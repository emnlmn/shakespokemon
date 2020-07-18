const path = require("path");

module.exports = {
  testEnvironment: "node",
  verbose: false,
  cacheDirectory: `${path.resolve(path.dirname(""))}/node_modules/.cache/jest`,
  rootDir: path.resolve(path.dirname("")),
  moduleDirectories: ["node_modules", "src"],
  testPathIgnorePatterns: ["node_modules", "dist", "features"],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverageFrom: [
    "**/*.ts",
    "!tests/**"
  ]
};
