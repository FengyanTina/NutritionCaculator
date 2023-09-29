export interface User {
    age: number|undefined;
    height: number|undefined;
    weight: number|undefined;
   selectedGender?: string|undefined;
  }

  
  export function defaultUser(): User {
    return {
      age: undefined,
      height: undefined,
      weight:undefined,
      selectedGender: undefined,
    };
  }