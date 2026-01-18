import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  HomeScreen,
  SelectPlayersScreen,
  CalculateScreen,
  HistoryScreen,
} from './screens';

export type RootStackParamList = {
  Home: undefined;
  SelectPlayers: undefined;
  Calculate: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SelectPlayers" component={SelectPlayersScreen} />
          <Stack.Screen name="Calculate" component={CalculateScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
