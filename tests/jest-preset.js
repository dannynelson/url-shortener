const tsPreset = require('ts-jest/jest-preset');
const puppeteerPreset = require('jest-puppeteer/jest-preset');

module.exports = {
  ...tsPreset,
  ...puppeteerPreset,
  globals: {
    test_url: `http://${process.env.HOST || '127.0.0.1'}:${
      process.env.PORT || 3000
    }`,
  },
};
