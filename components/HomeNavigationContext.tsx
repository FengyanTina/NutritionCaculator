import { createContext, useState, useContext } from 'react';

export const HomeNavigationContext = createContext({

});

export const HomeNavigationProvider = ({children}:{ children: React.ReactNode }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const bodyIndexdata = ["Mifflin St. Jeor Calculator", "Ideal Body Weight"];
    const macroNutrientsdata = ["MacroNutrients Caculator", "Water Intake Caculator"];
    const weightManagerdata = ["Ideal Body Weight", "Calory Intake Caculator"];

    const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };




    return (
        <HomeNavigationContext.Provider
          value={{ selectedItem, setSelectedItem, bodyIndexdata,weightManagerdata,macroNutrientsdata}}
        >
          {children}
        </HomeNavigationContext.Provider>
      );
} 