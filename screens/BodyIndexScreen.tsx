import { View, StyleSheet, Text, SafeAreaView, TextInput, Button, Alert, Keyboard, StatusBar, ScrollView } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import InputForm from "../components/InputForm";
import { CalculationContext } from "../components/CalculationContext";
import DataTable from "../components/DataTable";
type Props = NativeStackScreenProps<RootStackParamList, "BodyIndex">;
export default function BodyIndexScreen({ navigation }: Props) {
    const {bmiValue,bmrValue,selectedGender,setSelectedGender, setAge,setHeight,setWeight, calculateBMI, calculateBMR,calculateActivityCalory} = useContext(CalculationContext);

    const [inputSubmitted, setInputSubmitted] = useState(false);
    
    const handleCalculateBMI = () => {
        calculateBMI();
        setAge("");
        setHeight("");
        setWeight("");
        Keyboard.dismiss();
      };
  

      const handleCalculateCalory = () => {
        calculateBMR()
        calculateActivityCalory(); 
        setAge("");
        setHeight("");
        setWeight("");
        setSelectedGender("");
    
        // Set inputSubmitted to true to show the table
        setInputSubmitted(true);
      };

  return (
    <SafeAreaView style={styles.container}>
         <ScrollView style={styles.scrollView}>
        <InputForm />  
        <Button title="Calculate BMI" onPress={handleCalculateBMI} />
        <Text>Your BMI: {bmiValue.toFixed(3)}</Text>
        <Button title="Calculate BMR" onPress={handleCalculateCalory} />
        <Text>Your BMI: {bmrValue.toFixed(3)}</Text>
        <DataTable/>
        </ScrollView>
    </SafeAreaView>
    
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      marginHorizontal: 20,
    },
   
  });