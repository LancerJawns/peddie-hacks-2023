import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';

import LargePlantSummary from '../components/LargePlantSummary';
import DayData from '../components/DayData';
import {getCurrentPlant} from '../scripts/user';

const WeeklyTab = ({navigation}) => {
  const weeklyTrackerData = [
    {
      day: 'S',
      state: 'missed',
      isToday: false,
    },
    {
      day: 'M',
      state: 'fed',
      isToday: false,
    },
    {
      day: 'T',
      state: 'fed',
      isToday: true,
    },
    {
      day: 'W',
      state: 'empty',
      isToday: false,
    },
    {
      day: 'T',
      state: 'empty',
      isToday: false,
    },
    {
      day: 'F',
      state: 'empty',
      isToday: false,
    },
    {
      day: 'S',
      state: 'fed',
      isToday: false,
    },
  ];
  //   const [weeklyTrackerData, setWeeklyData] = useState([]);
  const [plantHealth, setPlantHealth] = useState(0);
  const [plantStreak, setPlantStreak] = useState(0);

  useEffect(() => {
    (async () => {
      const currentWeek = await getCurrentPlant();

      console.log(currentWeek);

      setPlantHealth(currentWeek.score);
      setPlantStreak(currentWeek.streak);
    })();
  }, []);

  const dayLabelRenders = [];

  weeklyTrackerData.forEach((item, index) => {
    dayLabelRenders.push(<DayData key={index} {...item} />);
  });

  return (
    <SafeAreaView style={styles.container}>
      <LargePlantSummary health={plantHealth} streak={plantStreak} />
      <View style={styles.contentContainer}>
        <View style={styles.weekDataContainer}>{dayLabelRenders}</View>
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
