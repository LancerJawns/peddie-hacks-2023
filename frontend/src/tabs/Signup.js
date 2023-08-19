import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {login} from '../scripts/auth';
import {register} from '../scripts/auth';

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

  const submitSignup = () => {
    register(username, password).then(
      () => {
        console.log('cool');
        navigation.navigate('Login');
      },
      err => {
        console.log(err);
        setUsername('');
        setPassword('');
      },
    );
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <Text style={styles.title}>Sign Up</Text>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}></TextInput>
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        inputMode="password"></TextInput>
      <Button onPress={submitSignup} title="Sign up" />
      <br />
      <Button onPress={goToLogin} title="Go to Log In" />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 32,
  },
});

export default LoginTab;
