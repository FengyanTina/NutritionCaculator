import React, { useMemo } from "react";
import { createContext, useState, useContext } from "react";
import {
  ActivityLevelData,
  initialActivityLevelData,
} from "../models/ActivityLevelData";
import { User } from "../models/UserInfor";
import { BMICategory, initialBmiData } from "../models/BMI";
import {
  ActivityMETFactor,
  initialActivityMETFactor,
} from "../models/ActivityMET";
import { IBWFormula, initialIBWData,calculateRobinsonIBW,calculateHamwiIBW,calculateDevineIBW,calculateMillerIBW } from "../models/IBW";


interface CalculationContextProps {
  activityLevelData: ActivityLevelData[];
  calculateWeightRange: (user: User) => BMICategory[];
  selectedActivityLevel: string;
  setSelectedActivityLevel: (activityLevel: string) => void;
  selectedNutritionGoal: string;
  setSelectedNutritionGoal: (nutritionGoal: string) => void;
  bmiValue: number;
  calculateBMI: (user: User) => void;
  bmrValue: number;
  calculateBMR: (user: User) => void;
//   ibwValue: number;
  //   calculateRobinsonIBW: (user: User) => void;
  updatedIBWData:IBWFormula[];
//   calculateDevineIBW: (user: User) => void;
//   calculateHamwiIBW: (user: User) => void;
//   calculateMillerIBW: (user: User) => void;
  activityCalValue: number;
  calculateCactivityCalory: (
    data: User,
    activityTime: number,
    activity: ActivityMETFactor
  ) => void;
  calculateIBW: (data: User, initialIBWData: IBWFormula[]) => void;
}
export const CalculationContext = createContext<CalculationContextProps>({
  activityLevelData: initialActivityLevelData,
  selectedActivityLevel: "",
  setSelectedActivityLevel: (activityLevel: string) => {},
  selectedNutritionGoal: "",
  setSelectedNutritionGoal: (nutritionGoal: string) => {},
  bmiValue: 0,
  calculateBMI: (user: User) => {},
  bmrValue: 0,
  calculateBMR: (user: User) => {},
  calculateWeightRange: (user: User) => [],
  updatedIBWData:initialIBWData,
  activityCalValue: 0,
  calculateCactivityCalory: (
    data: User,
    activityTime: number,
    activity: ActivityMETFactor
  ) => {},
  calculateIBW: (data: User, formular: IBWFormula[])=> {},
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
  const [updatedIBWData, setUpdatedIBWData] = useState<IBWFormula[]>(initialIBWData);
  const [activityCalValue, setactivityCalValue] = useState(0);

  const calculateBMI = (data: User) => {
    if (data.height && data.weight) {
      const heightInMeters = data.height / 100;
      const bmi = data.weight / (heightInMeters * heightInMeters);
      setBmiValue(bmi);
    }
  };

  const calculateBMR = (data: User) => {
    if (data.selectedGender === "male" && data.height && data.age) {
      const ibw = 10 + 6.25 * data.height - 5 * data.age + 5;
      setBmrValue(ibw);
    } else if (data.selectedGender === "female" && data.height && data.age) {
      const ibw = 10 + 6.25 * data.height - 5 * data.age - 161;
      setBmrValue(ibw);
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

  const calculateWeightRange = (data: User): BMICategory[] => {
    if (data.height !== undefined) {
      const heightInMeters = data.height / 100;
      const updatedBMIData = initialBmiData.map((bmi) => ({
        ...bmi,
        WeightRangeHighValue: heightInMeters * heightInMeters * bmi.BMIHighRate,
        WeightRangeLowValue: heightInMeters * heightInMeters * bmi.BMILowRate,
      }));
      return updatedBMIData;
    } else {
      return [];
    }
  };

  const calculateIBW = (data: User, initialIBWData: IBWFormula[]) => {
    const updatedData: IBWFormula[] = initialIBWData.map((formula) => {
      let ibwValue:number = 0;

      switch (formula.Formula) {
        case "Robinson Formula[1] (1983)":
            ibwValue =  calculateRobinsonIBW(data)||0 ;  
          break;
        case "Devine Formula[3] (1974)":
            ibwValue = calculateDevineIBW(data)||0;
          break;
        case "Hamwi Formula[4] (1964)":
            ibwValue = calculateHamwiIBW(data)||0;
          break;
        case "Miller Formula[2] (1983)":
            ibwValue = calculateMillerIBW(data)||0;
          break;
      }
      return {
        ...formula,
        Value: ibwValue,
      };
    });
    setUpdatedIBWData(updatedData);
  };

  const calculateCactivityCalory = (
    data: User,
    activityTime: number,
    activity: ActivityMETFactor
  ) => {
    console.log("Calory", data);

    if (data.weight && activityTime) {
      const cal = (activityTime * activity.METFactor * 3.5 * data.weight) / 200;
      setactivityCalValue(cal);
    }
  };
  return (
    <CalculationContext.Provider
      value={{
        activityLevelData,
        calculateWeightRange,
        selectedActivityLevel,
        setSelectedActivityLevel,
        selectedNutritionGoal,
        setSelectedNutritionGoal,
        bmiValue,
        calculateBMI,
        bmrValue,
        calculateBMR,
        updatedIBWData,
        calculateIBW,
        activityCalValue,
        calculateCactivityCalory,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
};
