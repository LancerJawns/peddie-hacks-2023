import React, {useState, useEffect} from 'react';

import {FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';

import CloudHeader from '../components/CloudHeader';
import SmallPlantSummary from '../components/SmallPlantSummary';
import {getCurrentWeek, getWeeklyPlants} from '../scripts/user';

const HistoryTab = ({navigation}) => {
  // fetch this with auth token
  const [historyData, setHistoryData] = useState([]);
  //   [
  //     {
  //       howManyWeeksAgo: 1,
  //       health: 3,
  //     },
  //     {
  //       howManyWeeksAgo: 2,
  //       health: 4,
  //     },
  //     {
  //       howManyWeeksAgo: 3,
  //       health: 2,
  //     },
  //   ];

  useEffect(() => {
    (async () => {
      const currentWeek = await getCurrentWeek();
      const plants = await getWeeklyPlants();

      setHistoryData(
        plants
          //   .filter(e => e.weekId != currentWeek)
          .map(e => ({
            howManyWeeksAgo: currentWeek - e.weekId,
            health: e.plantScore,
          })),
      );
      console.log(
        plants
          //   .filter(e => e.weekId != currentWeek)
          .map(e => ({
            howManyWeeksAgo: currentWeek - e.weekId,
            health: e.plantScore,
          })),
      );
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CloudHeader>Plant History</CloudHeader>
      <FlatList
        data={historyData}
        renderItem={(item, index) => {
          return <SmallPlantSummary key={index} {...item.item} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240, 240, 250)',
  },
});

export default HistoryTab;
