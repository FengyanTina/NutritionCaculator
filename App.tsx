import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import BodyIndexScreen from './screens/BodyIndexScreen';
import MacronutrientsScreen from './screens/MacronutrientsScreen';
import WeightManagerScreen from './screens/WeightManagerScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
        <StatusBar style='auto'/>
        <Stack.Navigator initialRouteName='Home'>
           <Stack.Screen name = "Home" component = {HomeScreen}/> 
           <Stack.Screen name = "BodyIndex" component = {BodyIndexScreen}/> 
          <Stack.Screen name = "Macronutrients" component = {MacronutrientsScreen}/>
          <Stack.Screen name = "WeightManager" component = {WeightManagerScreen}/> 
        </Stack.Navigator>  
    </NavigationContainer>
    </SafeAreaProvider>

  );
}


