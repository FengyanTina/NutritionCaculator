 import { User } from "./UserInfor";

export interface IBWFormula {
  Formula: string;
  Value: number;
}

export const initialIBWData: IBWFormula[] = [
  {
    Formula: "Robinson Formula[1] (1983)",
    Value: 0,
  },
  {
    Formula: "Devine Formula[3] (1974)",
    Value: 0,
  },
  {
    Formula: "Hamwi Formula[4] (1964)",
    Value: 0,
  },
  {
    Formula: "Miller Formula[2] (1983)",
    Value: 0,
  },
];

// export const calculateRobinsonIBW = (data: User) => {
   
//     if (data.selectedGender === "male" && data.height ) {
//       const ibw = 52 + (1.9 * (data.height * 0.3937 - 60));
//       return(ibw);
//     } else if (data.selectedGender === "female" && data.height) {
//       const ibw = 49 + (1.7 * (data.height*0.3937 - 60));
//       return(ibw);
//     }
//   };

// export const calculateMillerIBW = (data: User):number => {
   
//     if (data.selectedGender === "male" && data.height ) {
//         const ibw = 56.2 + (1.41 * (data.height * 0.3937 - 60));
//         return(ibw);
//       } else if (data.selectedGender === "female" && data.height) {
//         const ibw = 53.1 + (1.36 * (data.height*0.3937 - 60));
//         return(ibw);
//       }
//       return 0;
//   };

//   export const calculateHamwiIBW = (data: User):number => {
  
//     if (data.selectedGender === "male" && data.height ) {
//         const ibw = 48+ (2.7 * (data.height * 0.3937 - 60));
//         return(ibw);
//       } else if (data.selectedGender === "female" && data.height) {
//         const ibw = 45.5 + (2.2 * (data.height*0.3937 - 60));
//         return(ibw);
//       }
//       return 0;
//   };

//   export const calculateDevineIBW = (data: User):number => {
//     if (data.selectedGender === "male" && data.height ) {
//         const ibw = 50 + (2.3 * (data.height * 0.3937 - 60));
//         return(ibw);
//       } else if (data.selectedGender === "female" && data.height) {
//         const ibw = 45.5 + (2.3 * (data.height*0.3937 - 60));
//         return(ibw);
//       }
//       return 0;
//   };

export const calculateRobinsonIBW = (height: number, gender:string) => {
   
    if (gender === "male" && height ) {
      const ibw = 52 + (1.9 * (height * 0.3937 - 60));
      return(ibw);
    } else if (gender === "female" && height) {
      const ibw = 49 + (1.7 * (height*0.3937 - 60));
      return(ibw);
    }
  };

export const calculateMillerIBW = (height: number, gender:string):number => {
   
    if (gender === "male" && height ) {
        const ibw = 56.2 + (1.41 * (height * 0.3937 - 60));
        return(ibw);
      } else if (gender === "female" && height) {
        const ibw = 53.1 + (1.36 * (height*0.3937 - 60));
        return(ibw);
      }
      return 0;
  };

  export const calculateHamwiIBW = (height: number, gender:string):number => {
  
    if (gender === "male" && height ) {
        const ibw = 48+ (2.7 * (height * 0.3937 - 60));
        return(ibw);
      } else if (gender === "female" && height) {
        const ibw = 45.5 + (2.2 * (height*0.3937 - 60));
        return(ibw);
      }
      return 0;
  };

  export const calculateDevineIBW = (height: number, gender:string):number => {
    if (gender === "male" && height ) {
        const ibw = 50 + (2.3 * (height * 0.3937 - 60));
        return(ibw);
      } else if (gender === "female" && height) {
        const ibw = 45.5 + (2.3 * (height*0.3937 - 60));
        return(ibw);
      }
      return 0;
  };
