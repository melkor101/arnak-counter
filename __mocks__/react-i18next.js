const React = require('react');

// Simple translation mapping for tests
const translations = {
  'common.back': '< Back',
  'selectPlayers.title': 'Select Players',
  'selectPlayers.playerPlaceholder': 'Player {{number}}',
  'selectPlayers.addPlayer': 'Add Player',
  'selectPlayers.startGame': 'Start Game',
  'home.newGame': 'New Game',
  'home.history': 'History',
  'calculate.title': 'Calculate Score',
  'calculate.saveAndFinish': 'Save & Finish',
  'history.title': 'History',
  'history.gameHistory': 'Game History',
  'history.emptyMessage': 'Your past games will appear here',
  'splash.title': 'Lost Ruins of Arnak',
  'splash.subtitle': 'Calculator',
};

const useTranslation = () => ({
  t: (key, options) => {
    let translation = translations[key] || key;
    if (options?.number !== undefined) {
      translation = translation.replace('{{number}}', options.number);
    }
    return translation;
  },
  i18n: {
    language: 'en',
    changeLanguage: jest.fn(),
  },
});

const initReactI18next = {
  type: '3rdParty',
  init: jest.fn(),
};

module.exports = {
  useTranslation,
  initReactI18next,
  I18nextProvider: ({ children }) => children,
};
