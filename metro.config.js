const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const workspaceRoot = projectRoot;

const config = getDefaultConfig(projectRoot);

config.watchFolders = [path.resolve(workspaceRoot, "tuner-dsp")];

// Prevent Metro from looking past the app root for node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
];

config.resolver.disableHierarchicalLookup = true;

module.exports = config;