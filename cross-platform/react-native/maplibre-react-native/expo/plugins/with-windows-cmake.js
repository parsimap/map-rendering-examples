// On Windows, builds native code with CMake 4.1.0 instead of the default CMake 3.22.1.
// The Ninja bundled with CMake 3.22.1 fails on paths longer than 260 characters.
const { withGradleProperties } = require('expo/config-plugins');

const CMAKE_VERSION = '4.1.0';

module.exports = function withWindowsCmake(config) {
  if (process.platform !== 'win32') {
    return config;
  }
  return withGradleProperties(config, (config) => {
    config.modResults = config.modResults.filter(
      (item) => !(item.type === 'property' && item.key === 'android.cmakeVersion'),
    );
    config.modResults.push({ type: 'property', key: 'android.cmakeVersion', value: CMAKE_VERSION });
    return config;
  });
};
