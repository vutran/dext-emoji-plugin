const dango = require('dango');

/**
 * Maps the dango emoji item to a Dext item
 *
 * @param {Object} item
 * @return {Object}
 */
const mapItems = item => Object.assign({}, {
  title: '',
  subtitle: '',
  arg: item.text,
  icon: {
    type: 'text',
    letter: item.text,
    bgColor: 'transparent',
  },
  text: {
    copy: item.text,
  },
});

module.exports = {
  keyword: 'emoji',
  helper: {
    title: 'Search for emojis',
    icon: {
      path: './icon.png',
    },
  },
  query: q => new Promise((resolve) => {
    let items = [];
    dango(q)
      .then((dangoItems) => {
        items = dangoItems.map(mapItems);
        resolve({ items });
      })
      .catch(() => resolve({ items }));
  }),
};
