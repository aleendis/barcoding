import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { prnm, data, deadline } = route.params;

  return (
    <View style={Styles.container}>
      <Text style={Styles.label}>��ǰ��: {prnm}</Text>
      <Text style={Styles.label}>��ǰ��ȣ: {data}</Text>
      <Text style={Styles.label}>�������: {deadline}</Text>
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
