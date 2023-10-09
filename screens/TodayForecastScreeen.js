
import React from 'react';
import {View, StyleSheet} from 'react-native';
import TodayForecastComponent from "../Components/TodayForecastComponent";

const TodayForecastScreeen = () => {
    return (
        <View style={styles.container}>
            <TodayForecastComponent />
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

export default TodayForecastScreeen;
