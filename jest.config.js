export default {
  clearMocks: true,
  collectCoverageFrom: undefined,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageReporters: ["lcov"],
  setupFilesAfterEnv: [],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).ts"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
