import { View, StyleSheet, Text, SafeAreaView, TextInput, Button, Alert, Keyboard } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import InputForm from "../components/InputForm";
import { CalculationContext } from "../components/CalculationContext";
type Props = NativeStackScreenProps<RootStackParamList, "BodyIndex">;
export default function BodyIndexScreen({ navigation }: Props) {
    const {bmiValue, setAge,setHeight,setWeight, calculateBMI} = useContext(CalculationContext);
    
    const handleCalculateBMI = () => {
        calculateBMI();
        setAge("");
        setHeight("");
        setWeight("");
        Keyboard.dismiss();
      };
  return (
    <SafeAreaView>
        <InputForm />  
        <Button title="Calculate BMI" onPress={handleCalculateBMI} />
        <Text>Your BMI: {bmiValue.toFixed(3)}</Text>
    </SafeAreaView>
  );
}