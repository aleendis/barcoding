import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { prnm, data, deadline } = route.params;

  return (
    <View style={Styles.container}>
      <Text style={Styles.label}>상품명: {prnm}</Text>
      <Text style={Styles.label}>상품번호: {data}</Text>
      <Text style={Styles.label}>유통기한: {deadline}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProductDetailScreen;
