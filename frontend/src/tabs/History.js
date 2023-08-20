import React, {useState, useEffect} from 'react';

import {FlatList, StyleSheet, SafeAreaView, View} from 'react-native';

import CloudHeader from '../components/CloudHeader';
import SmallPlantSummary from '../components/SmallPlantSummary';
import {getCurrentWeek, getWeeklyPlants} from '../scripts/user';

const HistoryTab = ({navigation}) => {
  // fetch this with auth token
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    (async () => {
      const currentWeek = (await getCurrentWeek()).weekId;
      const plants = await getWeeklyPlants();

      setHistoryData(
        plants
          //   .filter(e => e.weekId != currentWeek)
          .map(e => ({
            howManyWeeksAgo: currentWeek - e.weekId,
            health: e.plantScore,
          }))
          .sort((a, b) => a.howManyWeeksAgo - b.howManyWeeksAgo),
      );
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CloudHeader>Plant History</CloudHeader>
      <View style={styles.innerContainer}>
        <FlatList
          data={historyData}
          renderItem={(item, index) => {
            return <SmallPlantSummary key={index} {...item.item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(200, 210, 250)',
  },
  innerContainer: {
    paddingTop: 65,
  },
});

export default HistoryTab;
