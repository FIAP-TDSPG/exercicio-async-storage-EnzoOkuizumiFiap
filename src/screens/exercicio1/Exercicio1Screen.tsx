import { Alert, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_SOMA } from "../../constants/Keys";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';

export default function Exercicio1() {
    const [count, setCount] = useState(0);

    async function handlerSomar() {
        try {
            const soma = count + 1;
            setCount(soma);

            await AsyncStorage.setItem(STORAGE_SOMA, JSON.stringify(soma));

        } catch (error) {
            Alert.alert("Erro: " + error);
        }
    }

    async function handlerZerar() {
        try {
            await AsyncStorage.removeItem(STORAGE_SOMA);
            count > 0 ? setCount(0) : Alert.alert("Contador zerado", "Pare de CLICAR PARA ZERAR MONGOL!");
        } catch (error) {
            Alert.alert("Erro: " + error);
        }
    }

    useEffect(() => {
        (async () => {
            const raw = await AsyncStorage.getItem(STORAGE_SOMA);
            const atual = raw !== null ? JSON.parse(raw) : 0;
            setCount(atual);
        })();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ padding: 10, backgroundColor: "#66dbff", borderRadius: 10 }}>Quantidade de cliques: {count}</Text>
                <View style={{ flexDirection: "row", gap: 10, margin: "auto", marginTop: 10 }}>
                    <TouchableOpacity onPress={handlerSomar} style={{ padding: 7, backgroundColor: "#47c62b", borderRadius: 10 }}>
                        <Text>Clique!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlerZerar} style={{ padding: 7, backgroundColor: "#f15353", borderRadius: 10 }}>
                        <Text>ZERAR!</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}