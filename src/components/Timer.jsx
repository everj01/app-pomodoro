import { View, Text, StyleSheet } from "react-native"

export default function Timer({time}){
    const formatTime = `${ Math.floor(time / 60).toString().padStart(2, '0')}:${ (time % 60).toString().padStart(2, '0') }`;
    return(
        <View style={styles.container}>
            <Text style={styles.time}>{ formatTime }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        backgroundColor: "#F2F2F2",
        borderRadius: 17,  
        padding: 20,
        justifyContent: "center"
    },
    time: {
        fontSize: 80,
        fontWeight: "bold",
        textAlign: "center",
        color: "#4f4f4f"
    }
});