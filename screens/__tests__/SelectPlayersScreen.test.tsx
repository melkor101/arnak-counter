import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import SelectPlayersScreen from '../SelectPlayersScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
  goBack: mockGoBack,
} as any;

const mockRoute = {} as any;

describe('SelectPlayersScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with 2 default players', () => {
    render(<SelectPlayersScreen navigation={mockNavigation} route={mockRoute} />);

    const inputs = screen.getAllByPlaceholderText(/Player \d/);
    expect(inputs).toHaveLength(2);
    expect(inputs[0].props.value).toBe('Player 1');
    expect(inputs[1].props.value).toBe('Player 2');
  });

  it('renders header with title and back button', () => {
    render(<SelectPlayersScreen navigation={mockNavigation} route={mockRoute} />);

    expect(screen.getByText('Select Players')).toBeTruthy();
    expect(screen.getByText('< Back')).toBeTruthy();
  });

  it('navigates back when back button is pressed', () => {
    render(<SelectPlayersScreen navigation={mockNavigation} route={mockRoute} />);

    fireEvent.press(screen.getByText('< Back'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('allows editing player name', () => {
    render(<SelectPlayersScreen navigation={mockNavigation} route={mockRoute} />);

    const inputs = screen.getAllByPlaceholderText(/Player \d/);
    fireEvent.changeText(inputs[0], 'Alice');

    expect(inputs[0].props.value).toBe('Alice');
  });

  it('shows Add Player button when less than 4 players', () => {
    render(<SelectPlayersScreen navigation={mockNavigation} route={mockRoute} />);

    expect(screen.getByText('Add Player')).toBeTruthy();
  });

  it('adds a new player when Add Player is pressed', () => {
    render(<SelectPlayersScreen navigation={mockNavigation} route={mockRoute} />);

    fireEvent.press(screen.getByText('Add Player'));

    const inputs = screen.getAllByPlaceholderText(/Player \d/);
    expect(inputs).toHaveLength(3);
    expect(inputs[2].props.value).toBe('Player 3');
  });

  it('hides Add Player button when 4 players exist', () => {
    render(<SelectPlayersScreen navigation={mockNavigation} route={mockRoute} />);

    // Add 2 more players to reach max
    fireEvent.press(screen.getByText('Add Player'));
    fireEvent.press(screen.getByText('Add Player'));

    expect(screen.queryByText('Add Player')).toBeNull();
  });

  it('removes a player when X is pressed with more than 2 players', () => {
    render(<SelectPlayersScreen navigation={mockNavigation} route={mockRoute} />);

    // Add a third player
    fireEvent.press(screen.getByText('Add Player'));
    let inputs = screen.getAllByPlaceholderText(/Player \d/);
    expect(inputs).toHaveLength(3);

    // Remove the first player
    const removeButtons = screen.getAllByText('✕');
    fireEvent.press(removeButtons[0]);

    inputs = screen.getAllByPlaceholderText(/Player \d/);
    expect(inputs).toHaveLength(2);
  });

  it('clears player name when X is pressed with exactly 2 players', () => {
    render(<SelectPlayersScreen navigation={mockNavigation} route={mockRoute} />);

    const removeButtons = screen.getAllByText('✕');
    fireEvent.press(removeButtons[0]);

    const inputs = screen.getAllByPlaceholderText(/Player \d/);
    expect(inputs).toHaveLength(2);
    expect(inputs[0].props.value).toBe('');
  });

  it('has Start Game button enabled when players have names', () => {
    render(<SelectPlayersScreen navigation={mockNavigation} route={mockRoute} />);

    const startButton = screen.getByText('Start Game');
    expect(startButton).toBeTruthy();
  });

  it('navigates to Calculate screen with selected players on Start Game', () => {
    render(<SelectPlayersScreen navigation={mockNavigation} route={mockRoute} />);

    fireEvent.press(screen.getByText('Start Game'));

    expect(mockNavigate).toHaveBeenCalledWith('Calculate', {
      players: [
        { name: 'Player 1', color: 'red' },
        { name: 'Player 2', color: 'blue' },
      ],
    });
  });

  it('only includes players with names when starting game', () => {
    render(<SelectPlayersScreen navigation={mockNavigation} route={mockRoute} />);

    // Clear first player's name
    const removeButtons = screen.getAllByText('✕');
    fireEvent.press(removeButtons[0]);

    fireEvent.press(screen.getByText('Start Game'));

    expect(mockNavigate).toHaveBeenCalledWith('Calculate', {
      players: [{ name: 'Player 2', color: 'blue' }],
    });
  });

  it('renders 4 color options for each player', () => {
    render(<SelectPlayersScreen navigation={mockNavigation} route={mockRoute} />);

    // Each player row should have 4 color options (red, blue, green, yellow)
    // With 2 players, we should have 8 color icons (account icons)
    const colorIcons = screen.getAllByTestId('icon-account');
    expect(colorIcons).toHaveLength(8);
  });
});
