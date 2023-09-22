import { View,StyleSheet,Text } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, 'BodyIndex'>
export default function BodyIndexScreen({navigation}:Props){
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