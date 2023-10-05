import { createContext, useState, useContext } from "react";
const bodyIndexCategory = ["Mifflin St. Jeor Calculator", "Calculate BMI"];
const macroNutrientsCategory = [
  "Food Nutrition Caculator",
];
const weightManagerCategory = ["Ideal Body Weight", "Activity Calory Caculator"];
export const HomeNavigationContext = createContext({
  isModalVisible: false,
  selectedCategory: "Body Index",
  bodyIndexSelection: bodyIndexCategory,
  macroNutrientsSelection: macroNutrientsCategory,
  weightManagerSelection: weightManagerCategory,

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
        bodyIndexSelection: bodyIndexCategory,
        macroNutrientsSelection: macroNutrientsCategory,
        weightManagerSelection: weightManagerCategory,
        toggleModal,
        handleCategoryChange,
      }}
    >
      {children}
    </HomeNavigationContext.Provider>
  );
};
