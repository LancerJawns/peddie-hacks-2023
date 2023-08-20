import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, Button, Pressable} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {login} from '../scripts/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import CloudHeader from '../components/CloudHeader';
import {FAB} from 'react-native-elements';

const LoginTab = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // setTimeout(() => {
    //   navigation.navigate('Weekly', {
    //     // useful data now that ive done all the async reading in the step before
    //   });
    // }, 2000);
  }, []);

  const submitLogin = () => {
    login(username, password).then(
      () => {
        navigation.navigate('Weekly');
      },
      err => {
        console.log(err);
        setUsername('');
        setPassword('');
      },
    );
  };

  const goToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CloudHeader>Login</CloudHeader>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}></TextInput>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}></TextInput>
        <FAB
          title="Log In"
          overlayColor={'rgb(70, 150, 50)'}
          color={'rgb(70, 150, 50)'}
          fontFamily={'GloriaHallelujah'}
          onPress={submitLogin}
        />
        <br />
        <FAB
          title="Go to Signup"
          overlayColor={'rgb(70, 150, 50)'}
          color={'rgb(70, 150, 50)'}
          fontFamily={'GloriaHallelujah'}
          onPress={goToSignup}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontFamily: 'GloriaHallelujah',
    zIndex: 10,
  },
  button: {
    fontFamily: 'GloriaHallelujah',
    backgroundColor: 'rgb(70, 150, 50)',
    color: 'white',
    // width: 15,
    height: 30,
    borderRadius: 100,
  },
  title: {
    fontSize: 32,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(200, 210, 250)',
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flex: 1,
  },
  label: {
    fontFamily: 'GloriaHallelujah',
  },
});

export default LoginTab;
