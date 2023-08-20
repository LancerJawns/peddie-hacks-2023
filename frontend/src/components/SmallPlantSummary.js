import React from 'react';

import {View, Image, Text, StyleSheet} from 'react-native';

import HealthIndicator from './HealthIndicator';

const SmallPlantSummary = ({howManyWeeksAgo, health}) => {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.graphicContainer}>
        <Image
          style={styles.graphicImage}
          source={require(`../assets/images/health2.png`)}
        />
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Text style={styles.statText}>
            {howManyWeeksAgo === 0
              ? 'This Week'
              : `${howManyWeeksAgo} ${
                  howManyWeeksAgo === 1 ? 'Week' : 'Weeks'
                } Ago`}
          </Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statText}>Health: </Text>
          <HealthIndicator health={health} size={16} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    marginBottom: 5,
    backgroundColor: 'rgb(212, 139, 66)',
  },
  graphicContainer: {
    width: 120,
    height: 120,
    // backgroundColor: 'yellow',
  },
  graphicImage: {
    // todo, fill mode
    width: 120,
    height: 120,
  },
  statsContainer: {
    width: 120,
    marginLeft: 20,
    // backgroundColor: 'blue',
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: 'GloriaHallelujah',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    color: 'black',
  },
});

export default SmallPlantSummary;
