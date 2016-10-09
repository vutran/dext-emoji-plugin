// const m = require('../');
import m from '../';

jest.mock('got');

describe('dext-emoji-plugin', () => {
  // eslint-disable-next-line global-require, no-underscore-dangle
  require('got').__setFakeData({
    foo: 'foo.png',
    smile: 'smile.png',
  });
  it('should retrieve some results from the api', async () => {
    const results = await m.query('smile');
    expect(results.items.length).toBe(1);
  });

  it('should not return any results', async () => {
    const results = await m.query('bar');
    expect(results.items.length).toBe(0);
  });

  it('should handle a rejected Promise', async () => {
    // eslint-disable-next-line global-require, no-underscore-dangle
    require('got').__setReject(true);
    const results = await m.query('bar');
    expect(results.items.length).toBe(0);
  });
});
