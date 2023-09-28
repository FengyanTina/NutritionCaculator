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

import { Controller,  useForm } from "react-hook-form";
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
    reset,
  } = useForm<User>({
    defaultValues: defaultUser(),
  });

  const sendForm = handleSubmit((data) => {
    // console.log("sendForm", data);
    onUserInput(data);
    reset();
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
              name="age"
              control={control}
              rules={{ required: "Age is required." }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
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
              rules={{ required: "weight is required." }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter Your Weight"
                    keyboardType="numeric"
                  />
                  <Text style={styles.errorText}>{errors.weight?.message}</Text>
                </>
              )}
            />
            <Controller
              name="height"
              control={control}
              rules={{ required: "height is required." }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter Your Height"
                    keyboardType="numeric"
                  />
                  <Text style={styles.errorText}>{errors.height?.message}</Text>
                </>
              )}
            />
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
            render={({ field: { onChange, onBlur, value } }) => (
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
                  <Picker.Item label="Other" value="other" />
                </Picker>
                <Text style={styles.errorText}>
                  {errors.selectedGender?.message}
                </Text>
              </>
            )}
          />
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
