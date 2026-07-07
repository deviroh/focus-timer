import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';
import Countdown from '../features/Countdown';
import { ONE_SECOND_IN_MILLISECOND, FIVE_MINUTES_IN_MILLISECONDS, TEN_MINUTES_IN_MILLISECONDS, ONE_HOUR_IN_MILLISECONDS } from '../utils/constants';

export default function Timer({ focusSubject }) {
  const [isStarted, setIsStarted] = useState(false);
  const [milliseconds, setMilliseconds] = useState(10000);
  const [progress, setProgress] = useState(1);
  const vibrationPattern = [
    1 * ONE_SECOND_IN_MILLISECOND,
    2 * ONE_SECOND_IN_MILLISECOND,
    3 * ONE_SECOND_IN_MILLISECOND,
    5 * ONE_SECOND_IN_MILLISECOND,
    6 * ONE_SECOND_IN_MILLISECOND,
    7 * ONE_SECOND_IN_MILLISECOND,
  ]

  function increaseFocusTime() {
    setMilliseconds(time => {
      let updatedTime = time + FIVE_MINUTES_IN_MILLISECONDS;
      return updatedTime < ONE_HOUR_IN_MILLISECONDS ? updatedTime : time;
    });
    setIsStarted(false);
  }

  function decreaseFocusTime() {
    setMilliseconds(time => {
      let updatedTime = time - FIVE_MINUTES_IN_MILLISECONDS;
      return updatedTime > 0 ? updatedTime : time;
    });
    setIsStarted(false);
  }

  function startTimer() {
    if(milliseconds > 0) setIsStarted(true);
  }

  function resetTimer() {
    setMilliseconds(0);
    setIsStarted(false);
  }

  return (
    <View style={styles.container}>
      <Countdown focusSubject={focusSubject} milliseconds={milliseconds} setMilliseconds={setMilliseconds} isPaused={!isStarted} onProgress={setProgress} onEnd={() => { Vibration.vibrate(vibrationPattern) }}/>
      <View>
        <ProgressBar />
      </View>
      <View style={styles.buttonWrapper}>
        <Button mode='outlined' onPress={decreaseFocusTime}>-5</Button>
        <Button mode='outlined' style={styles.startButton} onPress={() => setMilliseconds(TEN_MINUTES_IN_MILLISECONDS)}>10</Button>
        <Button mode='outlined' onPress={increaseFocusTime}>+5</Button>
      </View>
      
        {isStarted ? (
          <View style={styles.buttonWrapper}>
            <Button mode='outlined' onPress={() => setIsStarted(false)}>Pause</Button>
            <Button mode='outlined' onPress={resetTimer}>Reset</Button>
          </View>
        ) : (
          <View style={styles.buttonWrapper}>
            <Button mode='outlined' style={styles.startButton} onPress={startTimer}>Start</Button>
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonWrapper: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'row',
    gap: 15
  },
  startButton: {
    padding: 10,
  }
});