import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors } from '../utils/colors';

export default function Focus({ addSubject }) {
  const [subject, setSubject] = useState('');
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        type="text"
        label="What would you like to focus on?"
        mode="outlined"
        onChangeText={setSubject}
      />
      <TouchableOpacity style={styles.buttonView}>
        <Button style={styles.button} mode="outlined" onPress={() => addSubject(subject)}>
          Focus
        </Button>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    flex: .2,
  },
  input: {
    color: colors.text,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonView: {},
  button: {
    padding: 10,
  },
});
