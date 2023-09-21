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
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const data = ["Mifflin St. Jeor Calculator", "Ideal Body Weight"];

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleItemPress = (item: string) => {
    setSelectedItem(item);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity onPress={toggleModal} style={styles.button}>
        <Text>Body Index</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1} // Prevents clicks from passing through
          onPress={toggleModal}
        >
          <View style={styles.modalContent}>
            <Text>Select an Option</Text>
            <FlatList
              data={data}
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

      {selectedItem && <Text>Selected: {selectedItem}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcdcdc",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignSelf: "stretch",
  },
  modalItem: {
    fontSize: 18,
    padding: 10,
  },
  closeButton: {
    color: "blue",
    marginTop: 10,
  },
});
