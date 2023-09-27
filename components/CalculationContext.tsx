import React, { useCallback, useMemo } from "react";
import { createContext, useState, useContext } from "react";
import {
  ActivityLevelData,
  initialActivityLevelData,
} from "../models/ActivityLevelData";
import { User } from "../models/UserInfor";
// export interface ActivityLevelData{
//     Level: string;
//     Description: string;
//     Factor: number;
//     Calory:number;
// const initialActivityLevelData:ActivityLevelData[] = [
//   {
//     Level: "Sedentary",
//     Description:
// };
//       "Little to no exercise, such as a desk job with no additional physical activity ",
//     Factor: 1.2,
//     Calory:0,
//   },
//   {
//     Level: "Lightly Active",
//     Description: "Light exercise 1-2 days/week ",
//     Factor: 1.375,
//     Calory:0,
//   },
//   {
//     Level: "Moderately Active",
//     Description: "Moderate exercise 3-5 days/week ",
//     Factor: 1.55,
//     Calory:0,
//   },
//   {
//     Level: "Very Active",
//     Description: "Hard exercise 6-7 days/week ",
//     Factor: 1.725,
//     Calory:0,
//   },
//   {
//     Level: "Extremely Active ",
//     Description:
//       "Hard daily exercise and physical job or two times a day training ",
//     Factor: 1.9,
//     Calory:0,
//   },
// ];

interface CalculationContextProps {
  activityLevelData: ActivityLevelData[];
  //   age: string;
  //   setAge: (age: string) => void;
  //   weight: string;
  //   setWeight: (weight: string) => void;
  //   height: string;
  //   setHeight: (height: string) => void;
  //   selectedGender: string;
  //   setSelectedGender: (gender: string) => void;
  selectedActivityLevel: string;
  setSelectedActivityLevel: (activityLevel: string) => void;
  selectedNutritionGoal: string;
  setSelectedNutritionGoal: (nutritionGoal: string) => void;
  bmiValue: number;
  calculateBMI: (user: User) => void;
  bmrValue: number;
  calculateBMR: (user: User) => void;
}
export const CalculationContext = createContext<CalculationContextProps>({
  activityLevelData: initialActivityLevelData,
  //   age: "",
  //   setAge: (age: string) => {},
  //   weight: "",
  //   setWeight: (weight: string) => {},
  //   height: "",
  //   setHeight: (weight: string) => {},
  //   selectedGender: "",
  //   setSelectedGender: (gender: string) => {},
  selectedActivityLevel: "",
  setSelectedActivityLevel: (activityLevel: string) => {},
  selectedNutritionGoal: "",
  setSelectedNutritionGoal: (nutritionGoal: string) => {},
  bmiValue: 0,
  calculateBMI: (user: User) => {},
  bmrValue: 0,
  calculateBMR: (user: User) => {},
});
export function useCalculationContext() {
  return useContext(CalculationContext);
}

export const CalculationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [selectedActivityLevel, setSelectedActivityLevel] = useState("");
  const [selectedNutritionGoal, setSelectedNutritionGoal] = useState("");
  const [bmiValue, setBmiValue] = useState(0);
  const [bmrValue, setBmrValue] = useState(0);

  const calculateBMI = (data: User) => {
    console.log("calculateBMI", data);
    const heightInMeters = parseFloat(data.height) / 100;
    const weightInKg = parseFloat(data.weight);
    console.log(data.height, data.weight);
    if (isNaN(heightInMeters) || isNaN(weightInKg)) {
      console.error("Invalid input values");
      return;
    }
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    setBmiValue(bmi);
  };

  const calculateBMR = (data: User) => {
    console.log("calculateBMR", data);
    const heightInCm = parseFloat(data.height);
    const weightInKg = parseFloat(data.weight);
    const ageInNum = parseFloat(data.age);
    console.log(data.height, data.weight, data.age);
    if (isNaN(heightInCm) || isNaN(weightInKg) || isNaN(ageInNum)) {
      console.error("Invalid input values");
      return;
    }
    if (data.selectedGender === "") {
      console.error("Please select your gender before calculating BMR.");
      return;
    }

    if (data.selectedGender === "male") {
      const bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageInNum + 5;
      setBmrValue(bmr);
    } else if (data.selectedGender === "female") {
      const bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageInNum - 161;
      setBmrValue(bmr);
    }
  };

  const activityLevelData = useMemo(() => {
    const updatedActivityLevelData = initialActivityLevelData.map(
      (activity) => ({
        ...activity,
        Calory: bmrValue * activity.Factor,
      })
    );

    return updatedActivityLevelData;
  }, [bmrValue]);

  return (
    <CalculationContext.Provider
      value={{
        activityLevelData,
        selectedActivityLevel,
        setSelectedActivityLevel,
        selectedNutritionGoal,
        setSelectedNutritionGoal,
        bmiValue,
        calculateBMI,
        bmrValue,
        calculateBMR,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
};
