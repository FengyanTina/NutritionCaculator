# NutritionCaculator

This app is use to calculate Body and Nutrition data. It includes 5 screens:
1. Body Index Category: Mifflin St. Jeor Calculator (TDEE & BMR) screen and BMI calculator screen
2: Food Nutrition Category: Food Nutrition Caculator screen using API to retrive food nutrition data
3: weight Manager Category: Ideal Body Weight screen and Ativity Calory Caculator screen

Building Project:
1. Expo + React Native
2. Using context and reat hooks: two contexts, one for the home screen navigation (HomeNavigationContext) another one for the shared calculation for some screens (CalculationContext).
3. Some screens share the state from calculation context, some screens that do not need shared data using useState inside the screen. 

Componnets:
1. React Components:
View
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
2. Expo Components:
StatusBar
BlurView
Picker
Notification: only for the nutrition API to inform the user the data source when the data fetched successfully. 

3. Structure:

componets
models
screens

App.tsx: 
 RootStackParamList:
    Home: undefined;
    FoodNutritionCalculator:undefined;
    IdealBodyWeight:undefined;
    CalculateBMI:undefined;
    MifflinCaculator:undefined;
    ActivityCalory:undefined;


    App for Android, it can run on ios but layout changes. 