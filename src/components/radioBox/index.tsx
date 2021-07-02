import {RadioButton} from 'react-native-paper';
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const RadioBox = ({title, value, onChange}) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => onChange(value)}>
      <Text style={styles.text}>{title}</Text>
      <RadioButton value={value} color="white" uncheckedColor="white" />
    </TouchableOpacity>
  );
};
export default RadioBox;
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ff74d8',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'AvenirNextCondensed-DemiBold',
  },
});
