export interface User {
    age: number;
    height: number;
    weight: number;
   selectedGender: string;
  }

  
  export function defaultUser(): User {
    return {
      age: 0,
      height: 0,
      weight:0,
      selectedGender: "",
    };
  }