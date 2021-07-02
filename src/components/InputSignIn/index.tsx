import React, {useEffect, useState, useRef} from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

interface IProps {
  error?: boolean;
  label?: string;
  value?: string;
  onChange?: (x?: string) => void;
  onBlur?: () => void;
  isWhite?: boolean;
  autocomplete?: boolean;
  LinkInput?: any;
  secureTextEntry?: boolean;
  selectionColor?: string;
  placeholder?: string;
  onChangeCallback?: (val?: string) => void;
}
export const InputSignIn = (props: IProps) => {
  const {
    error = false,
    label = '',
    value = '',
    onChange = () => {},
    LinkInput = {},
    secureTextEntry = false,
    placeholder = '',
    onChangeCallback,
  } = props;
  const textInputReference = useRef(null);
  const [borderColor, setBorderColor] = useState('#EAEAEB');
  const ChangeBorderInput = (args: any) => {
    if (args && !error) {
      setBorderColor('#45AEF3');
    } else if (args && error) {
      setBorderColor('red');
    }
  };
  const ChangeBlurInput = (args: any) => {
    if (args && !error) {
      setBorderColor('#EAEAEB');
    }
    if (args && error) {
      setBorderColor('red');
    }
  };
  useEffect(() => {
    if (error) {
      setBorderColor('red');
    }
    const focusTextinput = () => {
      if (error && textInputReference.current.isFocused()) {
        setBorderColor('#45AEF3');
      } else if (error && textInputReference.current.blur()) {
        setBorderColor('red');
      }
    };
    return () => {
      focusTextinput();
    };
  }, [error]);
  return (
    <View
      style={{
        borderRadius: 8,
        height: 68,
        overflow: 'hidden',
        borderColor: `${borderColor}`,
        borderWidth: 1,
        marginBottom: 10,
      }}>
      <TextInput
        label={label}
        error={error}
        value={value}
        onChangeText={val => {
          onChange(val);
          onChangeCallback?.(val);
        }}
        style={styles.textInput}
        outlineColor="transparent"
        underlineColor="transparent"
        secureTextEntry={secureTextEntry}
        theme={{
          colors: {
            text: '#000000',
            primary: '#45AEF3',
            placeholder: '#000000',
            background: 'transparent',
          },
          fonts: {
            regular: {
              fontFamily: 'AvenirNextCondensed',
              fontWeight: 'normal',
            },
          },
        }}
        inlineImageLeft="username"
        right={LinkInput}
        editable={true}
        underlineColorAndroid="transparent"
        onFocus={(args: any) => {
          ChangeBorderInput(args);
        }}
        onBlur={(args: any) => {
          ChangeBlurInput(args);
        }}
        selectionColor={borderColor}
        ref={textInputReference}
        placeholder={placeholder}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapperTextInput: {},
  textInput: {
    width: '100%',
    marginBottom: 10,
    fontSize: 14,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 70,
    overflow: 'hidden',
    backgroundColor: '#fff',
    fontFamily: 'AvenirNextCondensed',
  },
});
