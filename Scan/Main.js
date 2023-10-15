import React from "react";
import { View, Text, Button, PermissionsAndroid, StatusBar} from "react-native";

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


function Start({navigation}) {
  return (
    <View>
      <Text>Start!</Text>
      <Button title = "request permission" onPress={requestCameraPermission} />
    </View>
  );
}

export default Start;