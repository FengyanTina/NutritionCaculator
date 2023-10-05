import React, { useMemo } from "react";
import { createContext, useState, useContext } from "react";

import {
  ActivityLevelData,
  initialActivityLevelData,
} from "../models/ActivityLevelData";
import { User } from "../models/UserInfor";
import { BMICategory, initialBmiData } from "../models/BMI";

interface CalculationContextProps {
  activityLevelData: ActivityLevelData[];
  bmrValue: number;
  calculateBMR: (user: User) => void;

  calculateWeightRange: (user: User) => BMICategory[];
  bmiValue: number;
  calculateBMI: (user: User) => void;
}
export const CalculationContext = createContext<CalculationContextProps>({
  activityLevelData: initialActivityLevelData,
  bmiValue: 0,
  calculateBMI: (user: User) => {},
  bmrValue: 0,
  calculateBMR: (user: User) => {},
  calculateWeightRange: (user: User) => [],
});
export function useCalculationContext() {
  return useContext(CalculationContext);
}

export const CalculationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bmiValue, setBmiValue] = useState(0);
  const [bmrValue, setBmrValue] = useState(0);

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
  return (
    <CalculationContext.Provider
      value={{
        activityLevelData,
        calculateWeightRange,
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
