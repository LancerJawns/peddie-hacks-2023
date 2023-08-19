import React from "react"

import { View, Text, StyleSheet } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons"

const DayData = ({ day, state, isToday }) => {
    return (
        <View style={styles.container}>
            <View style={styles.dayContainer}>
                <Text style={styles.dayText}>
                    {
                        day
                    }
                </Text>
            </View>
            <View style={styles.stateContainer}>
                {
                    state != "empty" && (
                        <FontAwesomeIcon icon={state == "fed" ? faCheck : faX} color={state == "fed" ? "rgb(120, 250, 90)" : "rgb(250, 100, 80)"} size={18} />
                    )
                }
            </View>
            <View style={styles.todayContainer}>
                {
                    isToday && (
                        <View style={styles.todayMarker} />
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        padding: 5,
        paddingTop: 0,
        marginHorizontal: 2,
        borderRadius: 5,
        backgroundColor: "rgb(40, 20, 0)"
    },
    dayContainer: {
        width: "100%",
        height: 18,
        paddingTop: 2,
        alignItems: "center"
    },
    dayText: {
        fontSize: 12,
        fontWeight: "500",
        color: "rgb(250, 250, 100)"
    },
    stateContainer: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: "rgb(70, 150, 50)",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    todayContainer: {
        width: "100%",
        height: 4,
        marginTop: 4
    },
    todayMarker: {
        width: "100%",
        height: "100%",
        borderRadius: 2,
        backgroundColor: "rgb(120, 250, 90)"
    }
})

export default DayData