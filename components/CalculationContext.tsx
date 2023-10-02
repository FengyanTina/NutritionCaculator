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
import { IBWFormula, initialIBWData } from "../models/IBW";

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
  calculateDevineIBW: (user: User) => void;
  calculateHamwiIBW: (user: User) => void;
  calculateMillerIBW: (user: User) => void;
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
//   ibwValue: 0,
  //   calculateRobinsonIBW: (user: User) => {},
  updatedIBWData:initialIBWData,
  calculateDevineIBW: (user: User) => {},
  calculateHamwiIBW: (user: User) => {},
  calculateMillerIBW: (user: User) => {},
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
  const [ibwValue, setIbwValue] = useState(0);
  const [updatedIBWData, setUpdatedIBWData] = useState<IBWFormula[]>(initialIBWData);
  const [activityCalValue, setactivityCalValue] = useState(0);

  const calculateBMI = (data: User) => {
    console.log("calculateBMI", data);
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

  const getFormulaFunction = (formula: string) => {
    switch(formula) {
        case "Robinsson": return newFormula;
        default: return newFormula;
    }
  }

  const calculateIBW = (data: User, initialIBWData: IBWFormula[]) => {
    const ibwValues: IBWFormula[] = [];
    const updatedData: IBWFormula[] = initialIBWData.map((formula) => {
    // initialIBWData.forEach((formula) => {
      let ibwValue = 0;
      let calculateIbWFunc = getFormulaFunction(formula.Formula);
      const value = calculateIbWFunc(data)

      switch (formula.Formula) {
        case "Robinson Formula[1] (1983)":
            formulaFunction = newFormula
          if (data.selectedGender === "male" && data.height) {
            ibwValue = 52 + 1.9 * (data.height * 0.3937 - 60);
          } else if (data.selectedGender === "female" && data.height) {
            ibwValue = 49 + 1.7 * (data.height * 0.3937 - 60);
          }
          break;
        case "Devine Formula[3] (1974)":
          if (data.selectedGender === "male" && data.height) {
            ibwValue = 50 + 2.3 * (data.height * 0.3937 - 60);
          } else if (data.selectedGender === "female" && data.height) {
            ibwValue = 45.5 + 2.3 * (data.height * 0.3937 - 60);
          }
          break;
        case "Hamwi Formula[4] (1964)":
          if (data.selectedGender === "male" && data.height) {
            ibwValue = 50 + 2.3 * (data.height * 0.3937 - 60);
          } else if (data.selectedGender === "female" && data.height) {
            ibwValue = 45.5 + 2.3 * (data.height * 0.3937 - 60);
          }
          break;
        case "Miller Formula[2] (1983)":
          if (data.selectedGender === "male" && data.height) {
            ibwValue = 50 + 2.3 * (data.height * 0.3937 - 60);
          } else if (data.selectedGender === "female" && data.height) {
            ibwValue = 45.5 + 2.3 * (data.height * 0.3937 - 60);
          }
          break;
      }
      return {
        ...formula,
        Value: ibwValue,
      };
    });
    setUpdatedIBWData(updatedData);
  };

  // const calculateIBW = (data: User,initialIBWData:IBWFormula[]) => {

  //     if(initialIBWData.Formula === "Robinson Formula[1] (1983)"){
  //     if (data.selectedGender === "male"  && data.height) {
  //       const bmr = 52 + (1.9 * data.height * 0.3937 - 60);
  //       setIbwValue(bmr);
  //     } else if (data.selectedGender === "female" && data.height ) {
  //         const bmr = 49 + (1.7 * data.height*0.3937 - 60);
  //       setIbwValue(bmr);
  //     }} else if (initialIBWData.Formula === "Devine Formula[3] (1974)"){
  //         if (data.selectedGender === "male"  && data.height) {
  //             const bmr = 50 + (2.3 * data.height * 0.3937 - 60);
  //             setIbwValue(bmr);
  //           } else if (data.selectedGender === "female" && data.height ) {
  //               const bmr = 45.5 + (2.3 * data.height*0.3937 - 60);
  //             setIbwValue(bmr);
  //     }}
  //   };

  const calculateDevineIBW = (data: User) => {};

  const calculateHamwiIBW = (data: User) => {
    console.log("calculateIBW", data);
    if (data.selectedGender === "male" && data.height && data.age) {
      const ibw = 10 + 6.25 * data.height - 5 * data.age + 5;
      setIbwValue(ibw);
    } else if (data.selectedGender === "female" && data.height && data.age) {
      const ibw = 10 + 6.25 * data.height - 5 * data.age - 161;
      setIbwValue(ibw);
    }
  };
  const calculateMillerIBW = (data: User) => {
    console.log("calculateIBW", data);
    if (data.selectedGender === "male" && data.height && data.age) {
      const ibw = 10 + 6.25 * data.height - 5 * data.age + 5;
      setIbwValue(ibw);
    } else if (data.selectedGender === "female" && data.height && data.age) {
      const ibw = 10 + 6.25 * data.height - 5 * data.age - 161;
      setIbwValue(ibw);
    }
  };

  const newFormula = (data: User) => {
    const factor = data.selectedGender === "male" ? 10 : 8;
    return 10 + factor * data.height - 5 * data.age - 161;
  }

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
        // ibwValue,
        updatedIBWData,
        calculateIBW,
        calculateDevineIBW,
        calculateHamwiIBW,
        calculateMillerIBW,
        activityCalValue,
        calculateCactivityCalory,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
};
