import m from '../';

describe('dext-emoji-plugin', () => {
  it('should retrieve some results from the api', async () => {
    const results = await m.query('pizza');
    expect(results.items.length).toBe(1);
  });

  it('should not return any results', async () => {
    const results = await m.query('ranch');
    expect(results.items.length).toBe(0);
  });
});
