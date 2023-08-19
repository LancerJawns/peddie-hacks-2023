import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {login} from '../scripts/auth';

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
    <View>
      <Text style={styles.title}>Log In</Text>
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
      <Button onPress={submitLogin} title="Log in" />
      <br />
      <Button onPress={goToSignup} title="Go to Sign Up" />
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
