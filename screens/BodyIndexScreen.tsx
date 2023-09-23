import { View, StyleSheet, Text, SafeAreaView, TextInput, Button, Alert } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import InputForm from "../components/InputForm";
type Props = NativeStackScreenProps<RootStackParamList, "BodyIndex">;
export default function BodyIndexScreen({ navigation }: Props) {

  return (
    <SafeAreaView>
        <InputForm/>  
    </SafeAreaView>
  );
}