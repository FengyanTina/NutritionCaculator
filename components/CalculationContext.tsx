import React from "react";
import { createContext, useState, useContext } from "react";

interface CalculationContextProps {
  activityLevelData: {
    Level: string;
    Description: string;
    Factor: number;
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
}
const activityLevelData = [
  {
    Level: "Sedentary",
    Description:
      "Little to no exercise, such as a desk job with no additional physical activity ",
    Factor: 1.2,
  },
  {
    Level: "Lightly Active",
    Description: "Light exercise 1-2 days/week ",
    Factor: 1.375,
  },
  {
    Level: "Moderately Active",
    Description: "Moderate exercise 3-5 days/week ",
    Factor: 1.55,
  },
  {
    Level: "Very Active",
    Description: "Hard exercise 6-7 days/week ",
    Factor: 1.725,
  },
  {
    Level: "Extremely Active ",
    Description:
      "Hard daily exercise and physical job or two times a day training ",
    Factor: 1.9,
  },
];

export const CalculationContext = createContext<CalculationContextProps>({
  activityLevelData,
  age: "",
  setAge: (age: string) => {},
  weight: "",
  setWeight: (weight: string) => {},
  height: "",
  setHeight: (weight: string) => {},
  selectedGender: "female",
  setSelectedGender: (gender: string) => {},
  selectedActivityLevel: "Little to no exercise",
  setSelectedActivityLevel: (activityLevel: string) => {},
  selectedNutritionGoal: "maintain current weight",
  setSelectedNutritionGoal: (nutritionGoal: string) => {},
  bmiValue: 0,
  calculateBMI: () => {},
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
  const [selectedGender, setSelectedGender] = useState("female");
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(
    "Little to no exercise"
  );
  const [selectedNutritionGoal, setSelectedNutritionGoal] = useState(
    "maintain current weight"
  );
  const [bmiValue, setBmiValue] = useState(0);

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
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
};
