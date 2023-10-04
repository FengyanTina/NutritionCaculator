import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput,StyleSheet } from "react-native";
import { RootStackParamList } from "../App";
import * as Notifications from 'expo-notifications';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


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

type Props = NativeStackScreenProps<RootStackParamList, "FoodNutritionCalculator">;
export default function FoodNutritionCalculatorScreen() {
  const [nutritionData, setNutritionData] = useState<NutritionData>();
  const [query, setQuery] = useState<string>("");

  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

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
            const notificationContent = {
              title: 'Nutrition Data',
              body: `
                Name: ${data.name}
                Calories: ${data.calories} kcal
                Protein: ${data.protein_g} g
                Carbohydrates: ${data.carbohydrates_total_g} g
                Sugar: ${data.sugar_g} g
                Fat: ${data.fat_total_g} g
                Fat(Saturated): ${data.fat_saturated_g} g
                Cholesterol: ${data.cholesterol_mg} mg
                Fiber: ${data.fiber_g} g
                Potassium: ${data.potassium_mg} mg
                Sodium: ${data.serving_size_g} mg
              `,
            };
      
            Notifications.presentNotificationAsync(notificationContent);

      } else {
        console.error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchNutritionData();
  }, []);

  return (
    <View  style={styles.inputContainer}>
      <TextInput
      style={styles.input}
        placeholder="Enter food to search"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <View style={styles.submitButton}>
      <Button onPress={fetchNutritionData} title="Send" />
      </View>

      <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Animated.View
        style={[{ width: 100, height: 80, backgroundColor: 'black', margin: 30 }, style]}
      />
      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />
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
  );
}
  const styles = StyleSheet.create({
    inputContainer:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
    },

    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      marginTop:30,
      width: "65%", 
    height: 40,
    margin: 12,
        
      
    },
   
    submitButton: {
        margin: 20,
        width: "65%",
      },
      dataContainer:{
        marginTop:20,
      }
  });