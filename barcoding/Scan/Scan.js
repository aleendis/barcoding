import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedDataLocally] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (scannedData) {
      navigation.navigate('Import', { data: scannedData }); // 스캔된 데이터를 다음 스크린으로 전달
    }
  }, [scannedData, navigation]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedDataLocally(data);

    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Requesting camera permission</Text>
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && (
        <View style={styles.scanAgain}>
          <Text>Scan again?</Text>
          <Text style={styles.scanAgainText} onPress={() => setScanned(false)}>
            Tap Here
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scanAgain: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
  scanAgainText: {
    marginLeft: 10,
    color: 'blue',
  },
});

export default ScannerScreen;
