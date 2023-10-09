import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList}
    from '@react-navigation/drawer';
import WeatherScreen from './screens/WeatherScreen';
import {View, ImageBackground, StyleSheet, Text, Image} from "react-native";
import TodayForecastScreeen from "./screens/TodayForecastScreeen";
import { Feather} from "@expo/vector-icons";


const Drawer = createDrawerNavigator();

const getBackgroundImage = () => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 6 && currentHour < 18) {
        return require('/images/1.jpg');
    } else {
        return require('/images/4.jpg');
    }
};
function HomeScreen() {
    return (
        <ImageBackground
            source={getBackgroundImage()}
            style={styles.background}
        >
        <View style={{ flex: 1, alignItems: 'center',
            justifyContent: 'center' }}>
            <WeatherScreen />
        </View>
        </ImageBackground>
    );
}
function TodayForecast() {
    return (
        <ImageBackground
            source={getBackgroundImage()}
            style={styles.background}
        >
            <View style={{ flex: 1, alignItems: 'center',
                justifyContent: 'center' }}>
                <TodayForecastScreeen />
            </View>
        </ImageBackground>
    );
}

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.headerContainer}>
                <Image source={require('./images/weather-app.png')} style={styles.logo} />
                <Text>Weather App</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};
export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home"
                              drawerContent={(props) => <CustomDrawerContent {...props}/>}>
                 <Drawer.Screen name="Current Weather" component={HomeScreen}
                                options={{
                                    drawerIcon: ({ color, size }) => (
                                        <Feather name="calendar" color={color} size={size} />
                                    ),
                                }}/>
                <Drawer.Screen name="Today Forecast" component={TodayForecast}
                               options={{
                                   drawerIcon: ({ color, size }) => (
                                       <Feather name="moon" color={color} size={size} />
                                   ),
                               }}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
    },
    logo: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
});
