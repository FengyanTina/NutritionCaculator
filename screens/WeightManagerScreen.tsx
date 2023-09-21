import { View,Text,StyleSheet } from "react-native";
export default function WeightManagerScreen(){
    return(
        <View style={styles.container}>
            <Text> Home</Text>
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