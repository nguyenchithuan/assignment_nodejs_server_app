import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen(props) {
    const { navigation, route } = props;

    const [username, setUsername] = useState('nguyenchithuan');
    const [password, setPassword] = useState('123');

    const [account, setAccount] = useState();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {/* ---- Username ---- */}
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <Text style={styles.text_bold}>Username:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setUsername(text);
                    }}
                    style={{ paddingVertical: 7 }}
                    value={username}
                    placeholder="Enter your username">
                </TextInput>
                <View style={{ height: 1, backgroundColor: 'black' }}></View>
                <Text style={{ color: 'red' }}></Text>
            </View>

            {/* ---- Password ---- */}
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <Text style={styles.text_bold}>Password:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setPassword(text);
                    }}
                    style={{ paddingVertical: 7 }}
                    value={password}
                    placeholder="Enter your password"
                    secureTextEntry={true}>
                </TextInput>
                <View style={{ height: 1, backgroundColor: 'black' }}></View>
                <Text style={{ color: 'red' }}></Text>
            </View>

            <View>
                <TouchableOpacity
                    onPress={() => {
                        fetch('http://172.20.10.2:3000/api/accounts/login',
                            {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    username, password
                                })
                            })
                            .then(response => response.json())
                            .then(json => {
                                console.log(json)
                                storeData(json.data.token); // dữ liệu vào AsyncStorage
                                navigation.navigate('UITab');
                            });

                    }}
                    style={styles.button}>
                    <Text style={{
                        color: "white",
                        padding: 10,
                    }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('RegisterScreen');
                    }}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        marginTop: 10
                    }}>
                    <Text style={{
                        color: 'black',
                        textDecorationLine: "underline"
                    }}>New account? Register now</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const storeData = async (token) => {
    try {
        const jsonToken = JSON.stringify(token);
        await AsyncStorage.setItem('tokenLogin', jsonToken)
    } catch (e) {
        console.log('Lỗi lữu token!');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        padding: 20,
    },
    text_bold: {
        color: 'black',
        fontWeight: "bold"
    },
    button: {
        backgroundColor: 'black',
        width: "50%",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 30
    },
});