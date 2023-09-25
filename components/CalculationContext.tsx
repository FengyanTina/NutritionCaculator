import React from "react";
import { createContext, useState, useContext } from "react";
interface ActivityLevelData{
    Level: string;
    Description: string;
    Factor: number;
    Calory:number;
};
interface CalculationContextProps {
  activityLevelData: {
    Level: string;
    Description: string;
    Factor: number;
    Calory:number;
  }[];
  age: string;
  setAge: (age: string) => void;
  weight: string;
  setWeight: (weight: string) => void;
  height: string;
  setHeight: (height: string) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  selectedActivityLevel: string;
  setSelectedActivityLevel: (activityLevel: string) => void;
  selectedNutritionGoal: string;
  setSelectedNutritionGoal: (nutritionGoal: string) => void;
  bmiValue: number;
  calculateBMI: () => void;
  bmrValue: number;
  calculateBMR: () => void;

  calculateActivityCalory: () => void;
  
}
const initialActivityLevelData:ActivityLevelData[] = [
  {
    Level: "Sedentary",
    Description:
      "Little to no exercise, such as a desk job with no additional physical activity ",
    Factor: 1.2,
    Calory:0,
  },
  {
    Level: "Lightly Active",
    Description: "Light exercise 1-2 days/week ",
    Factor: 1.375,
    Calory:0,
  },
  {
    Level: "Moderately Active",
    Description: "Moderate exercise 3-5 days/week ",
    Factor: 1.55,
    Calory:0,
  },
  {
    Level: "Very Active",
    Description: "Hard exercise 6-7 days/week ",
    Factor: 1.725,
    Calory:0,
  },
  {
    Level: "Extremely Active ",
    Description:
      "Hard daily exercise and physical job or two times a day training ",
    Factor: 1.9,
    Calory:0,
  },
];

export const CalculationContext = createContext<CalculationContextProps>({
  activityLevelData:initialActivityLevelData,
  age: "",
  setAge: (age: string) => {},
  weight: "",
  setWeight: (weight: string) => {},
  height: "",
  setHeight: (weight: string) => {},
  selectedGender: "",
  setSelectedGender: (gender: string) => {},
  selectedActivityLevel: "",
  setSelectedActivityLevel: (activityLevel: string) => {},
  selectedNutritionGoal: "",
  setSelectedNutritionGoal: (nutritionGoal: string) => {},
  bmiValue: 0,
  calculateBMI: () => {},
  bmrValue: 0,
  calculateBMR: () => {},
  calculateActivityCalory: () => {},
  
});
export function useCalculationContext() {
  return useContext(CalculationContext);
}

export const CalculationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(
    ""
  );
  const [selectedNutritionGoal, setSelectedNutritionGoal] = useState(
    ""
  );
  const [bmiValue, setBmiValue] = useState(0);
  const [bmrValue, setBmrValue] = useState(0);
  const[activityLevelData,setActivityLevelData] = useState(initialActivityLevelData);

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    if (isNaN(heightInMeters) || isNaN(weightInKg)) {
      console.error("Invalid input values");
      return;
    }
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    setBmiValue(bmi);
  };

  const calculateBMR = () => {
    const heightInCm = parseFloat(height);
    const weightInKg = parseFloat(weight);
    const ageInNum = parseFloat(age);
    if (isNaN(heightInCm) || isNaN(weightInKg) || isNaN(ageInNum)) {
      console.error("Invalid input values");
      return;
    }
    if (selectedGender === "") {
        console.error("Please select your gender before calculating BMR.");
        return;
      }
      
    if(selectedGender === 'male'){
        const bmr = (10*weightInKg) + (6.25*heightInCm)-(5* ageInNum)+5;
    setBmrValue(bmr); 
    } else if (selectedGender === 'female'){
        const bmr = (10*weightInKg) + (6.25*heightInCm)-(5* ageInNum)-161;
        setBmrValue(bmr); 
    } 
}

const calculateActivityCalory = () => {
    
    const updatedActivityLevelData = activityLevelData.map((activity) => ({
        ...activity,
        Calory: bmrValue * activity.Factor,
      }));
    
      // Update the context with the updated data
      setActivityLevelData(updatedActivityLevelData);
  };


  

  return (
    <CalculationContext.Provider
      value={{
        activityLevelData,
        age,
        setAge,
        height,
        setHeight,
        weight,
        setWeight,
        selectedGender,
        setSelectedGender,
        selectedActivityLevel,
        setSelectedActivityLevel,
        selectedNutritionGoal,
        setSelectedNutritionGoal,
        bmiValue,
        calculateBMI,
        bmrValue,
        calculateBMR,
        calculateActivityCalory,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
};
