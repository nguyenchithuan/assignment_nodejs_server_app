import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductItem(props) {
    const { navigation, route } = props;
    let product = route.params.product;
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 30, margin: 20 }}>Chi tiết sản phẩm</Text>
            <Image
                source={{ uri: product.image.replace("localhost", "172.20.10.2") }}
                style={{ width: 250, height: 200, borderRadius: 10, alignSelf: 'center'}}
            />
            <Text style={{
                color: '#ff5000',
                fontWeight: 500,
                fontSize: 20,
                marginTop: 20
            }}>{product.product_name}</Text>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={styles.text_name}>Price: </Text>
                <Text style={styles.text_value}>{product.price} $</Text>
            </View>

            <View>
                <Text style={styles.text_name}>Description: </Text>
                <Text style={styles.text_value}>{product.description} $</Text>
            </View>

            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={styles.text_name}>Category: </Text>
                <Text style={styles.text_value}>{product.id_category.name}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
        padding: 10
    },
    text_name: {
        color: 'black',
        fontSize: 14,
        fontWeight: 600,
        marginTop: 10
    },
    text_value: {
        color: 'black',
        fontSize: 14,
        marginTop: 10
    }
});