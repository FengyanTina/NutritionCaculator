import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "../models/UserInfor";
import { initialBmiData,BMICategory } from "../models/BMI";


const BMICategoryTable = () => {
    const [bmiCategory,setBmiCategory] = useState(initialBmiData)
    
    const calculateWeightRange = (data: User, initialBmiData: BMICategory[]) => {
        const heightInCm = parseFloat(data.height);
        const weightInKg = parseFloat(data.weight);
    
        // Calculate the low and high values for weight range
        const updatedBMIData = initialBmiData.map((bmi) => ({
          ...bmi,
          WeightRangeHigh: heightInCm * bmi.BMIHighValue,
          WeightRangeLow: weightInKg * bmi.BMILowValue,
        }));
    
        setBmiCategory(updatedBMIData) ;
      };
  
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={styles.header}>BMI Classification</Text>
        <Text style={styles.header}>Weight Range</Text>
        
      </View>
      {bmiCategory.map((category) => (
        
        <View style={styles.tableRow} key={category.BMIClassification}>
                <Text style={styles.cell}>{category.BMIClassification}</Text>
          <Text style={styles.cell}>{category.WeightRangeLow}-{category.WeightRangeHight}</Text>
       
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  header: {
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

export default BMICategoryTable;
