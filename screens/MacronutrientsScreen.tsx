import { View,Text,StyleSheet } from "react-native";
export default function MacronutrientsScreen(){
    return(
        <View style={styles.container}>
            <Text> Macronutrients</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#dcdcdc',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      color:'white',
     
      fontWeight: 'bold',
    }
  });