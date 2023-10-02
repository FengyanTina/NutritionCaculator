import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import InputForm from "../components/InputForm";
import DataTable from "../components/DataTable";
import { useContext, useEffect, useState } from "react";
import { User } from "../models/UserInfor";
import { CalculationContext } from "../components/CalculationContext";
import {IBWFormula, initialIBWData } from "../models/IBW";


type Props = NativeStackScreenProps<RootStackParamList, "IdealBodyWeight">;
export default function IdealBodyWeightScreen() {
    const { ibwValue, calculateHamwiIBW, calculateIBW,calculateDevineIBW,calculateMillerIBW } =
    useContext(CalculationContext);
  const [user, setUser] = useState<User>();
  const [ibwData, setIbwData] = useState<IBWFormula>();

  const onSubmit = (data: User) => {
    setUser(data);
  };

  useEffect(() => {
    if (user ) {
        
    calculateIBW(user,initialIBWData)
    } else {
      console.log("user is null!");
    }
  }, [user]);
//   useEffect(() => {
//     console.log("bmiValue", bmiValue);
//   }, [bmiValue]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <InputForm
          inputsToShow={["basic", "selecteGender"]}
          onUserInput={onSubmit}
        />
        <View></View>
        <View style={styles.bmiContainer}>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Your BMR *:</Text>{" "}
          </Text>
          <View style={styles.ibwValueBox}>
            <Text style={styles.ibwValue}>
            Ideal Weight using Various Formulas
            </Text>
            <FlashList
      data={DATA}
      renderItem={({ item }) => <Text>{item.title}</Text>}
      estimatedItemSize={200}
    />
          </View>
        </View>

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
  bmiContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ibwValueBox: {
    backgroundColor: "#e0e0e0",
    padding: 5,
    borderRadius: 5,
  },
  ibwValue: {
    fontWeight: "bold",
  },
});

