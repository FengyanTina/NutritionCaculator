import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import { CalculationContext } from "../components/CalculationContext";
import { User } from "../models/UserInfor";
import BMICategoryTable from "../components/BMICategoryTable";
import { BMICategory, initialBmiData } from "../models/BMI";

type Props = NativeStackScreenProps<RootStackParamList, "CalculateBMI">;
export default function CalculateBMI({ navigation }: Props) {
  const { bmiValue, calculateWeightRange, calculateBMI } =
    useContext(CalculationContext);
  const [user, setUser] = useState<User | null>(null);
  const [weightRangeData, setWeightRangeData] =
    useState<BMICategory[]>(initialBmiData);

  const onSubmit = (data: User) => {
    setUser(data);
  };

  useEffect(() => {
    if (user) {
      calculateBMI(user);
      const weightRange = calculateWeightRange(user);
      setWeightRangeData(weightRange);
    } else {
      console.log("user is null!");
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <InputForm inputsToShow={["height","weight","age"]} onUserInput={onSubmit} />
        <View></View>
        <View style={styles.bmiContainer}>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Your BMI *:</Text>{" "}
          </Text>
          <View style={styles.bmiValueBox}>
            <Text style={styles.bmiValue}>{bmiValue.toFixed(3)}</Text>
          </View>
        </View>
        <BMICategoryTable weightRangeData={weightRangeData} />
        <Text style={styles.text}>
          <Text style={styles.boldText}>* BMI:</Text>
          Body mass index, or BMI, is one of the most widely used metrics to
          measure health status. It is quick and easy to calculate to estimate
          one’s weight status based on their height.
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
  bmiContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bmiValueBox: {
    backgroundColor: "#e0e0e0",
    padding: 5,
    borderRadius: 5,
  },
  bmiValue: {
    fontWeight: "bold",
  },
});
