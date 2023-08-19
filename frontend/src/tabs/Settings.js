import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getUserData, setReminderTime} from '../scripts/user';

const SettingsTab = ({navigation}) => {
  const [reminderTime, setReminderTime] = useState(new Date());

  useEffect(() => {
    (async () => {
      const userData = await getUserData();

      setReminderTime(new Date(userData.data.plantTime));
    })();
  }, []);

  const changeTime = () => changePlantTime(reminderTime);

  return (
    <View>
      <Text>Daily Plant Reminder Time</Text>
      <DateTimePicker
        mode="time"
        onChange={setReminderTime}
        value={reminderTime}
      />
      <Button onPress={changeTime} title="Save" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingsTab;
