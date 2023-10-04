import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import InputForm from "../components/InputForm";
import React, { useContext, useEffect, useState } from "react";
import { User } from "../models/UserInfor";
import { CalculationContext } from "../components/CalculationContext";
import { IBWFormula, initialIBWData } from "../models/IBW";
import { FlashList } from "@shopify/flash-list";

type Props = NativeStackScreenProps<RootStackParamList, "IdealBodyWeight">;
export default function IdealBodyWeightScreen() {
  const { updatedIBWData, calculateIBW } = useContext(CalculationContext);
  const [user, setUser] = useState<User>();

  const onSubmit = (data: User) => {
    setUser(data);
  };

  useEffect(() => {
    if (user) {
      calculateIBW(user, initialIBWData);
    } else {
      console.log("user is null!");
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <InputForm
          inputsToShow={["height","age", "selecteGender"]}
          onUserInput={onSubmit}
        />
        <View style={styles.bmiContainer}>    
          <View style={styles.ibwValueBox}>
            <Text style={styles.ibwValue}>
              Ideal Weight using Different Formula
            </Text>
            
            <View style={styles.flashList}>
              <FlashList
                
                data={updatedIBWData}
                renderItem={({ item }) => (
                  <View style={styles.listItemContainer}>
                    <Text>{item.Formula}:</Text>
                    <Text>{item.Value.toFixed(0)}kg</Text>
                  </View>
                )}
                estimatedItemSize={5}
              />
            </View>
          </View>
        </View>

        <Text style={styles.text}>
          <Text style={styles.boldText}>* Formulas:</Text>
          Several different formulas have been developed over the years to estimate ideal body weight.
          
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>* Ideal Body Weight: A Range Rather Than One Number</Text>
          These formulas do not take into account other factors, such as lean body mass, genetic makeup, physical activity, or age.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
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
    justifyContent:"center",
  },
  ibwValueBox: {
    backgroundColor: "#e0e0e0",
    padding: 5,
    borderRadius: 5,
    marginTop:10,
    marginBottom:10,
  },
  ibwValue: {
    fontWeight: "bold",
    marginBottom:10,
    fontSize:15,
  },
  flashList: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    
  },
  listItemContainer: {
    flexDirection: "row", // Display items in a row
    alignItems: "center", // Vertically center items
    justifyContent: "space-between", // Add space between Value and Formula
    marginBottom: 5,
    padding: 5,
    flex:1,

  },
  
});
