module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
  coverageDirectoy: "coverage",
  testEnviroment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
