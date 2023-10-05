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
import {
  IBWFormula,
  calculateDevineIBW,
  calculateHamwiIBW,
  calculateMillerIBW,
  calculateRobinsonIBW,
  initialIBWData,
} from "../models/IBW";
import { Picker } from "@react-native-picker/picker";

export default function IBWInputForm() {
  const [height, setHeight] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [updatedIBWData, setUpdatedIBWData] = useState(initialIBWData);
  const [error, setError] = useState("");

  const handleHeightBlur = () => {
    if (!height.trim()) {
      setError("Please enter a valid height.");
    } else if (!/^\d+$/.test(height)) {
      setError("Please enter a valid number.");
    } else {
      setError("");
    }
  };

  const handleGenderBlur = () => {
    if (!gender) {
      setError("Please select a gender.");
    }
  };

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
  //on submit the Caculate button
  const handleCalculate = () => {
    if (!height || !gender) {
      setError("Please enter both height and gender.");
      return;
    }
    const heightNumber = parseFloat(height);
    setError("");
    calculateIBW(heightNumber, gender, initialIBWData);

    setHeight("");
    setGender("");
  };

  return (
    <SafeAreaView>
      <View>
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
              onBlur={handleHeightBlur}
              keyboardType="numeric"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <View style={styles.rowContainer}>
              <Text style={styles.text}> Select Gender:</Text>
              <Picker
                style={{ height: 50, width: 150 }}
                selectedValue={gender}
                onValueChange={(itemValue) => {
                  setGender(itemValue);
                }}
                onBlur={handleGenderBlur}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Male" value="male" />
              </Picker>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.submitButton}>
          <View>
            <Button onPress={handleCalculate} title="Calculate" />
          </View>
        </View>
        <View style={styles.listTitleContainer}>
          <Text style={styles.listTitle}>
            Ideal Weight using Different Formula
          </Text>
        </View>

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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  errorText: {
    color: "red",
  },
  listTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 15,
    width: "85%",
    marginLeft: 25,
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

    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    margin: 15,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    padding: 5,
    flex: 1,
  },
  listTitle: {
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
