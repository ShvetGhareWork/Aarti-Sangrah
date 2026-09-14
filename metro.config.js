const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// If you have custom rules (like SVG transformers or custom paths),
// apply them to the `config` object here.
// Example: config.resolver.sourceExts.push('cjs');

module.exports = mergeConfig(config, {});
