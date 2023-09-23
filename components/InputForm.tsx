import { View, StyleSheet, Text, SafeAreaView, TextInput, Button, Alert } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
type Props = NativeStackScreenProps<RootStackParamList, "BodyIndex">;
export default function InputForm() {
  const [number, onChangeNumber] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Enter Your Age"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Enter Your Height in cm"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Enter Your Weight in Kg"
          keyboardType="numeric"
        />
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.text}> Select Gender: </Text>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="female" value="female" />
            <Picker.Item label="male" value="male" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.text}> Activity Level: </Text>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150,flexWrap:"wrap" }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Little to no exercise" value="Little to no exercise" />
            <Picker.Item label="Light exercise 1-2 days/week" value="Light exercise 1-2 days/week" />
            <Picker.Item label="Moderate exercise 3-5 days/week " value="Moderate exercise 3-5 days/week " />
            <Picker.Item label="Hard exercise 6-7 days/week " value="Hard exercise 6-7 days/week" />
            <Picker.Item 
            label="Hard daily exercise and physical job or two times a day training" 
            value="Hard daily exercise and physical job,or two times a day training" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.text}> Nutrition Goal: </Text>
          <Picker
           
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 ,alignSelf:'stretch'}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item  style={{ flexWrap:'wrap' }} label="maintain current weight" value="maintain current weight" />
            <Picker.Item label="mild weight loss, goal: ½ lb (¼ kg) per week" value="mild weight loss, goal: ½ lb (¼ kg) per week" />
            <Picker.Item label="moderate weight loss, goal: 1 lb (½ kg) per week" value="moderate weight loss, goal: 1 lb (½ kg) per week" />
            <Picker.Item label="heavy weight loss, goal: 2 lb (1 kg) per week" value="heavy weight loss, goal: 2 lb (1 kg) per week" />
            <Picker.Item label="build muscle or gain weight" value="build muscle or gain weight" />
          </Picker>
        </View>
        <View>
        <Button
        title="Submit"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
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
    justifyContent: 'center',
    
  },
  pickerItem:{
    
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
});
