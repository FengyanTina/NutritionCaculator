// import { useState } from "react";
// import { View,Text,StyleSheet } from "react-native";
// import { Picker } from "@react-native-picker/picker";

// export default function HomeScreen(){
//     const [selectedItem, setSelectedItem] = useState("Profile");

//     const handleItemChange = (itemValue: string) => {
//       setSelectedItem(itemValue);
//     };
//     return(
//         <View style={styles.container}>
//             <Text> Home</Text>
//             <Picker
//         selectedValue={selectedItem}
//         onValueChange={handleItemChange}
//         style={styles.picker}
//       >
//         <Picker.Item label="Profile" value="Profile" />
//         <Picker.Item label="My account" value="My account" />
//         <Picker.Item label="Logout" value="Logout" />
//       </Picker>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#dcdcdc',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     text:{
//       color:'white',
//       fontWeight: 'bold',
//     },
//     picker: {
//         width: 200,
//       },
//   });

import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
export default function HomeScreen({ navigation }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Body Index");
  const bodyIndexdata = ["Mifflin St. Jeor Calculator", "Ideal Body Weight"];
  const macroNutrientsdata = [
    "MacroNutrients Caculator",
    "Water Intake Caculator",
  ];
  const weightManagerdata = ["Ideal Body Weight", "Calory Intake Caculator"];

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    toggleModal(); 
  };

  const handleItemPress = (item: string) => {
    toggleModal();
    if (selectedCategory === "Body Index") {
      if (item === "Mifflin St. Jeor Calculator") {
        navigation.navigate("BodyIndex");
      } else if (item === "Ideal Body Weight") {
        navigation.navigate("IdealBodyWeight");
      }
    } else if (selectedCategory === "Macro Nutrients") {
      if (item === "MacroNutrients Caculator") {
        navigation.navigate("Macronutrients");
      } else if (item === "Water Intake Caculator") {
        navigation.navigate("IdealBodyWeight");
      }
    } else if (selectedCategory === "Weight Manager") {
      if (item === "Ideal Body Weight") {
        navigation.navigate("IdealBodyWeight");
      } else if (item === "Calory Intake Caculator") {
        navigation.navigate("WeightManager");
      }
    }
    setSelectedItem(item);
  };

  return (
    
    <View style={styles.container}>

       
      <Text style={styles.text}>Select a Category</Text>
     
      <TouchableOpacity
        onPress={() => handleCategoryChange("Body Index")}
        style={styles.button}
      > 
       <BlurView intensity={80} tint="light"style={styles.blurView}>
        <Text style={styles.text}>Body Index</Text> 
        </BlurView>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleCategoryChange("Macro Nutrients")}
        style={styles.button}
      >
         <BlurView intensity={80} tint="light" style={styles.blurView}>
            <Text style={styles.text}>Macro Nutrients</Text>
            </BlurView>
        
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleCategoryChange("Weight Manager")}
        style={styles.button}
      >
         <BlurView intensity={80} tint="light"  style={styles.blurView}>
        <Text style={styles.text}>Weight Manager</Text>
        </BlurView>
      </TouchableOpacity>

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
                  ? bodyIndexdata
                  : selectedCategory === "Macro Nutrients"
                  ? macroNutrientsdata
                  : selectedCategory === "Weight Manager"
                  ? weightManagerdata
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
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bdb76b", //#dcdcdc
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    width: 200, 
    height: 100,   
  },
  blurView: {
    flex: 1,  
    padding: 10,  
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20, 
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color:'black',
    textAlign:'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   margin:10,
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
    marginTop:20,
    fontWeight: '500',
  },
  closeButton: {
    color: "blue",
    marginTop: 16,
    textAlign:'center',
    fontWeight: '700',
  },
 

});
