import React, { useContext, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { BlurView } from "expo-blur";
import { HomeNavigationContext } from "../components/HomeNavigationContext";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";


type Props = NativeStackScreenProps<RootStackParamList, "Home">;
export default function HomeScreen({ navigation }: Props) {
   
  const {
    isModalVisible,
    selectedCategory,
    bodyIndexSelection: bodyIndexCategory,
    macroNutrientsSelection: macroNutrientsCategory,
    weightManagerSelection: weightManagerCategory,
    toggleModal,
    handleCategoryChange,
  } = useContext(HomeNavigationContext);
  const [selectedItem, setSelectedItem] = useState<string>("");

//   const handleItemPress = (item: string) => {
//     toggleModal();
//     if (selectedCategory === "Body Index") {
//       if (item === "Mifflin St. Jeor Calculator") {
//         navigation.navigate("MifflinCaculator");
//       } else if (item === "Calculate BMI") {
//         navigation.navigate("CalculateBMI");
//       }
//     } else if (selectedCategory === "Food Nutrition") {
     
//         navigation.navigate("FoodNutritionCalculator");
     
//     } else if (selectedCategory === "Weight Manager") {
//       if (item === "Ideal Body Weight") {
//         navigation.navigate("IdealBodyWeight");
//       } else if (item === "Activity Calory Caculator") {
//         navigation.navigate("ActivityCalory");
//       }
//     }
//     setSelectedItem(item);
//   };
 
const handleItemPress = (item: string) => {
    toggleModal();
  
    switch (selectedCategory) {
      case "Body Index":
        switch (item) {
          case "Mifflin St. Jeor Calculator":
            navigation.navigate("MifflinCaculator");
            break;
          case "Calculate BMI":
            navigation.navigate("CalculateBMI");
            break;
          default:
            break;
        }
        break;
  
      case "Food Nutrition":
        navigation.navigate("FoodNutritionCalculator");
        break;
  
      case "Weight Manager":
        switch (item) {
          case "Ideal Body Weight":
            navigation.navigate("IdealBodyWeight");
            break;
          case "Activity Calory Caculator":
            navigation.navigate("ActivityCalory");
            break;
          default:
            break;
        }
        break;
  
      default:
        break;
    }
  
    setSelectedItem(item);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Body & Nutrition Caculator</Text>
      <View style={styles.overlay}>
        
        <ImageBackground
          style={styles.image}
          source={require("../assets/nutritionImage.jpg")}
        >
          <BlurView intensity={8} style={styles.blurView}>
            <Text style={styles.overlayText}>
              Health and Fitness Calculators. All the caculations are based on
              most widely used methods. These formulas are only guidelines.
              Consult your dietitian for specific individual needs.
            </Text>
          </BlurView>
        </ImageBackground>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.text}>Select a Category</Text>
        <TouchableOpacity
          onPress={() => handleCategoryChange("Body Index")}
          style={styles.button}
        >
          <BlurView intensity={80} tint="light" style={styles.blurView}>
            <Text style={styles.text}>Body Index</Text>
          </BlurView>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCategoryChange("Food Nutrition")}
          style={styles.button}
        >
          <BlurView intensity={80} tint="light" style={styles.blurView}>
            <Text style={styles.text}>Food Nutrition</Text>
          </BlurView>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCategoryChange("Weight Manager")}
          style={styles.button}
        >
          <BlurView intensity={80} tint="light" style={styles.blurView}>
            <Text style={styles.text}>Weight Manager</Text>
          </BlurView>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1} // Prevents clicks from passing through
          onPress={toggleModal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.text}>Select an Option</Text>
            <FlatList
              data={
                selectedCategory === "Body Index"
                  ? bodyIndexCategory
                  : selectedCategory === "Food Nutrition"
                  ? macroNutrientsCategory
                  : selectedCategory === "Weight Manager"
                  ? weightManagerCategory
                  : []
              }
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleItemPress(item)}>
                  <Text style={styles.modalItem}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          <View>
    
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fbc8f", //#dcdcdc, #8fbc8f, #bdb76b
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
  },
  categoryContainer: {
    marginBottom: 30,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    width: 200,
    height: 80,
  },
  blurView: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  modalContent: {
    backgroundColor: "#dcdcdc",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignSelf: "stretch",
  },
  modalItem: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: "500",
  },
  closeButton: {
    color: "blue",
    marginTop: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  image: {
    height: 180,
  },
  overlay: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  overlayText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
    justifyContent: "center",
    marginTop: 20,
  },
});
