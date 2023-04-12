import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ListProductScreen(props) {
    const [products, setProducts] = useState();
    const { navigation, route } = props;

    useEffect(() => {
        fetch('http://172.20.10.2:3000/api/products', { method: 'GET' })
            .then(response => response.json())
            .then(json => setProducts(json.data));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 30, margin: 10 }}>Danh sách sản phẩm</Text>
            {
                <FlatList
                    data={products}
                    numColumns={1}
                    keyExtractor={item => item._id}
                    renderItem={({ item, index }) => {
                        return <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ProductItem', {product: item});
                            }}
                            style={styles.box}>
                            <Image
                                source={{ uri: item.image.replace("localhost", "172.20.10.2") }}
                                style={{ width: 100, height: 100, borderRadius: 10 }}
                            />
                            <View style={{
                                marginLeft: 15,
                                marginRight: 10,
                                flex: 1
                            }}>
                                <Text style={{
                                    color: '#ff5000',
                                    fontWeight: 500,
                                }}>{item.product_name}</Text>

                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={styles.text_name}>Price: </Text>
                                    <Text style={styles.text_value}>{item.price} $</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={styles.text_name}>Category: </Text>
                                    <Text style={styles.text_value}>{item.id_category.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
    },
    text_name: {
        color: 'gray',
        fontSize: 12,
        fontWeight: 500
    },
    text_value: {
        color: 'gray',
        fontSize: 12
    }
});