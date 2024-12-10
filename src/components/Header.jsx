import { View, Text, Pressable, StyleSheet } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];
const colors = ["#d4f2fd", "#e8fffa", "#ffe8db"];
const colorsPressed = ["#71adc3", "#4fb29d", "#c57b52"];

export default function Header({setTime, currentTime, setCurrentTime}){
    const handlePress = (index) => {
        const newTime = () =>  {
            switch(index){
                case 0: return 25; 
                case 1: return 5; 
                default: return 15; 
            }
        };
        setCurrentTime(index);
        setTime(newTime() * 60);
    }

    return(
        <View style={styles.listItems}>
            {options.map((item, index) => (
                <Item item={item} key={index} index={index} currentTime={currentTime} handlePress={handlePress }></Item>
            ))}
        </View>
    );
}

function Item({index, item, handlePress , currentTime}){
    const bgColor = () => {
        return  { backgroundColor: currentTime === index ? colorsPressed[currentTime] : colors[currentTime] };
    };
    const textColor = () => {
        return  { color: currentTime === index ? '#fff' : '#000' };
    };
    return(
        <Pressable 
        style={[styles.item, bgColor()]} 
        onPress={() => { handlePress(index); }}  >
            <Text style={[textColor()]} >{item}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    listItems: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',  
    },
    item: {
       paddingVertical: 10,
       paddingHorizontal: 16,
       borderRadius: 17, 
    }
});