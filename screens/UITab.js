import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import ListProductScreen from "./products/ListProductScreen";
import LogoutScreen from "./Settings/LogoutScreen";

const Tab = createBottomTabNavigator();

function UITab(props) {
    let screenOptions = ({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ff5000',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused }) => {
            let screenName = route.name;
            let nameIcon = '';
            if (screenName == 'ListProductScreen') {
                nameIcon = 'list'
            } else if (screenName == "LogoutScreen") {
                nameIcon = "gear";
            }

            return <Icon
                name={nameIcon}
                size={25}
                color={focused ? '#ff5000' : 'gray'}
            />
        }
    })

    return <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
            name="ListProductScreen"
            component={ListProductScreen}
            options={{
                tabBarLabel: 'Products'
            }}
        />
        <Tab.Screen
            name="LogoutScreen"
            component={LogoutScreen}
            options={{
                tabBarLabel: 'Settings'
            }}
        />
    </Tab.Navigator>
}

export default UITab;