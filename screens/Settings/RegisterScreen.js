import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen(props) {
    const { navigation, route } = props;

    // mặc tạo ở app là user
    const [username, setUsername] = useState('nguyenvan');
    const [password, setPassword] = useState('123');
    const [email, setEmail] = useState('ten@gmail.com');
    const [phone, setPhone] = useState('0921341234');


    const [account, setAccount] = useState();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

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

            {/* ---- Email ---- */}
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <Text style={styles.text_bold}>Email:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    style={{ paddingVertical: 7 }}
                    value={email}
                    placeholder="Enter your email"
                >
                </TextInput>
                <View style={{ height: 1, backgroundColor: 'black' }}></View>
                <Text style={{ color: 'red' }}></Text>
            </View>

            {/* ---- Phone ---- */}
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <Text style={styles.text_bold}>Phone:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setPhone(text);
                    }}
                    style={{ paddingVertical: 7 }}
                    value={phone}
                    placeholder="Enter your phone"
                >
                </TextInput>
                <View style={{ height: 1, backgroundColor: 'black' }}></View>
                <Text style={{ color: 'red' }}></Text>
            </View>

            <View>
                <TouchableOpacity
                    onPress={() => {
                        fetch('http://172.20.10.2:3000/api/accounts/reg', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                username : username,
                                password : password,
                                email: email,
                                phone: phone,
                                role: 'user'
                            })
                        })
                        .then(response => response.json())
                        .then(json => {
                            console.log(json + " - Đăng ký")
                            navigation.navigate('LoginScreen');
                        });
                    }}
                    style={styles.button}>
                    <Text style={{
                        color: "white",
                        padding: 10,
                    }}>Save</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </View>
    );
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