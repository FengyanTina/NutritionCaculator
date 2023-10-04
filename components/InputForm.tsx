import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useCalculationContext } from "./CalculationContext";
import { User, defaultUser } from "../models/UserInfor";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

const UserSchema: z.ZodType<User> = z.object({
  age: z.coerce
    .number({
      required_error: "You must enter a number",
      invalid_type_error: "You must enter a number",
    })
    .positive({ message: "The number must be positive." })
    .int({ message: "Age must be a whole number." }),
  weight: z.coerce
    .number({
      required_error: "You must enter a valid weight",
      invalid_type_error: "You must enter a number",
    })
    .min(0, { message: "Weight must be positive." })
    .positive({ message: "Weight must be positive." }),
  height: z.coerce
    .number({
      required_error: "Enter a valid height",
      invalid_type_error: "Height must be a number",
    })
    .positive({ message: "Height must be positive." })
    .min(0, { message: "Height must be positive." }),

  selectedGender: z.union([z.literal("female"), z.literal("male")]).optional(),
//   activityTime: z.coerce
//     .number({
//       required_error: "Du måste ange en giltigt vikt",
//       invalid_type_error: "Du måste ange ett riktigt num",
//     })
//     .positive({ message: "Höjden måste vara positivt." })
//     .min(0, { message: "Höjden måste vara positivt." })
//     .optional(),
});

interface InputFormProps {
  inputsToShow: string[];
  onUserInput: (data: User) => void;
}

export default function InputForm({
  inputsToShow,
  onUserInput,
}: InputFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
    defaultValues: defaultUser(),
  });
  const sendForm = handleSubmit((data) => {
    onUserInput(data);
    reset();
    clearErrors();
  });

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
              control={control}
              render={({ field: { onBlur, value, onChange } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  placeholder="Enter Your Age"
                  value={value?.toString()}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
              name="age"
            />
            <Text style={styles.errorText}>{errors.age?.message}</Text>
            <Controller
              control={control}
              render={({ field: { onBlur, value, onChange } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  placeholder="Enter Your Height (cm)"
                  value={value?.toString()}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
              name="height"
            />
            <Text style={styles.errorText}>{errors.height?.message}</Text>
            <Controller
              control={control}
              render={({ field: { onBlur, value, onChange } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  placeholder="Enter Your Weight (kg)"
                  value={value?.toString()}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
              name="weight"
            />
            <Text style={styles.errorText}>{errors.weight?.message}</Text>
          </View>
        )}
      </TouchableWithoutFeedback>
      {inputsToShow.includes("selecteGender") && (
        <View style={styles.pickerContainer}>
          <Controller
            name="selectedGender"
            control={control}
            defaultValue=""
            rules={{ required: "Please select a gender." }}
            render={({ field: { onChange, value } }) => (
              <>
                <Text style={styles.text}> Select Gender: </Text>
                <Picker
                  style={{ height: 50, width: 150 }}
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                >
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Male" value="male" />
                </Picker>
                <Text style={styles.errorText}>
                  {errors.selectedGender?.message}
                </Text>
              </>
            )}
          />
        </View>
      )}
      {/* {inputsToShow.includes("height") && (
          <View style={styles.inputContainer}>
           
            <Controller
              control={control}
              render={({ field: { onBlur, value, onChange } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  placeholder="Enter Your Height (cm)"
                  value={value?.toString()}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
              name="height"
            />
            <Text style={styles.errorText}>{errors.height?.message}</Text>
            
          </View>
        )} */}
        {/* {inputsToShow.includes("weight") && (
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onBlur, value, onChange } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  placeholder="Enter Your Weight (kg)"
                  value={value?.toString()}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
              name="weight"
            />
            <Text style={styles.errorText}>{errors.weight?.message}</Text>
          </View>
        )} */}
      {/* {inputsToShow.includes("selecteActivityLevel") && (
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
      )} */}
      <View>
        <View style={styles.submitButton}>
          <Button onPress={sendForm} title="Send" />
        </View>
      </View>
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
  submitButton: {
    margin: 10,
    width: "100%",
    alignContent: "center",
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
