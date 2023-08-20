import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

import CloudHeader from './CloudHeader';
import HealthIndicator from './HealthIndicator';

const LargePlantSummary = ({health, streak}) => {
  const plantImage = Math.max(0, Math.min(4, health));

  return (
    <View style={styles.summaryContainer}>
      <CloudHeader>Weekly Tree</CloudHeader>
      <View style={styles.statContainer}>
        <Text style={styles.statText}>Health: </Text>
        <HealthIndicator health={health} size={16} />
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statText}>
          Streak: {streak} {streak === 1 ? 'Day' : 'Days'}
        </Text>
      </View>
      <View style={styles.graphicContainer}>
        <Image
          style={styles.graphicImage}
          source={require(`../assets/images/health2.png`)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: 'rgb(200, 210, 250)',
  },
  statContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: 'GloriaHallelujah',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    color: 'rgb(20, 20, 20)',
  },
  graphicContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },
  graphicImage: {
    flex: 1,
    margin: 20,
    marginBottom: 0,
    resizeMode: 'contain',
  },
});

export default LargePlantSummary;
