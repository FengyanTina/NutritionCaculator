import React, { useCallback, useMemo } from "react";
import { createContext, useState, useContext } from "react";
import {
  ActivityLevelData,
  initialActivityLevelData,
} from "../models/ActivityLevelData";
import { User } from "../models/UserInfor";
import { BMICategory, initialBmiData } from "../models/BMI";

interface CalculationContextProps {
  activityLevelData: ActivityLevelData[];
//   bmiCategory:BMICategory[];
//   calculateWeightRange: (user: User, data: BMICategory[]) => {};
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
//   bmiCategory:initialBmiData,
  selectedActivityLevel: "",
  setSelectedActivityLevel: (activityLevel: string) => {},
  selectedNutritionGoal: "",
  setSelectedNutritionGoal: (nutritionGoal: string) => {},
  bmiValue: 0,
  calculateBMI: (user: User) => {},
  bmrValue: 0,
  calculateBMR: (user: User) => {},
//   calculateWeightRange: (user: User, data: BMICategory[]) => [],
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

  

//   const calculateWeightRange = (data: User, initialBmiData: BMICategory[]) => {
//     const heightInCm = parseFloat(data.height);
//     const weightInKg = parseFloat(data.weight);

//     // Calculate the low and high values for weight range
//     const updatedBMIData = initialBmiData.map((bmi) => ({
//       ...bmi,
//       WeightRangeHigh: heightInCm * bmi.BMIHighValue,
//       WeightRangeLow: weightInKg * bmi.BMILowValue,
//     }));

//     return updatedBMIData;
//   };




  return (
    <CalculationContext.Provider
      value={{
        activityLevelData,
        // bmiCategory,
        // calculateWeightRange,
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
