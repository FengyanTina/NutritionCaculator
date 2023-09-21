import { View,StyleSheet,Text } from "react-native";

export default function BodyIndexScreen(){
    return(
        <View style={styles.container}>
            <Text> BodyIndex</Text>
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