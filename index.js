const emojilib = require("emojilib");

/**
 * Maps the dango emoji item to a Dext item
 *
 * @param {Object} item
 * @return {Object}
 */
const mapItems = item =>
  Object.assign(
    {},
    {
      title: "",
      subtitle: "",
      arg: item.char,
      icon: {
        type: "text",
        letter: item.char,
        bgColor: "transparent"
      },
      text: {
        copy: item.char
      }
    }
  );

// Check object from search list for a match
const matchesQuery = (query, emojiObj) =>
  emojiObj.name === query || emojiObj.keywords.includes(query);
// Build an easier to handle search list: [{ name: 'pizza', keywords: ['food', ...] }, { ... }]
const buildSearchList = (keys, emojiMap) =>
  keys.map(key => ({ name: key, keywords: emojiMap[key].keywords }));
// Returns all found results matching the query
const getMatchingEmojis = (query, orderedKeys, emojiMap) => {
  const searchList = buildSearchList(orderedKeys, emojiMap);
  return searchList.reduce((acc, val) => {
    if (matchesQuery(query, val)) {
      return acc.concat(emojiMap[val.name]);
    }
    return acc;
  }, []);
};

module.exports = {
  keyword: "emoji",
  helper: {
    title: "Search for emojis",
    icon: {
      path: "./icon.png"
    }
  },
  query: q =>
    new Promise(resolve => {
      const results = getMatchingEmojis(q, emojilib.ordered, emojilib.lib);
      resolve({ items: results.map(mapItems) });
    })
};
