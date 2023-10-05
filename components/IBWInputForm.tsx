import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
import { z } from "zod";
import {
  IBWFormula,
  calculateDevineIBW,
  calculateHamwiIBW,
  calculateMillerIBW,
  calculateRobinsonIBW,
  initialIBWData,
} from "../models/IBW";
import { Picker } from "@react-native-picker/picker";

const InputSchema = z.object({
  height: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "Height must be a number",
    })
    .refine((value) => value.length > 0, {
      message: "Height is required",
    }),
  gender: z.string().refine((value) => value.length > 0, {
    message: "Gender is required",
  }),
});

export default function IBWInputForm() {
  const [height, setHeight] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [updatedIBWData, setUpdatedIBWData] = useState(initialIBWData);
  const [validationErrors, setValidationErrors] = useState<string[] | null>(
    null
  );
  const calculateIBW = (
    height: number,
    selectedGender: string,
    initialIBWData: IBWFormula[]
  ) => {
    const updatedData: IBWFormula[] = initialIBWData.map((formula) => {
      let ibwValue: number = 0;

      switch (formula.Formula) {
        case "Robinson Formula[1] (1983)":
          ibwValue = calculateRobinsonIBW(height, selectedGender) || 0;
          break;
        case "Devine Formula[3] (1974)":
          ibwValue = calculateDevineIBW(height, selectedGender) || 0;
          break;
        case "Hamwi Formula[4] (1964)":
          ibwValue = calculateHamwiIBW(height, selectedGender) || 0;
          break;
        case "Miller Formula[2] (1983)":
          ibwValue = calculateMillerIBW(height, selectedGender) || 0;
          break;
      }
      return {
        ...formula,
        Value: ibwValue,
      };
    });
    setUpdatedIBWData(updatedData);
  };

  const handleCalculate = () => {
    if (!height || !gender) {

      setValidationErrors(["Please enter both height and gender."]);
      return;
    }

    setValidationErrors(null);

    calculateIBW(Number(height), gender, initialIBWData);

    setHeight("");
    setGender("");
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Height (cm)"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <Picker
            style={{ height: 50, width: 150 }}
            selectedValue={gender}
            onValueChange={(itemValue) => {
              setGender(itemValue);
            }}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Male" value="male" />
          </Picker>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.submitButton}>
        <View>
          <Button onPress={handleCalculate} title="Calculate" />
        </View>
      </View>
      <Text style={styles.ibwValue}>Ideal Weight using Different Formula</Text>
      <View style={styles.flashList}>
        <FlatList
          data={updatedIBWData}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <Text>{item.Formula}:</Text>
              <Text>{item.Value.toFixed(0)}kg</Text>
            </View>
          )}
          keyExtractor={(item) => item.Formula}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.text}>
          <Text style={styles.boldText}>* Formulas:</Text>
          Several different formulas have been developed over the years to
          estimate ideal body weight.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>
            * Ideal Body Weight: A Range Rather Than One Number
          </Text>
          These formulas do not take into account other factors, such as lean
          body mass, genetic makeup, physical activity, or age.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>
            * Ideal Body Weight: A Range Rather Than One Number
          </Text>
          These formulas do not take into account other factors, such as lean
          body mass, genetic makeup, physical activity, or age.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>
            * Ideal Body Weight: A Range Rather Than One Number
          </Text>
          These formulas do not take into account other factors, such as lean
          body mass, genetic makeup, physical activity, or age.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>
            * Ideal Body Weight: A Range Rather Than One Number
          </Text>
          These formulas do not take into account other factors, such as lean
          body mass, genetic makeup, physical activity, or age.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>
            * Ideal Body Weight: A Range Rather Than One Number
          </Text>
          These formulas do not take into account other factors, such as lean
          body mass, genetic makeup, physical activity, or age.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
  },
  scrollView: {
    marginHorizontal: 40,
  },
  submitButton: {
    margin: 10,
    width: "100%",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "65%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  flashList: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  listItemContainer: {
    flexDirection: "row", // Display items in a row
    alignItems: "center", // Vertically center items
    justifyContent: "space-between", // Add space between Value and Formula
    marginBottom: 5,
    padding: 5,
    flex: 1,
  },
  ibwValue: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 15,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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
    justifyContent: "center",
  },
  ibwValueBox: {
    backgroundColor: "#e0e0e0",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
});
