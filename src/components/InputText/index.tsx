import React from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';

interface IProps {
  error?: boolean;
  label?: string;
  value?: string;
  onChange?: () => void;
  onBlur?: () => void;
  isWhite?: boolean;
  autocomplete?: boolean;
  secureTextEntry?: boolean;
  LinkInput?: any;
}
export function InputText(props: IProps) {
  const {
    error = false,
    label = '',
    value = '',
    onChange = () => {},
    onBlur = () => {},
    secureTextEntry = false,
    LinkInput = {},
  } = props;
  return (
    <TextInput
      label={label}
      error={error}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      style={styles.textInput}
      outlineColor="none"
      selectionColor="#ffaff8"
      underlineColor="ffd4f8"
      theme={{
        colors: {
          placeholder: '#ffaff8',
          text: 'white',
          primary: 'white',
          background: 'transparent',
        },
        fonts: {
          regular: {
            fontFamily: 'AvenirNextCondensed-Medium',
          },
        },
      }}
      secureTextEntry={secureTextEntry}
      right={LinkInput}
    />
  );
}
const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    marginBottom: 10,
    // borderBottomColor: '#ffd4f8',
    // borderBottomWidth: 1,
  },
});
