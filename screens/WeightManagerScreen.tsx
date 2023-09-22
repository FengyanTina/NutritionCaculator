import { View,Text,StyleSheet } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


type Props = NativeStackScreenProps<RootStackParamList, 'WeightManager'>
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