module.exports = {
  launch: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  },
  server: {
    command: 'npm run start',
    port: 8080,
  },
};
