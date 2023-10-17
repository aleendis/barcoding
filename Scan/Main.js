import React from "react";
import { View, Text, Button, PermissionsAndroid, StatusBar, StyleSheet} from "react-native";

const requestCameraPermission = async() => {
    try{
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission',
                message: 'access to your camera' + 'good',
                buttonNeutral: 'Ask me later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            console.log('you can use the camera');
        } else{
                console.log('permission denied');
        }
    }   catch(err){
            console.warn(err);
        }
}


const App = () => (
  <View style={styles.container}>
    <Text style={styles.item}>Try permissions</Text>
    <Button title="request permissions" onPress={requestCameraPermission} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;