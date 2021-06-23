import {RadioButton} from 'react-native-paper';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RadioBox = ({title, value}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{title}</Text>
      <RadioButton value={value} color="white" uncheckedColor="white" />
    </View>
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
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'AvenirNextCondensed-DemiBold',
  },
});
