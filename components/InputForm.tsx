import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useCalculationContext } from "./CalculationContext";
import { User } from "../models/UserInfor";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
interface InputFormProps {
  inputsToShow: string[];
  onUserInput: (data: User) => void;
}
export default function InputForm({
  inputsToShow,
  onUserInput,
}: InputFormProps) {
  const {
    selectedActivityLevel,
    setSelectedActivityLevel,
    selectedNutritionGoal,
    setSelectedNutritionGoal,
  } = useCalculationContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = (data: User) => {
    // Call the callback function to handle user input
    onUserInput(data);
  };
  // const {
  //     register,
  //     formState: { errors },
  //     handleSubmit,
  //   } = useForm<User>();
  //   const onSubmit: SubmitHandler<User> = data => console.log(data);

  //   const [age, setAge] = useState("");
  //   const [height, setHeight] = useState("");
  //   const [weight, setWeight] = useState("");
  //   const [selectedGender, setSelectedGender] = useState("");

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        {inputsToShow.includes("basic") && (
          <View style={styles.inputContainer}>
            <Controller
              name="age"
              control={control}
              defaultValue=""
              rules={{ required: "Age is required." }}
              render={({ field }) => (
                <>
                  <TextInput
                    style={styles.input}
                    {...field}
                    placeholder="Enter Your Age"
                    keyboardType="numeric"
                  />
                  <Text style={styles.errorText}>{errors.age?.message}</Text>
                </>
              )}
            />

            <Controller
              name="weight"
              control={control}
              defaultValue=""
              rules={{ required: "weight is required." }}
              render={({ field }) => (
                <>
                  <TextInput
                    style={styles.input}
                    {...field}
                    placeholder="Enter Your Age"
                    keyboardType="numeric"
                  />
                  <Text style={styles.errorText}>{errors.age?.message}</Text>
                </>
              )}
            />
            <Controller
              name="height"
              control={control}
              defaultValue=""
              rules={{ required: "height is required." }}
              render={({ field }) => (
                <>
                  <TextInput
                    style={styles.input}
                    {...field}
                    placeholder="Enter Your Age"
                    keyboardType="numeric"
                  />
                  <Text style={styles.errorText}>{errors.age?.message}</Text>
                </>
              )}
            />

            {/* <TextInput
            style={styles.input}
            value={age}
            error={!!errors.age}
    
            helperText={errors.age?.message}
            margin="normal"
            {...register("age", { required: "Title is required." })}
            onChangeText={(val) => setAge(val)}
            placeholder="Enter Your Age"
            keyboardType="numeric"
         /> */}

            {/* <TextInput
              style={styles.input}
              value={height}
              onChangeText={(val) => setHeight(val)}
              placeholder="Enter Your Height in (cm)"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={(val) => setWeight(val)}
              placeholder="Enter Your Weight in (Kg)"
              keyboardType="numeric"
            /> */}
          </View>
        )}
      </TouchableWithoutFeedback>
      {inputsToShow.includes("selecteGender") && (
        <View style={styles.pickerContainer}>
          <Controller
            name="selectedGender"
            control={control}
            defaultValue=""
            rules={{ required: "Please select a gender." }} // Add a required rule
            render={({ field }) => (
              <>
                <Text style={styles.text}> Select Gender: </Text>
                <Picker
                  selectedValue={field.value}
                  onValueChange={(itemValue) => field.onChange(itemValue)}
                >
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
                <Text style={styles.errorText}>
                  {errors.selectedGender?.message}
                </Text>
              </>
            )}
          />

          {/* <Text style={styles.text}> Select Gender: </Text>
          <Picker
            selectedValue={selectedGender}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGender(itemValue)
            }
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="female" value="female" />
            <Picker.Item label="male" value="male" />
          </Picker> */}
        </View>
      )}
      {inputsToShow.includes("selecteActivityLevel") && (
        <View style={styles.pickerContainer}>
          <Text style={styles.text}> Activity Level: </Text>
          <Picker
            selectedValue={selectedActivityLevel}
            style={{ height: 50, width: 150, flexWrap: "wrap" }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedActivityLevel(itemValue)
            }
          >
            <Picker.Item label="Select Activity Level" value="" />
            <Picker.Item
              label="Little to no exercise"
              value="Little to no exercise"
            />
            <Picker.Item
              label="Light exercise 1-2 days/week"
              value="Light exercise 1-2 days/week"
            />
            <Picker.Item
              label="Moderate exercise 3-5 days/week "
              value="Moderate exercise 3-5 days/week "
            />
            <Picker.Item
              label="Hard exercise 6-7 days/week "
              value="Hard exercise 6-7 days/week"
            />
            <Picker.Item
              label="Hard daily exercise and physical job or two times a day training"
              value="Hard daily exercise and physical job,or two times a day training"
            />
          </Picker>
        </View>
      )}
      {inputsToShow.includes("selecteNutritionGoal") && (
        <View style={styles.pickerContainer}>
          <Text style={styles.text}> Nutrition Goal: </Text>
          <Picker
            selectedValue={selectedNutritionGoal}
            style={{ height: 50, width: 150, alignSelf: "stretch" }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedNutritionGoal(itemValue)
            }
          >
            <Picker.Item label="Select Nutrition Goal" value="" />
            <Picker.Item
              style={{ flexWrap: "wrap" }}
              label="maintain current weight"
              value="maintain current weight"
            />
            <Picker.Item
              label="mild weight loss, goal: ½ lb (¼ kg) per week"
              value="mild weight loss, goal: ½ lb (¼ kg) per week"
            />
            <Picker.Item
              label="moderate weight loss, goal: 1 lb (½ kg) per week"
              value="moderate weight loss, goal: 1 lb (½ kg) per week"
            />
            <Picker.Item
              label="heavy weight loss, goal: 2 lb (1 kg) per week"
              value="heavy weight loss, goal: 2 lb (1 kg) per week"
            />
            <Picker.Item
              label="build muscle or gain weight"
              value="build muscle or gain weight"
            />
          </Picker>
        </View>
      )}
      <View></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerItem: {
    flexWrap: "wrap",
  },
  input: {
    height: 40,
    width: "65%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
});
