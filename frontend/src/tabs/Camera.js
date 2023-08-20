import {Camera, CameraType, MediaLibrary} from 'expo-camera';
import {useState, useRef} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {uploadTrashImage} from '../scripts/user';

const CameraTab = ({navigation}) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraType = () =>
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );

  let camera;

  const snapPic = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({
      quality: 0,
    });

    if (!photo) return;

    MediaLibrary.saveToLibraryAsync('./temp/image.jpg');

    await uploadTrashImage('./temp/image.jpg');
  };
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Camera
        style={{flex: 1, width: '100%', height: '100%'}}
        type={type}
        ref={r => {
          camera = r;
        }}>
        <View style={{height: '100%'}}>
          <View
            style={{
              alignSelf: 'center',
              flex: 1,
              alignItems: 'center',
              height: '100%',
              flexDirection: 'column-reverse',
            }}>
            <TouchableOpacity
              onPress={snapPic}
              style={{
                width: 130,
                borderRadius: 4,
                backgroundColor: '#14274e',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Take picture
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {},
  buttonContainer: {},
  button: {},
  text: {},
});

export default CameraTab;
