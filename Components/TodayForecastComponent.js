
import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from "axios";

const API_KEY = '6b1d04742ce2b938b2d0edaca5ee4450';
const TodayForecastComponent = ({ navigation }) => {
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherData(position.coords.latitude, position.coords.longitude)
            },
            (err) => setError(err.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);
    const getWeatherConditionImage  = () => {
        console.log(weatherData.weather[0].icon)
        if (weatherData.weather[0].icon === '01d') {
            return require('/images/01d.png');
        } else if (weatherData.weather[0].icon === '01n') {
            return require('/images/01n.png');
        } else if (weatherData.weather[0].icon === '02d') {
            return require('/images/02d.png');
        }  else if (weatherData.weather[0].icon === '02n') {
            return require('/images/02n.png');
        } else if (weatherData.weather[0].icon === '03d') {
            return require('/images/03d.png');
        } else if (weatherData.weather[0].icon === '03n') {
            return require('/images/03n.png');
        } else if (weatherData.weather[0].icon === '04d') {
            return require('/images/04d.png');
        } else if (weatherData.weather[0].icon === '04n') {
            return require('/images/04n.png');
        }  else if (weatherData.weather[0].icon === '09d') {
            return require('/images/09d.png');
        } else if (weatherData.weather[0].icon === '09n') {
            return require('/images/09n.png');
        } else if (weatherData.weather[0].icon === '10d') {
            return require('/images/10d.png');
        } else if (weatherData.weather[0].icon === '10n') {
            return require('/images/10n.png');
        } else if (weatherData.weather[0].icon === '13d') {
            return require('/images/13d.png');
        } else if (weatherData.weather[0].icon === '13n') {
            return require('/images/13n.png');
        } else if (weatherData.weather[0].icon === '50d') {
            return require('/images/50d.png');
        } else if (weatherData.weather[0].icon === '50n') {
            return require('/images/50n.png');
        }else {
            return require('/images/4.jpg');
        }
    };

    const getSunriseTime  = () => {
        const unixTimestamp = weatherData.sys.sunrise;

        const timestampInMilliseconds = unixTimestamp * 1000;

        const date = new Date(timestampInMilliseconds);

        return  date.toLocaleTimeString();
    }

    const getSunsetTime  = () => {
        const unixTimestamp = weatherData.sys.sunset;

        const timestampInMilliseconds = unixTimestamp * 1000;

        const date = new Date(timestampInMilliseconds);

        return  date.toLocaleTimeString();
    }

    const getWeatherTime  = () => {
        const unixTimestamp = weatherData.dt;

        const timestampInMilliseconds = unixTimestamp * 1000;

        const date = new Date(timestampInMilliseconds);

        return  date.toLocaleTimeString();
    };
    const fetchWeatherData = async (lat, long) => {
        try {
            console.log(long);
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (

        <View style={styles.container}>
            {weatherData ? (
                <>
                    <View style={styles.sun}>
                    <View style={styles.sunrise}>
                    <Image
                        source={require('/images/sunrise.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.text_name}>{getSunriseTime()}</Text>
                    <Text style={styles.sunrisetext}>Sunrise</Text>
                    </View>

                    <View style={styles.sunrise}>
                        <Image
                            source={require('/images/sunset.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.text_name}>{getSunsetTime()}</Text>
                        <Text style={styles.sunsettext}>Sunset</Text>
                    </View>
                    </View>
                    <View style={styles.weatherForecastContainer}>
                        <Text style={styles.temp}>{weatherData.main.temp} °C</Text>
                        <Text style={styles.desc}>{weatherData.weather[0].description}</Text>
                        <View style={styles.data}>
                            <Image
                                source={getWeatherConditionImage()}
                                style={styles.icon}
                            />

                            <Text style={styles.measures}>{getWeatherTime()}</Text>
                        </View>
                    </View>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>


    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    weatherForecastContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20,
        paddingTop: 10,
        paddingRight: 30,
        paddingBottom: 10,
        paddingLeft: 30,
    },
    text_name: {
        color: 'black',
        marginLeft: 5,
        fontSize: 24
    },
    icon: {
        width: 80,
        height: 80
    },
    data: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
    },
    text_temp: {
        color: 'white',
        flexDirection: 'row',
        fontSize: 50
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateTime: {
        color: 'white',
        fontSize: 18,
    },
    sunrisetext: {
        color: 'orange',
        fontSize: 24
    },
    sunsettext: {
        color: 'red',
        fontSize: 24
    },
    sunrise: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
    },
    sun: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10
    },
    text_data: {
        color: 'gray'
    },
    measures: {
        color: 'black',
    },
    temp: {
        color: 'black',
        fontSize: 20
    },
    desc: {
        color: 'gray',
        textTransform: 'uppercase'
    }
    });

export default TodayForecastComponent;
