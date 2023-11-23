import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

function Import({ route }) {
  const { data } = route.params;
  const {prnm} = route.prnm;
  const {deadline} = route.deadline;
  const [productNumber, setProductNumber] = useState(data);
  const [productName, setProductName] = useState(prnm);
  const [productdeadline, setProductdeadline] = useState(deadline);

  const handleProductNumberChange = (text) => {
    setProductNumber(text);
  };
  const handleProductNameChange = (text) => {
    setProductName(text);
  }
  const handleProductDeadlineChange = (text) => {
    setProductdeadline(text);
  }

  return (
    <View style={styles.container}>
      <Text>Product number: {data}</Text>
      <View style={styles.buttonContainer}>
        <Text>Input product number</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="0"
          value={productNumber} // Bind the input value to the productNumber state
          onChangeText={handleProductNumberChange} // Update the productNumber state
        />
        <TextInput
          style = {styles.input}
          placeholder="0"
          value={productName}
          onChangeText={handleProductNameChange}
          />
        <TextInput
          style = {styles.input}
          placeholder="0"
          value= {productdeadline}
          onChangeText={handleProductDeadlineChange}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
  },
});

export default Import;
