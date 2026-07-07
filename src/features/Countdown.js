import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Countdown({ focusSubject, milliseconds, setMilliseconds, isPaused, onProgress, onEnd }) {
  const timerRef = React.useRef(null);
  
  let minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  let seconds = Math.floor((milliseconds / 1000 % 60));

  function formatTime(time) {
    return time >= 10 ? time : `0${time}`;
  }

  function count() {
    setMilliseconds((time) => {
      if(!time || time <= 0) {
        clearInterval(timerRef.current);
        onEnd();
        return time;
      }

      return time - 1000;
    });
  }

  React.useEffect(() => {
    if(isPaused) {
      if(timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(count, 1000);
    return () => clearInterval(timerRef.current);
  }, [isPaused]);

  return (
    <View style={styles.container}>
        <Text style={styles.timer}>
          {formatTime(minutes)} : {formatTime(seconds)}
        </Text>
        <Text style={styles.focusingOn}>
          Focusing on {focusSubject}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    padding: 30,
    backgroundColor: '#ccc',
    fontSize: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusingOn: {
    marginTop: 20,
    padding: 10,
    borderColor: '#BC96E6',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 10,
  }
});