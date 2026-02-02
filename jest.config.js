module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@expo/vector-icons$': '<rootDir>/__mocks__/@expo/vector-icons.js',
    '^expo$': '<rootDir>/__mocks__/expo.js',
    '^expo-constants$': '<rootDir>/__mocks__/expo-constants.js',
    '^expo-splash-screen$': '<rootDir>/__mocks__/expo-splash-screen.js',
    '^react-native-localize$': '<rootDir>/__mocks__/react-native-localize.js',
    '^react-i18next$': '<rootDir>/__mocks__/react-i18next.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-safe-area-context|react-native-screens)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
