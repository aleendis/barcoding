import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

let scannedData = '';

export const setScannedData = (data) => {
    scannedData = data;
}

export const getScannedData = () => {
    return scannedData;
}

export function Import ({route}) {
    const{ data } = route.params;

return (
    <View style = {StyleSheet.container}>
        <Text> product number: {getScannedData}</Text>
        <View style = {StyleSheet.buttonContainer}>
            <Text>Input product number</Text>
            <TextInput
                keyboardType="numeric"
                style = {data}
                placeholder = '0'
                onChangeText={getScannedData}/>
        </View>
    </View>
)}

export default Import;