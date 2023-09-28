import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "../models/UserInfor";
import { initialBmiData,BMICategory } from "../models/BMI";


const BMICategoryTable = ({ weightRangeData }: { weightRangeData: BMICategory[] }) => {
 
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={styles.header}>BMI Classification</Text>
        <Text style={styles.header}>Weight Range</Text>
        
      </View>
      {weightRangeData.map((category) => (
        
        <View style={styles.tableRow} key={category.BMIClassification}>
        <Text style={styles.cell}>{category.BMIClassification}</Text>
          <Text style={styles.cell}>
          {category.BMIClassification === 'Underweight(<18.5)' && `<${category.WeightRangeHighValue.toFixed(1)}`}
      {(category.BMIClassification === 'Healthy Weight(18.5 – 24.9)' || category.BMIClassification === 'overweight (25.0 - 29.9)') && `${category.WeightRangeLowValue.toFixed(1)} - ${category.WeightRangeHighValue.toFixed(1)}`}
      {(category.BMIClassification === 'class I obesity (30.0 - 34.9)' || category.BMIClassification === 'class II obesity (35.0 - 39.9)') && `${category.WeightRangeLowValue.toFixed(1)} - <${category.WeightRangeHighValue.toFixed(1)}`}
      {category.BMIClassification === 'class III obesity (≥ 40.0)' && `>${category.WeightRangeLowValue.toFixed(1)}`}
            </Text>
       
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
