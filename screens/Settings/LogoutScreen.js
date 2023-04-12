import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoutScreen(props) {
    const { navigation, route } = props;
    const [account, setAccount] = useState();
    const [token, setToken] = useState();
    const ref = useRef(1); // có thể gán

    // lấy dữ liệu token
    getData().then(async (dataToken) => {
        console.log(dataToken);
        await setToken(dataToken);
    }).then(() => {
        // Lấy profile
        fetch('http://172.20.10.2:3000/api/accounts/profile', {
            method: 'GET', headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log(ref.current);
                if (ref.current == 2) { // cho nó chạy 2 lần mới lấy ra được dữ liệu
                    setAccount(json.data);
                }
                ref.current += 1;
            });
    });

    return (
        // Có data thì mới được hiển thị dữ liệu
        account && <View style={styles.container}>
            {
                account.avata ? <Image
                    source={{ uri: account.avata.replace('localhost', '172.20.10.2') }}
                    style={styles.image}
                /> : <Image
                    source={{uri: 'https://tse2.mm.bing.net/th?id=OIP.PoS7waY4-VeqgNuBSxVUogAAAA&pid=Api&P=0'}}
                    style={styles.image}
                />
            }
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text_name}>Username: </Text>
                <Text style={styles.text_value}>{account.username}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text_name}>Email: </Text>
                <Text style={styles.text_value}>{account.email}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text_name}>Role: </Text>
                <Text style={styles.text_value}>{account.role}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    fetch('http://172.20.10.2:3000/api/accounts/logout',
                        {
                            method: 'GET',
                            headers: {
                                'Authorization': 'Bearer ' + token
                            },
                        })
                        .then(response => response.json())
                        .then(json => {
                            console.log(json)
                            navigation.navigate('LoginScreen');
                        });
                }}
                style={styles.button}
            >
                <Text style={{ color: 'white' }}>Đăng Xuất</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('tokenLogin');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log('Lỗi lấy token');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 50,
    },
    image: {
        width: 120,
        height: 120,
        margin: 20,
        borderRadius: 100,
        alignSelf: 'center'
    },
    text_name: {
        color: 'black',
        fontSize: 16,
        fontWeight: 500,
        marginTop: 5
    },
    text_value: {
        color: 'black',
        fontSize: 16,
        marginTop: 5
    },
    button: {
        width: "100%",
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        position: 'absolute',
        bottom: 10
    },
});