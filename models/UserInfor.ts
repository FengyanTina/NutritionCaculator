export interface User {
    age: string;
    height: string;
    weight: string;
   selectedGender: string;
  }

  
  export function defaultUser(): User {
    return {
      age: "",
      height: "",
      weight: "",
      selectedGender: "",
    };
  }