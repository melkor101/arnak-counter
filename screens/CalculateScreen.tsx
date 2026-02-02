import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { colors, playerColors } from '../theme';
import SpriteIcon from '../components/SpriteIcon';

type Props = NativeStackScreenProps<RootStackParamList, 'Calculate'>;

const categoryIcons: Record<string, ImageSourcePropType> = {
  search: require('../assets/search.png'),
};

const scoreCategories = [
  { name: 'Research', icon: 'search' },
  { name: 'Artifacts', iconIndex: 1 },
  { name: 'Idols', iconIndex: 2 },
  { name: 'Items', iconIndex: 3 },
  { name: 'Cards', iconIndex: 4 },
  { name: 'Fear', iconIndex: 5 },
];

export default function CalculateScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { players } = route.params;

  const [scores, setScores] = useState<number[][]>(
    players.map(() => scoreCategories.map(() => 0))
  );

  const updateScore = (playerIndex: number, categoryIndex: number, value: string) => {
    const numValue = parseInt(value) || 0;
    const newScores = [...scores];
    newScores[playerIndex] = [...newScores[playerIndex]];
    newScores[playerIndex][categoryIndex] = numValue;
    setScores(newScores);
  };

  const getPlayerTotal = (playerIndex: number) => {
    return scores[playerIndex].reduce((sum, score) => sum + score, 0);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{t('common.back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('calculate.title')}</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView style={styles.scrollView}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
            {/* Header Row */}
            <View style={styles.tableRow}>
              <View style={styles.categoryCell} />
              {players.map((player, index) => (
                <View key={index} style={styles.playerCell}>
                  <MaterialCommunityIcons
                    name="account"
                    size={24}
                    color={playerColors[player.color]}
                  />
                  <Text style={styles.playerHeaderName} numberOfLines={1}>
                    {player.name}
                  </Text>
                </View>
              ))}
            </View>

            {/* Score Rows */}
            {scoreCategories.map((category, categoryIndex) => (
              <View key={category.name} style={styles.tableRow}>
                <View style={styles.categoryCell}>
                  <SpriteIcon index={category.iconIndex} size={40} />
                </View>
                {players.map((player, playerIndex) => (
                  <View key={playerIndex} style={styles.scoreCell}>
                    <TextInput
                      style={[
                        styles.scoreInput,
                        { borderColor: playerColors[player.color] },
                      ]}
                      keyboardType="numeric"
                      value={scores[playerIndex][categoryIndex].toString()}
                      onChangeText={(value) =>
                        updateScore(playerIndex, categoryIndex, value)
                      }
                      selectTextOnFocus
                    />
                  </View>
                ))}
              </View>
            ))}

            {/* Summary Row */}
            <View style={[styles.tableRow, styles.summaryRow]}>
              <View style={styles.categoryCell}>
                <SpriteIcon index={7} size={40} />
              </View>
              {players.map((player, playerIndex) => (
                <View key={playerIndex} style={styles.scoreCell}>
                  <View
                    style={[
                      styles.totalBox,
                      { backgroundColor: playerColors[player.color] },
                    ]}
                  >
                    <Text style={styles.totalText}>
                      {getPlayerTotal(playerIndex)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>{t('calculate.saveAndFinish')}</Text>
          </TouchableOpacity>
        </View>
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
  table: {
    margin: 15,
  },
  tableRow: {
    flexDirection: 'row',
  },
  categoryCell: {
    width: 60,
    padding: 5,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerCell: {
    width: 80,
    padding: 8,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerHeaderName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 4,
    textAlign: 'center',
  },
  scoreCell: {
    width: 80,
    padding: 8,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreInput: {
    width: 60,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 2,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    paddingVertical: 0,
    paddingHorizontal: 4,
  },
  summaryRow: {
    marginTop: 4,
  },
  totalBox: {
    width: 60,
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.buttonBorder,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
});
