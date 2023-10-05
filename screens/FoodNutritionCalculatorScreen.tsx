import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { RootStackParamList } from "../App";
import * as Notifications from "expo-notifications";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type NutritionData = {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

type Props = NativeStackScreenProps<
  RootStackParamList,
  "FoodNutritionCalculator"
>;
export default function FoodNutritionCalculatorScreen() {
  const [nutritionData, setNutritionData] = useState<NutritionData>();
  const [query, setQuery] = useState<string>("");

  const fetchNutritionData = async () => {
    const apiKey = "nTwFLtWWPI2RvXmkw0h1Vg==MIT4cmxn84zhDJHb";

    try {
      const response = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${query}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": apiKey,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setNutritionData(data.items[0]);
        if (data.items[0]) {
          // Set the nutrition data
          setNutritionData(data.items[0]);
          // Schedule the notification
          const notificationContent = {
            title: "Nutrition Data",
            body: 'Nutrition Data has been fetched from "calorieninjas.com"',
          };

          Notifications.scheduleNotificationAsync({
            content: notificationContent,
            trigger: null,
          });
        }
      } else {
        console.error("Failed to fetch nutrition data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchNutritionData();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter food to search"
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
        <View style={styles.submitButton}>
          <Button onPress={fetchNutritionData} title="Send" />
        </View>

        {nutritionData ? (
          <View style={styles.dataContainer}>
            <Text>Nutrition Data </Text>
            <Text>Name: {nutritionData.name}</Text>
            <Text>Calories: {nutritionData.calories} kcal</Text>
            <Text>Protein: {nutritionData.protein_g} g</Text>
            <Text>Carbohydrates: {nutritionData.carbohydrates_total_g} g</Text>
            <Text>Sugar: {nutritionData.sugar_g} g</Text>
            <Text>Fat: {nutritionData.fat_total_g} g</Text>
            <Text>Fat(Saturated): {nutritionData.fat_saturated_g} g</Text>
            <Text>Cholesterol: {nutritionData.cholesterol_mg} mg</Text>
            <Text>Fiber: {nutritionData.fiber_g} g</Text>
            <Text>Potassium: {nutritionData.potassium_mg} mg</Text>
            <Text>Sodium: {nutritionData.serving_size_g} mg</Text>
          </View>
        ) : (
          <Text>No nutrition data available</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 30,
    width: "65%",
    height: 40,
    margin: 12,
  },

  submitButton: {
    margin: 20,
    width: "65%",
  },
  dataContainer: {
    marginTop: 20,
  },
});
