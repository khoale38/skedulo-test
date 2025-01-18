module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  };
  