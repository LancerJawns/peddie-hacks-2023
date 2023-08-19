import React from "react"

import { FlatList, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native"

import CloudHeader from "../components/CloudHeader"
import SmallPlantSummary from "../components/SmallPlantSummary"

const HistoryTab = ({ navigation }) => {
    // fetch this with auth token
    const historyData = [
        {
            howManyWeeksAgo: 1,
            health: 3
        },
        {
            howManyWeeksAgo: 2,
            health: 4
        },
        {
            howManyWeeksAgo: 3,
            health: 2
        },
        {
            howManyWeeksAgo: 4,
            health: 5
        }
    ]

    return (
        <SafeAreaView style={styles.container}>
            <CloudHeader>Plant History</CloudHeader>
            <FlatList data={historyData} renderItem={(item, index) => {
                return (
                    <SmallPlantSummary key={index} {...item} />
                )
            }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(240, 240, 250)"
    }
})

export default HistoryTab