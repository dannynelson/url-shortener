module.exports = {
  preset: './jest-preset.js',
  resetMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
};
