import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import CaloryIndexScreen from './screens/BodyIndexScreen';
import MacronutrientsScreen from './screens/MacronutrientsScreen';
import WeightManagerScreen from './screens/WeightManagerScreen';
import IdealBodyWeightScreen from './screens/IdealBodyWeightScreen';
import { HomeNavigationProvider } from './components/HomeNavigationContext';
import { CalculationContext, CalculationProvider } from './components/CalculationContext';
import CalculateBMIScreen from './screens/CalculateBMIScreen';

export type RootStackParamList = {
    Home: undefined;
    BodyIndex:undefined;
    Macronutrients:undefined;
    WeightManager:undefined;
    IdealBodyWeight:undefined;
    CalculateBMI:undefined;
}
const RootStack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <SafeAreaProvider>
        <CalculationProvider>
      <HomeNavigationProvider>
    <NavigationContainer>
        <StatusBar style='auto'/>
        <RootStack.Navigator initialRouteName='Home'>
           <RootStack.Screen name = "Home" component = {HomeScreen}/> 
           <RootStack.Screen name = "BodyIndex" component = {CaloryIndexScreen}/> 
          <RootStack.Screen name = "Macronutrients" component = {MacronutrientsScreen}/>
          <RootStack.Screen name = "WeightManager" component = {WeightManagerScreen}/> 
          <RootStack.Screen name = "IdealBodyWeight" component = {IdealBodyWeightScreen}/> 
          <RootStack.Screen name = "CalculateBMI" component = {CalculateBMIScreen}/> 
        </RootStack.Navigator>  
    </NavigationContainer>
    </HomeNavigationProvider>
    </CalculationProvider>
    </SafeAreaProvider>

  );
}


