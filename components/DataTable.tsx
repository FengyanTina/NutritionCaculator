import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCalculationContext } from "./CalculationContext";

const DataTable = () => {
  const { activityLevelData } = useCalculationContext();

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={styles.header}>Activity Level</Text>
        <Text style={styles.header}>Example</Text>
        <Text style={styles.header}>Calory (TDEE*)</Text>
      </View>
      {activityLevelData.map((activity) => (
        <View style={styles.tableRow} key={activity.Level}>
          <Text style={styles.cell}>{activity.Level}</Text>
          <Text style={styles.cell}>{activity.Description}</Text>
          <Text style={styles.cell}>{activity.Calory.toFixed(0)}</Text>
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

export default DataTable;
