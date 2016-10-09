const got = require('got');

const ENDPOINT = 'https://api.github.com/emojis';

/**
 * Maps the emoji item to a Dext item
 *
 * @param {String} url
 * @param {String} name
 * @return {Object}
 */
const mapItems = (url, name) => Object.assign({}, {
  title: name,
  subtitle: '',
  arg: url,
  icon: {
    path: url,
  },
  text: {
    copy: `:${name}:`,
  },
});

/**
 * Fetches the items
 *
 * @return {Promise}
 */
const fetchItems = () => new Promise((resolve) => {
  got(ENDPOINT, { json: true })
    .then((response) => {
      const items = Object.keys(response.body).map(
        key => mapItems(response.body[key.toString()], key.toString())
      );
      resolve(items);
    })
    .catch(() => {
      resolve([]);
    });
});

module.exports = {
  keyword: 'emoji',
  helper: {
    title: 'Search for emojis',
  },
  query: q => new Promise((resolve) => {
    fetchItems()
      .then((items) => {
        // fuzzy filter
        resolve({
          items: items.filter(i => new RegExp(`${q}`, 'i').test(i.title)),
        });
      });
  }),
};
