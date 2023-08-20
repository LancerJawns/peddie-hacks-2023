import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, Button} from 'react-native';
import {FAB} from 'react-native-elements';
import {SafeAreaView} from 'react-native';

import LargePlantSummary from '../components/LargePlantSummary';
import DayData from '../components/DayData';
import Camera from './Camera';
import {getCurrentPlant, getCurrentWeek} from '../scripts/user';

const WeeklyTab = ({navigation}) => {
  const [weeklyTrackerData, setWeeklyData] = useState([]);
  const [plantHealth, setPlantHealth] = useState(0);
  const [plantStreak, setPlantStreak] = useState(0);

  const [currentDay, setCurrentDay] = useState(0);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    (async () => {
      const currentPlant = await getCurrentPlant();
      const currentWeek = await getCurrentWeek();

      console.log(currentWeek);
      setPlantHealth(currentPlant.score);
      setPlantStreak(currentPlant.streak);
      setWeeklyData(currentPlant.trashStatus);
      setCurrentDay(currentWeek.currentDay);
    })();
  }, []);

  const showTheCamera = () => {
    setShowCamera(true);
  };

  const dayLabelRenders = weeklyTrackerData.map((e, i) => (
    <DayData key={i} state={e} isToday={currentDay === i} day={days[i]} />
  ));

  if (showCamera)
    return (
      <View>
        <Camera />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <LargePlantSummary health={plantHealth} streak={plantStreak} />
      <View style={styles.contentContainer}>
        <View style={styles.weekDataContainer}>{dayLabelRenders}</View>
        {/* ! TODO Change to icon  */}
        {/* RAF, you got this! */}
        <FAB
          title="Record Trash"
          overlayColor={'rgb(70, 150, 50)'}
          color={'rgb(70, 150, 50)'}
          onPress={showTheCamera}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240, 240, 250)',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgb(96, 59, 20)',
  },
  weekDataContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default WeeklyTab;
