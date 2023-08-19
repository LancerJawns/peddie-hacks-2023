import React, { useEffect } from "react"

import { View, Text, StyleSheet } from "react-native"

const AuthTab = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Weekly", {
                // useful data now that ive done all the async reading in the step before
            })
        }, 2000)
    }, [])

    return (
        <View>
            <Text>Hello Auth Tab</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default AuthTab