import React from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';

interface IProps {
  error?: boolean;
  label?: string;
  value?: string;
  onChange?: (x?: string) => void;
  onBlur?: () => void;
  isWhite?: boolean;
  autocomplete?: boolean;
  secureTextEntry?: boolean;
  LinkInput?: any;
  onChangeCallback?: (val?: string) => void;
  textInputReference?: any;
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
    onChangeCallback,
    textInputReference,
  } = props;

  return (
    <TextInput
      label={label}
      error={error}
      value={value}
      onChangeText={val => {
        onChange(val);
        onChangeCallback?.(val);
      }}
      onBlur={onBlur}
      style={styles.textInput}
      // outlineColor="none"
      selectionColor="#ffaff8"
      underlineColor="white"
      theme={{
        colors: {
          placeholder: '#ffaff8',
          text: 'white',
          primary: 'white',
          background: 'transparent',
        },
        fonts: {
          regular: {
            fontFamily: 'AvenirNextCondensed',
          },
        },
      }}
      secureTextEntry={secureTextEntry}
      right={LinkInput}
      ref={textInputReference}
    />
  );
}
const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    marginBottom: 10,
    // borderBottomColor: '#ffd4f8',
    // borderBottomWidth: 1,
    fontWeight: '600',
  },
});
