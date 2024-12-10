import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import * as NavigationBar from 'expo-navigation-bar';


import { useState, useEffect } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';

const colors = ["#6fd2f7", "#a2d9ce", "#f9af86"];

export default function App() {
  return (
    <SafeAreaProvider >
      <Main></Main>
    </SafeAreaProvider>
  );
}

function Main(){
  const insets = useSafeAreaInsets();
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("pomodoro" | "short" | "break");
  const [isActive, setIsActive] = useState(false);

  NavigationBar.setBackgroundColorAsync(colors[currentTime]);
  NavigationBar.setButtonStyleAsync("dark");

  useEffect(() => {
    let interval = null;

    if(isActive){
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    }else{
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop(){
    playSound();
    setIsActive(!isActive);
  }

  async function playSound(){
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sounds/sound.mp3")
    );
    await sound.playAsync();
  }

  return(
    <View style={{ flex: 1, gap: 25, paddingTop: insets.top + 25, paddingBottom: insets.bottom, backgroundColor: colors[currentTime], paddingHorizontal: 15 }}>
      <StatusBar backgroundColor={colors[currentTime]}   />
      <Text style={styles.text}>Pomodoro</Text>
      <Header setTime={setTime} currentTime={currentTime} setCurrentTime={setCurrentTime}></Header>
      <Timer time={time}></Timer>
      <Pressable style={ styles.buttom } onPress={handleStartStop}>
        <Text style={{ color: "#fff", fontWeight: "bold" , textAlign: "center", fontSize: 17}}>{ isActive ? "STOP" : "START" }</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  buttom: {
    backgroundColor: "#333333",
    padding: 19,
    borderRadius: 17
  }
});
