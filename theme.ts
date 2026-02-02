export const colors = {
  background: '#E6C8AF',
  headerBackground: '#8D6E63',
  cardBackground: '#D7CCC8',
  cardBorder: '#8D6E63',
  textPrimary: '#3E2723',
  textSecondary: '#5D4037',
  buttonBorder: '#3E2723',
};

export const playerColors = {
  red: '#E53935',
  blue: '#1E88E5',
  green: '#43A047',
  yellow: '#FDD835',
} as const;

export type PlayerColor = keyof typeof playerColors;
