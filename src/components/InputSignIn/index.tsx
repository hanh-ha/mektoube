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
  LinkInput?: any;
  secureTextEntry?: boolean;
}
export const InputSignIn = (props: IProps) => {
  const {
    error = false,
    label = '',
    value = '',
    onChange = () => {},
    onBlur = () => {},
    LinkInput = {},
    secureTextEntry = false,
  } = props;
  return (
    <TextInput
      mode="outlined"
      label={label}
      error={error}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      style={styles.textInput}
      outlineColor="#EAEAEB"
      underlineColor="transparent"
      secureTextEntry={secureTextEntry}
      theme={{
        colors: {
          text: '#000000',
          primary: '#45AEF3',
          placeholder: '#000000',
          background: '#FFFFFF',
        },
        fonts: {
          regular: {
            fontFamily: 'AvenirNextCondensed-DemiBold',
          },
        },
      }}
      inlineImageLeft="username"
      right={LinkInput}
      editable={true}
    />
  );
};
const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    marginBottom: 10,
    height: 70,
    fontSize: 14,
    lineHeight: 24,
  },
});
