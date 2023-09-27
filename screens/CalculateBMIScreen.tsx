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
import BMICategoryTable from "../components/BMICategoryTable";
  
  type Props = NativeStackScreenProps<RootStackParamList, "CalculateBMI">;
  export default function CalculateBMI({ navigation }: Props) {
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
            inputsToShow={["basic"]}
            onUserInput={onSubmit}
          />
          <View >
          </View> 
        
          <Text style={styles.text}>
          <Text style={styles.boldText}>Your BMI *:</Text>{bmiValue.toFixed(3)}
          </Text>
        <BMICategoryTable/>
          <Text style={styles.text}>
            <Text style={styles.boldText}>* BMI:</Text>
            Body mass index, or BMI, is one of the most widely used metrics to measure health status. It is quick and easy to calculate to estimate one’s weight status based on their height.
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
  