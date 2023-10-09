
import React from 'react';
import {View, StyleSheet} from 'react-native';
import CurrentWeatherDataComponent from '../Components/CurrentWeatherDataComponent';

const WeatherScreen = () => {
    return (
        <View style={styles.container}>
            <CurrentWeatherDataComponent />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default WeatherScreen;
