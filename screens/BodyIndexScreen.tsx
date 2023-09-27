import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  Keyboard,
  StatusBar,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import { CalculationContext } from "../components/CalculationContext";
import DataTable from "../components/DataTable";
import { User } from "../models/UserInfor";

type Props = NativeStackScreenProps<RootStackParamList, "BodyIndex">;
export default function BodyIndexScreen({ navigation }: Props) {
  const { bmiValue, bmrValue, calculateBMI, calculateBMR } =
    useContext(CalculationContext);
  const [user, setUser] = useState<User | null>(null);

  const onSubmit = (data: User) => {

    setUser(data);
  };

  useEffect(()=>{
    if (user) {
      calculateBMI(user);
      calculateBMR(user);
    } else {
      console.log("user is null!");
    }
  },[user])
  useEffect(()=>{
    console.log("bmiValue",bmiValue);
  },[bmiValue])

  


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <InputForm
          inputsToShow={["basic", "selecteGender"]}
          onUserInput={onSubmit}
        />
        <View >
        </View> 
      
        <Text style={styles.text}>
        <Text style={styles.boldText}>Your BMI:</Text>{bmiValue.toFixed(3)}</Text>
        <DataTable />
   
        <Text style={styles.text}>
          <Text style={styles.boldText}>* TDEE:</Text>
          Your BMR is still only your energy needs at rest. To determine how
          many calories you expend on a daily basis, you also need to factor in
          your physical activities. This will then give you your total daily
          energy expenditure, or TDEE.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>* Mifflin-St Jeor equation</Text>
          The Mifflin-St Jeor equation[3] is one of the most widely used BMR
          formulas. It appears to provide a closer estimate of true BMR than the
          Harris-Benedict equation.
        </Text>
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

  text: {
    margin: 10,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
});
