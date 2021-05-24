module.exports = {
  preset: 'ts-jest',
  resetMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  roots: ['<rootDir>/components/', '<rootDir>/modules/', '<rootDir>/pages/'],
};
