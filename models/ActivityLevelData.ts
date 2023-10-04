

export interface ActivityLevelData {
    Level: string;
    Description: string;
    Factor: number;
    Calory: number;
  }
  
  export const initialActivityLevelData: ActivityLevelData[] = [
    {
      Level: "Sedentary",
      Description:
        "Little to no exercise, such as a desk job with no additional physical activity",
      Factor: 1.2,
      Calory: 0,
    },
    {
      Level: "Lightly Active",
      Description: "Light exercise 1-2 days/week",
      Factor: 1.375,
      Calory: 0,
    },
    {
      Level: "Moderately Active",
      Description: "Moderate exercise 3-5 days/week",
      Factor: 1.55,
      Calory: 0,
    },
    {
      Level: "Very Active",
      Description: "Hard exercise 6-7 days/week",
      Factor: 1.725,
      Calory: 0,
    },
    {
      Level: "Extremely Active",
      Description:
        "Hard daily exercise and physical job or two times a day training",
      Factor: 1.9,
      Calory: 0,
    },
  ];
  