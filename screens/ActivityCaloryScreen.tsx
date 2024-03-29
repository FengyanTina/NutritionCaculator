import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Keyboard,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityMETFactor,
  initialActivityMETFactor,
} from "../models/ActivityMET";

type Props = NativeStackScreenProps<RootStackParamList, "ActivityCalory">;
export default function ActivityCaloryScreen({ navigation }: Props) {
  const [weight, setWeight] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [updatedMETFactor, setUpdatedMETFactor] = useState(
    initialActivityMETFactor
  );
  const [error, setError] = useState("");

  const handleWeightBlur = () => {
    if (!weight.trim()) {
      setError("Please enter a valid weight.");
    } else if (!/^\d+$/.test(weight)) {
      setError("Please enter a valid number.");
    } else {
      setError("");
    }
  };

  const handleTimeBlur = () => {
    if (!time.trim()) {
      setError("Please enter a valid time.");
    } else if (!/^\d+$/.test(time)) {
      setError("Please enter a valid number.");
    } else {
      setError("");
    }
  };

  const handleCalculate = () => {
    if (!weight || !time) {
      setError("Please enter both weight and time.");
      return;
    }
    setError("");
    const weightNumber = parseFloat(weight);
    const timeNumber = parseFloat(time);
    calculateCactivityCalory(
      weightNumber,
      timeNumber,
      initialActivityMETFactor
    );
    setWeight("");
    setTime("");
  };
  const calculateCactivityCalory = (
    userWeight: number,
    userTime: number,
    initialActivityMETFactor: ActivityMETFactor[]
  ) => {
    if (weight && time) {
      const updatedMET = initialActivityMETFactor.map((cal) => ({
        ...cal,
        EnergyValue: (userTime * cal.METFactor * 3.5 * userWeight) / 200,
      }));
      setUpdatedMETFactor(updatedMET);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your weight (kg)"
                value={weight}
                onChangeText={(text) => setWeight(text)}
                onBlur={handleWeightBlur}
                keyboardType="numeric"
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
              <TextInput
                style={styles.input}
                placeholder="Enter Activity Time(minutes)"
                value={time}
                onChangeText={(text) => setTime(text)}
                onBlur={handleTimeBlur}
                keyboardType="numeric"
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
            <View style={styles.submitButton}>
              <Button onPress={handleCalculate} title="Calculate" />
            </View>
            <View style={styles.listTitleContainer}>
              <Text style={styles.listTitle}>Activity and Calories Burned</Text>
            </View>

            <View style={styles.flashList}>
              {updatedMETFactor.map((item) => {
                return (
                  <View key={item.Name} style={styles.listItemContainer}>
                    <Text>{item.Name}</Text>
                    <Text>{item.EnergyValue.toFixed(0)}Cal</Text>
                  </View>
                );
              })}
            </View>

            <Text style={styles.text}>
              *Being health-conscious means that you need to know how many
              calories you burn in a day. Figuring out how much energy you
              expend any given day can help you determine how many calories you
              need to consume to either maintain a healthy weight
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  listTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  submitButton: {
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    width: "80%",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  listName: {
    marginRight: 15,
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
    flexDirection: "row", // Display items in a row
    alignItems: "center", // Vertically center items
    justifyContent: "space-between", // Add space between Value and Formula
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

function setValidationErrors(arg0: string[]) {
  throw new Error("Function not implemented.");
}
