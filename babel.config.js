module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
          'api/*': ['api/*'],
          'navigation/*': ['navigation/*'],
          'screens/*': ['screens/*'],
          'components/*': ['./components/*'],
          'store/*': ['store/*'],
          'utils/*': ['utils/*'],
          'locales/*': ['locales/*'],
          'constant/*': ['constant/*'],
          'assets/*': ['assets/*'],
          'firebase/*': ['firebase/*'],

        },
      },
    ],
  ],
};
