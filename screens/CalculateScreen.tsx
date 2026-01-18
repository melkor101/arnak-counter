import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Calculate'>;

export default function CalculateScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calculate Score</Text>
        <View style={styles.headerSpacer} />
      </View>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Calculate Score</Text>
          <Text style={styles.subtitle}>Enter scores for each player</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Save & Finish</Text>
        </TouchableOpacity>
      </View>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.cardBackground,
    padding: 30,
    borderRadius: 15,
    marginBottom: 40,
    borderWidth: 3,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.buttonBorder,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
});
