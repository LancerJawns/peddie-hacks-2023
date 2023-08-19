import React, { useState, useEffect } from "react"

import PushNotificationIOS from "@react-native-community/push-notification-ios"

import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faTree, faLeaf, faCogs } from "@fortawesome/free-solid-svg-icons"

import AuthTab from "./tabs/Auth"
import WeeklyTab from "./tabs/Weekly"
import HistoryTab from "./tabs/History"
import SettingsTab from "./tabs/Settings"

const App = () => {
    // const removeNotificationHandler = (notification) => {
    //     const isForegroundNotification = notification.getData().userInteraction === 1 // is triple equal really necessary? idk but type cast might be sloppy from objective c
    
    //     if(isForegroundNotification){
    //         // should navigate to weekly tab, might be a hassle since no navigation instance available
    //     } else {
    //         // handle notification from background (nothing necessary here either)
    //     }

    //     notification.finish(PushNotificationIOS.FetchResult.NoData)
    // }

    // useEffect(() => {
    //     PushNotificationIOS.addEventListener("notification", removeNotificationHandler)

    //     return () => {
    //         PushNotificationIOS.removeEventListener("notification")
    //     }
    // }) // should we specify empty dependency array, nothing provided on docs?

    const Tab = createBottomTabNavigator()

    const tabBarIcons = {
        "Weekly": faTree,
        "History": faLeaf,
        "Settings": faCogs
    }

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={"Auth"} screenOptions={({ route }) => ({
                tabBarShowLabel: true,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "rgb(40, 20, 0)",
                    borderTopWidth: 0,
                    height: 90,
                    paddingTop: 10
                },
                tabBarLabelStyle: {
                    fontFamily: "GloriaHallelujah",
                    fontSize: 16,
                    marginTop: 5
                },
                tabBarActiveTintColor: "rgb(120, 250, 90)",
                tabBarInactiveTintColor: "rgb(70, 150, 50)",
                tabBarIcon: ({ color }) => <FontAwesomeIcon icon={tabBarIcons[route.name]} size={18} color={color} />
            })}>
                <Tab.Screen name={"Auth"} component={AuthTab} options={{
                    tabBarButton: () => null
                }} />
                <Tab.Screen name={"Weekly"} component={WeeklyTab} />
                <Tab.Screen name={"History"} component={HistoryTab} />
                <Tab.Screen name={"Settings"} component={SettingsTab} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App