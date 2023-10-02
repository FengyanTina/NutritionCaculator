// import { useEffect, useState } from "react";
// import { View,Text,StyleSheet, TextInput, Button } from "react-native";
// export default function MacronutrientsScreen(){
// const [searchingWord, setSearchingWord] = useState<string>("");


// useEffect (()=> {},[]);

// const fetchNutrition =()=>{
//     fetch(
//         `https://api.calorieninjas.com/v1/nutrition?query=${searchingWord}`
//     ).then ((response)=>response.json())
//     .then((data)=>{
//         console.log(data);
//     })
// }

    
//     return(
//         <View style={styles.container}>
//             <Text> Enter food to search</Text>
//             <TextInput  
//             placeholder="Enter food to search"
//             value = {searchingWord}
//             onChangeText={(text)=>setSearchingWord(text)}
//              />
//            <Button onPress={fetchNutrition} title="Send" />
//            <View>
            
//            </View>
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
//     }
//   });

  import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

type NutritionData = {
    name: string
}

export default function MacronutrientsScreen(){
  const [nutritionData, setNutritionData] = useState<NutritionData>(); 
  const [query, setQuery] = useState<string>("");

  const fetchNutritionData = async () => {
    const apiKey = 'nTwFLtWWPI2RvXmkw0h1Vg==MIT4cmxn84zhDJHb';
    

    try {
      const response = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${query}`,
        {
          method: 'GET',
          headers: {
            'X-Api-Key': apiKey,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setNutritionData(data.items[0]);
      } else {
        console.error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchNutritionData();
  }, []);

  return (
    <View>
        
             <TextInput  
             placeholder="Enter food to search"
             value = {query}
             onChangeText={(text)=>setQuery(text)}
              />
            <Button onPress={fetchNutritionData} title="Send" />
           

      {nutritionData ? (
        
        <View><Text>Nutrition Data: {JSON.stringify(nutritionData, null, 2)}</Text>
          <Text>Name: {nutritionData.name}</Text>
          {/* <Text>Calories: {nutritionData.calory} kcal</Text>
          <Text>Protein: {nutritionData.protein_g} g</Text>
          <Text>Carbohydrates: {nutritionData.carbohydrates_total_g} g</Text>
          <Text>Fat: {nutritionData.fat_total_g} g</Text> */}
        </View>
      ) : (
        <Text>nutritionData</Text>
      )}
    
    </View>
  );
};


