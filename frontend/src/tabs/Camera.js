import {Camera as ExpoCamera, CameraType} from 'expo-camera';
import {useState, useRef} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';

const Camera = ({navigation}) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = ExpoCamera.useCameraPermissions();

  // if (!permission) {
  //   // Camera permissions are still loading
  //   return <View />;
  // }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet
  //   return (
  //     <View style={styles.container}>
  //       <Text style={{textAlign: 'center'}}>
  //         We need your permission to show the camera
  //       </Text>
  //       <Button onPress={requestPermission} title="grant permission" />
  //     </View>
  //   );
  // }

  const toggleCameraType = () =>
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );

  let camera;

  const snapPic = async () => {
    if (!camera) return;
    const photo = await ExpoCamera.takePictureAsync();

    if (!photo) return;

    await uploadTrashImage(photo.base64);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ExpoCamera
        style={styles.camera}
        type={type}
        ref={r => {
          camera = r;
        }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <View
            style={{
              alignSelf: 'center',
              flex: 1,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={snapPic}
              style={{
                width: 70,
                height: 70,
                bottom: 0,
                borderRadius: 50,
                backgroundColor: '#fff',
              }}
            />
          </View>
        </View>
      </ExpoCamera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  camera: {},
  buttonContainer: {},
  button: {},
  text: {},
});

export default Camera;
