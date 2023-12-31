import React from 'react';

import {View, StyleSheet, Text} from 'react-native';

const CloudBottom = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.cloudBottomPuff,
          left: -40,
          top: -30,
          width: 80,
          height: 60,
        }}
      />
      <View
        style={{
          ...styles.cloudBottomPuff,
          left: 30,
          top: -50,
          width: 100,
          height: 100,
        }}
      />
      <View
        style={{
          ...styles.cloudBottomPuff,
          left: 120,
          top: -40,
          width: 100,
          height: 80,
        }}
      />
      <View
        style={{
          ...styles.cloudBottomPuff,
          left: 210,
          top: -30,
          width: 60,
          height: 60,
        }}
      />
      <View
        style={{
          ...styles.cloudBottomPuff,
          left: 260,
          top: -30,
          width: 100,
          height: 80,
        }}
      />
      <View
        style={{
          ...styles.cloudBottomPuff,
          left: 350,
          top: -20,
          width: 60,
          height: 60,
        }}
      />
    </View>
  );
};

const CloudHeader = ({children}) => {
  return (
    <React.Fragment>
      <View style={styles.cloudHeaderContainer}>
        <Text style={styles.cloudHeaderText}>{children}</Text>
      </View>
      <CloudBottom />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  cloudBottomContainer: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: 'rgb(200, 210, 250)',
  },
  cloudBottomPuff: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'rgb(240, 240, 250)',
    zIndex: -1000,
  },
  cloudHeaderContainer: {
    paddingVertical: 20,
    backgroundColor: 'rgb(240, 240, 250)',
    zIndex: 100,
  },
  cloudHeaderText: {
    fontFamily: 'GloriaHallelujah',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    color: 'rgb(50, 50, 50)',
  },
});

export default CloudHeader;
