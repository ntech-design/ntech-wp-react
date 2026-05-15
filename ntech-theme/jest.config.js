module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/test/styleMock.js',
    '\\.svg\\?url$': '<rootDir>/src/test/fileMock.js',
    '\\.svg$': '<rootDir>/src/test/svgMock.tsx',
    '\\.(png|jpg|jpeg|gif|webp|woff|woff2)$': '<rootDir>/src/test/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
};
