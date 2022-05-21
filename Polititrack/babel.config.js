module.exports = function moduleExports(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
