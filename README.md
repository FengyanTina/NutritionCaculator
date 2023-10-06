# NutritionCaculator

This app is use to calculate Body and Nutrition data. It includes 5 screens:
1. Body Index Category: Mifflin St. Jeor Calculator (TDEE & BMR) screen and BMI calculator screen
2: Food Nutrition Category: Food Nutrition Caculator screen using API to retrive food nutrition data
3: Weight Manager Category: Ideal Body Weight screen and Ativity Calory Caculator screen

Building Project:
1. Expo + React Native
2. Using context and reat hooks: two contexts, one for the home screen navigation (HomeNavigationContext) another one for the shared calculation for some screens (CalculationContext).
3. Some screens share the state from calculation context, some screens that do not need shared states using its own states inside the screen. 

4.Componnets:
- React Components:
View
Button
Text
TextInput
Screen
TouchableOpacity
FlatList
Model
ScrollView
Hook Form
SafeAreaView
...

- Expo Components:
StatusBar
BlurView
Picker
Notification: (half working)only for the nutrition API to inform the user the data source when the data fetched successfully.
KeepAwake: not really needed but just to meet the requirement of the assignment

5. Structure:
componets: 
-BMICategoryTable: to show the BMI  calculating results
-CalculationContext: to calculate values for MifflinCaculatorScreen and CaculateBMI 
-DataTable to show the MifflinCaculation result.
-HomNavigationContext: the home screen buttons and navigations from each button
-InputForm: for MifflinCaculator input and CalculateBMI input

models:
-ActivityLevelData: for the MifflinCaculatorScreen
-ActivityMET: for the ActivityCaloryScreen
-BMI: for CalculateBMIScreen
-IBW: for IdealBodyWeightScreen
UserInfor: for the User object input to ge age, height, weight and gender values

screens:
-ActivityCaloryScreen
-CalculateBMIScreen
-FoodNutritionCalculatorScreen
-HomeScreen
-IdealBodyWeightScreen
-mifflinCaculatorScreen



App for Android, it can run on ios but layout changes. 