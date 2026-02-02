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
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { colors, playerColors, PlayerColor } from '../theme';
import type { Player } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectPlayers'>;

const MAX_PLAYERS = 4;

const colorOptions: PlayerColor[] = ['red', 'blue', 'green', 'yellow'];

export default function SelectPlayersScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const [players, setPlayers] = useState<Player[]>(() => [
    { name: t('selectPlayers.playerPlaceholder', { number: 1 }), color: 'red' as PlayerColor },
    { name: t('selectPlayers.playerPlaceholder', { number: 2 }), color: 'blue' as PlayerColor },
  ]);
  const [lockedColors, setLockedColors] = useState<Set<number>>(new Set());

  const updatePlayerName = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], name };
    setPlayers(newPlayers);
  };

  const updatePlayerColor = (index: number, color: PlayerColor) => {
    const newPlayers = [...players];

    // If another player has this color and hasn't locked it, reassign them
    const otherPlayerIndex = newPlayers.findIndex(
      (p, i) => i !== index && p.color === color
    );
    if (otherPlayerIndex !== -1 && !lockedColors.has(otherPlayerIndex)) {
      const usedColors = newPlayers
        .filter((_, i) => i !== otherPlayerIndex && i !== index)
        .map((p) => p.color);
      usedColors.push(color); // The color being taken
      const availableColor = colorOptions.find((c) => !usedColors.includes(c)) || 'red';
      newPlayers[otherPlayerIndex] = { ...newPlayers[otherPlayerIndex], color: availableColor };
    }

    newPlayers[index] = { ...newPlayers[index], color };
    setPlayers(newPlayers);
    setLockedColors(new Set(lockedColors).add(index));
  };

  const clearPlayer = (index: number) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], name: '' };
    setPlayers(newPlayers);
  };

  const addPlayer = () => {
    if (players.length >= MAX_PLAYERS) return;
    const usedColors = players.map((p) => p.color);
    const availableColor = colorOptions.find((c) => !usedColors.includes(c)) || 'red';
    const newPlayerNumber = players.length + 1;
    setPlayers([...players, { name: t('selectPlayers.playerPlaceholder', { number: newPlayerNumber }), color: availableColor }]);
  };

  const removePlayer = (index: number) => {
    if (players.length <= 2) return;
    const newPlayers = players.filter((_, i) => i !== index);
    // Update locked colors indices
    const newLockedColors = new Set<number>();
    lockedColors.forEach((lockedIndex) => {
      if (lockedIndex < index) {
        newLockedColors.add(lockedIndex);
      } else if (lockedIndex > index) {
        newLockedColors.add(lockedIndex - 1);
      }
    });
    setLockedColors(newLockedColors);
    setPlayers(newPlayers);
  };

  const selectedPlayers = players.filter((p) => p.name.trim() !== '');
  const hasSelectedPlayers = selectedPlayers.length > 0;

  const handleStartGame = () => {
    navigation.navigate('Calculate', { players: selectedPlayers });
  };

  const isColorTaken = (color: PlayerColor, currentIndex: number) => {
    return players.some(
      (p, i) => i !== currentIndex && lockedColors.has(i) && p.color === color
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{t('common.back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('selectPlayers.title')}</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        {players.map((player, index) => (
          <View key={index} style={styles.playerRow}>
            <TextInput
              style={styles.input}
              placeholder={t('selectPlayers.playerPlaceholder', { number: index + 1 })}
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
              onPress={() => players.length > 2 ? removePlayer(index) : clearPlayer(index)}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
        {players.length < MAX_PLAYERS && (
          <TouchableOpacity style={styles.addPlayerButton} onPress={addPlayer}>
            <MaterialCommunityIcons name="plus" size={24} color={colors.textPrimary} />
            <Text style={styles.addPlayerText}>{t('selectPlayers.addPlayer')}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, !hasSelectedPlayers && styles.buttonDisabled]}
          onPress={handleStartGame}
          disabled={!hasSelectedPlayers}
        >
          <Text style={styles.buttonText}>{t('selectPlayers.startGame')}</Text>
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
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.cardBorder,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 4,
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
    borderRadius: 4,
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
    borderRadius: 6,
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
  addPlayerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderStyle: 'dashed',
  },
  addPlayerText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
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
