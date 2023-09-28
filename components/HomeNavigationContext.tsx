import { createContext, useState, useContext } from "react";
const bodyIndexdata = ["Mifflin St. Jeor Calculator", "Calculate BMI"];
const macroNutrientsdata = [
  "MacroNutrients Caculator",
  "Water Intake Caculator",
];
const weightManagerdata = ["Ideal Body Weight", "Calory Intake Caculator"];
export const HomeNavigationContext = createContext({
  isModalVisible: false,
  selectedCategory: "Body Index",
  bodyIndexdata,
  macroNutrientsdata,
  weightManagerdata,

  toggleModal: () => {},
  handleCategoryChange: (category: string) => {},
});
export function useHomeNavigationContext() {
  return useContext(HomeNavigationContext);
}

export const HomeNavigationProvider = (
  { children }: { children: React.ReactNode },
  navigation: { navigate: (arg0: string) => void }
) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Body Index");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    toggleModal();
  };

  return (
    <HomeNavigationContext.Provider
      value={{
        isModalVisible,
        selectedCategory,
        bodyIndexdata,
        macroNutrientsdata,
        weightManagerdata,
        toggleModal,
        handleCategoryChange,
      }}
    >
      {children}
    </HomeNavigationContext.Provider>
  );
};
