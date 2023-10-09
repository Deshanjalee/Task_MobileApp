
import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { EvilIcons } from '@expo/vector-icons';
import axios from "axios";

const API_KEY = 'da44df3954ca8190f59b3536b294f132';
const CurrentWeatherDataComponent = ({ navigation }) => {
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherData(position.coords.latitude, position.coords.longitude)
            },
            (err) => setError(err.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const formattedDateTime = now.toLocaleString('en-US', { weekday: 'long', year: 'numeric'
                , month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }); // Adjust the format as needed
            setCurrentDateTime(formattedDateTime);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    const getWeatherConditionImage  = () => {
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

    const fetchWeatherData = async (lat, long) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const getWeatherTime  = () => {
        const unixTimestamp = weatherData.dt;

        const timestampInMilliseconds = unixTimestamp * 1000;

        const date = new Date(timestampInMilliseconds);

        return  date.toLocaleTimeString();
    };

    return (

        <View style={styles.container}>
            {weatherData ? (
                <>
                    <View style={styles.current}>
                    <Text style={styles.text_name}>
                        <EvilIcons name="location" size={24} color="white" />{weatherData.name}</Text>
                    <Text style={styles.dateTime}>{currentDateTime}</Text>
                    <View style={styles.row}>
                        <Text style={styles.text_temp}>{weatherData.main.temp}°</Text>
                        <Image
                            source={getWeatherConditionImage()}
                            style={styles.icon}
                        />
                    </View>
                    <Text style={styles.text_name}>{weatherData.weather[0].description}</Text>
                    </View>
                    <View style={styles.weatherDataContainer}>
                        <View style={styles.data}>
                            <Image
                                source={require('/images/img.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.text_data}>{weatherData.main.temp_max} °C</Text>
                            <Text style={styles.measures}>Max Temp</Text>
                        </View>

                        <View style={styles.data}>
                            <Image
                                source={require('/images/humidity.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.text_data}>{weatherData.main.humidity} %</Text>
                            <Text style={styles.measures}>Humidity</Text>
                        </View>
                        <View style={styles.data}>
                            <Image
                                source={require('/images/wind.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.text_data}>{weatherData.wind.speed} m/s</Text>
                            <Text style={styles.measures}>Wind</Text>
                        </View>
                    </View>
                    <View style={styles.weatherForecastContainer}>
                        <View style={styles.data}>
                            <Image
                                source={getWeatherConditionImage()}
                                style={styles.icon}
                            />
                            <Text style={styles.text_data}>{weatherData.main.temp} °C</Text>
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

        alignItems: 'center',
    },
    text_name: {
        color: 'white',
        marginLeft: 5,
        fontSize: 24,
        textTransform: 'uppercase'
    },
    icon: {
        width: 50,
        height: 50
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
    current: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10
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
    weatherDataContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20
    },
    weatherForecastContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20
    },
    text_data: {
        color: 'gray'
    },
    measures: {
        color: 'black',
        fontSize: 20
    }
});

export default CurrentWeatherDataComponent;
