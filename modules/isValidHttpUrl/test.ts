import isValidHttpUrl from '.';

describe('isValidHttpUrl', () => {
  [
    'https://www.google.com',
    'http://www.google.com',
    'https://google.com',
    'https://www.google.com/search?q=stord&oq=stord',
  ].forEach((testUrl) => {
    it(`returns true for valid http(s) url "${testUrl}"`, () => {
      expect(isValidHttpUrl(testUrl)).toBe(true);
    });
  });

  ['foo', 'bar', 'hello world', 'test https://google.com'].forEach(
    (testUrl) => {
      it(`returns false for non URL string "${testUrl}"`, () => {
        expect(isValidHttpUrl(testUrl)).toBe(false);
      });
    }
  );

  ['ftp://user:password@host:port/path', 'amqp://user:pass@host:10000'].forEach(
    (testUrl) => {
      it(`returns false for non http(s) url "${testUrl}"`, () => {
        expect(isValidHttpUrl(testUrl)).toBe(false);
      });
    }
  );
});
