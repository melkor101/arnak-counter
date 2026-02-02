import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { colors, playerColors, PlayerColor } from '../theme';
import type { Player } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectPlayers'>;

const defaultPlayers: Player[] = [
  { name: '', color: 'red' },
  { name: '', color: 'blue' },
  { name: '', color: 'green' },
  { name: '', color: 'yellow' },
];

const colorOptions: PlayerColor[] = ['red', 'blue', 'green', 'yellow'];

export default function SelectPlayersScreen({ navigation }: Props) {
  const [players, setPlayers] = useState<Player[]>(defaultPlayers);

  const updatePlayerName = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], name };
    setPlayers(newPlayers);
  };

  const updatePlayerColor = (index: number, color: PlayerColor) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], color };
    setPlayers(newPlayers);
  };

  const clearPlayer = (index: number) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], name: '' };
    setPlayers(newPlayers);
  };

  const selectedPlayers = players.filter((p) => p.name.trim() !== '');
  const hasSelectedPlayers = selectedPlayers.length > 0;

  const handleStartGame = () => {
    navigation.navigate('Calculate', { players: selectedPlayers });
  };

  const isColorTaken = (color: PlayerColor, currentIndex: number) => {
    return players.some(
      (p, i) => i !== currentIndex && p.name.trim() !== '' && p.color === color
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Players</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        {players.map((player, index) => (
          <View key={index} style={styles.playerRow}>
            <View style={styles.checkboxContainer}>
              {player.name.trim() !== '' && (
                <View style={styles.checkbox}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholder={`Player ${index + 1}`}
              placeholderTextColor={colors.textSecondary}
              value={player.name}
              onChangeText={(text) => updatePlayerName(index, text)}
            />
            <View style={styles.colorSelector}>
              {colorOptions.map((color) => {
                const taken = isColorTaken(color, index);
                const isSelected = player.color === color;
                return (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      isSelected && styles.colorSelected,
                      taken && styles.colorDisabled,
                    ]}
                    onPress={() => !taken && updatePlayerColor(index, color)}
                    disabled={taken}
                  >
                    <MaterialCommunityIcons
                      name="account"
                      size={26}
                      color={playerColors[color]}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => clearPlayer(index)}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={[styles.button, !hasSelectedPlayers && styles.buttonDisabled]}
          onPress={handleStartGame}
          disabled={!hasSelectedPlayers}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.headerBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: colors.headerBackground,
  },
  backButton: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 50,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.cardBorder,
  },
  checkboxContainer: {
    width: 28,
    height: 28,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#43A047',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.textPrimary,
    marginRight: 10,
  },
  colorSelector: {
    flexDirection: 'row',
    gap: 4,
  },
  colorOption: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSelected: {
    borderColor: colors.textPrimary,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  colorDisabled: {
    opacity: 0.3,
  },
  clearButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  clearButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.buttonBorder,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
});
