import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {InputText} from '../../components/InputText';
import {useForm, Controller} from 'react-hook-form';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {StackActions} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {postSignUp} from '../../store/actions/postSignUp';
import {ActivityIndicator} from 'react-native-paper';
import {IApplicationState} from '../../store/reducers/state';
import {PasswordMeter} from 'password-meter';
import IconEye from 'react-native-vector-icons/Feather';
import IconCheck from 'react-native-vector-icons/Feather';

const SignUpForm = ({navigation}) => {
  const {control, handleSubmit, errors, clearErrors} = useForm();
  const dispatch = useDispatch();
  const [err, setErr]: any = useState(null);
  const [errPassword, setErrpassword] = useState(null);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [passWord, setPassword]: any = useState('');
  const StateSignUp = useSelector((state: IApplicationState) => state.signUp);
  const loadingSignup = useSelector(
    (state: IApplicationState) => state.postSignUp.loading,
  );

  const onSubmit = values => {
    setPassword(values.password);
    const emailRegex =
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

    if (!emailRegex.test(values.email)) {
      setErr('Le mail est incorrect');
    }
    if (!checked2 || !checked1) {
      setErr('Vous devez accepter less CGU');
    }
    if (values.password.length < 8) {
      setErrpassword(
        'Votre nouveau mot de passe doit faire au moins 8 caractères',
      );
    } else {
      setErrpassword(null);
    }
    if (
      checked2 &&
      checked1 &&
      emailRegex.test(values.email) &&
      !errors.email &&
      !errors.password &&
      values.password.length >= 8
    ) {
      setErr('');
      dispatch(postSignUp({...StateSignUp, ...values}));
    }
    setTimeout(function () {
      setErr(null);
    }, 2000);
  };

  const validatePassword = JSON.stringify(
    new PasswordMeter(
      {},
      {
        '0': 'Faible',
        '40': 'Faible', // 001 <= x <  040
        '80': 'Moyen', // 040 <= x <  080
        '120': 'Fort', // 080 <= x <  120
        '180': 'Fort', // 120 <= x <  180
        '200': 'Fort', // 180 <= x <  200
        _: 'Fort', //        x >= 200
      },
    ).getResults([passWord]),
  );

  const validatePasswordArray = JSON.parse(validatePassword)[0];
  const borderValidatePassword = () => {
    if (validatePasswordArray.status === 'Faible') {
      return 'red';
    } else if (passWord === null || passWord === '') {
      return 'red';
    } else if (validatePasswordArray.status === 'Moyen') {
      return 'yellow';
    } else if (validatePasswordArray.status === 'Fort') {
      return '#24CF5E';
    }
  };
  const borderWidthValidatePassword = () => {
    if (passWord === null || passWord === '') {
      return 40;
    } else if (validatePasswordArray.score < 20) {
      return 5;
    } else if (
      validatePasswordArray.score < 40 &&
      validatePasswordArray.score >= 20
    ) {
      return 15;
    } else if (
      validatePasswordArray.score < 80 &&
      validatePasswordArray.score >= 40
    ) {
      return 20;
    } else if (
      validatePasswordArray.score < 120 &&
      validatePasswordArray.score >= 80
    ) {
      return 25;
    } else if (
      validatePasswordArray.score >= 120 &&
      validatePasswordArray.score < 200
    ) {
      return 30;
    } else if (validatePasswordArray.score >= 200) {
      return 40;
    }
  };
  const [securityPassword, setSecurityPassword] = useState(true);
  const [eye, setEye] = useState('eye');
  const hiddenPassword = () => {
    eye === 'eye-off'
      ? (setEye('eye'), setSecurityPassword(true))
      : (setEye('eye-off'), setSecurityPassword(false));
  };
  const onChange = value => {
    if (value) {
      setErrpassword(null);
    }
  };

  return (
    <LinearGradient colors={['#FF59F4', '#FF5978']} style={styles.background}>
      {err ? <Text style={styles.styleErr}>{err}</Text> : null}

      <View style={styles.title}>
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => navigation.dispatch(StackActions.pop(1))}>
          <Icon1
            name="chevron-back-outline"
            size={21}
            color="white"
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
        <Text style={styles.textInscription}>Inscription</Text>
        <TouchableOpacity style={styles.wrapperDeja}>
          <Text style={styles.textDeja}>Déjà un compte ?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.wraperColtroller}>
          <Controller
            as={InputText}
            name="email"
            label="Email"
            error={errors.email}
            control={control}
            defaultValue=""
            rules={{required: true}}
            onChangeCallback={() => {
              setErr(null);
            }}
          />
          {errors.email ? (
            <Text style={styles.err}>L'E-Mail ne peut pas être vide</Text>
          ) : null}
          <Controller
            as={InputText}
            name="firstname"
            label="Prénom"
            error={errors.firstname}
            control={control}
            defaultValue=""
            rules={{required: true}}
            onChangeCallback={() => {
              setErr(null);
            }}
          />
          {errors.firstname ? (
            <Text style={styles.err}>Le Prénom ne peut pas être vide</Text>
          ) : null}
          <View style={{position: 'relative'}}>
            <Controller
              as={InputText}
              name="password"
              label="Mot de Passe"
              error={!!errors.password}
              control={control}
              defaultValue=""
              rules={{required: true}}
              secureTextEntry={securityPassword}
              onChangeCallback={value => {
                clearErrors('password');
                setPassword(value);
                onChange(value);
              }}
            />
            {passWord.length >= 2 ? (
              <View style={{position: 'absolute', right: 60, top: 30}}>
                <TouchableOpacity
                  onPress={() => {
                    hiddenPassword();
                  }}
                  style={styles.textIputIcon}>
                  <IconEye name={eye} color="brown" size={23} />
                </TouchableOpacity>
              </View>
            ) : null}
            <View style={{position: 'absolute', right: 0, top: 25}}>
              <View style={{position: 'relative'}}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'AvenirNextCondensed-DemiBold',
                    width: 40,
                    textAlign: 'right',
                    fontSize: 15,
                  }}>
                  {passWord === null || passWord === ''
                    ? 'Faible'
                    : validatePasswordArray.status}
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    height: 2,
                    width: 40,
                    backgroundColor: 'white',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    height: 2,
                    width: borderWidthValidatePassword(),
                    backgroundColor: borderValidatePassword(),
                  }}
                />
              </View>
            </View>
          </View>

          {errPassword ? <Text style={styles.err}>{errPassword}</Text> : null}
        </View>
        <View>
          <View style={styles.checkBoxWrapper}>
            <View style={styles.borderCheckBox}>
              <Checkbox.IOS
                status={checked1 ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked1(!checked1);
                }}
                testID="1"
                color="white"
                theme={{
                  colors: {
                    primary: '#45AEF3',
                    placeholder: '#000000',
                    background: 'transparent',
                  },
                }}
              />
            </View>
            <View>
              <Text style={styles.textCheckBox}>
                je certifie être majeur(e) et j’accepte les
              </Text>
              <TouchableOpacity>
                <Text style={styles.textbox}>
                  Conditions générales d’utilisations
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.checkBoxWrapper}>
            <View style={styles.borderCheckBox}>
              <Checkbox.IOS
                status={checked2 ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked2(!checked2);
                }}
                testID="1"
                color="white"
              />
            </View>
            <Text style={styles.textCheckBox}>
              J'accepte que mes données renseignées, y compris celles
              facultatives relatives à mon origine, soient traitées par Mektoube
              et communiquées à ses prestataires et aux autres membres situés
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        {loadingSignup ? (
          <ActivityIndicator
            size={35}
            animating={true}
            color="white"
            style={styles.loading}
          />
        ) : (
          <TouchableOpacity
            style={styles.submit}
            onPress={handleSubmit(onSubmit)}>
            <IconCheck
              name="check"
              size={21}
              style={{marginRight: 15}}
              color="white"
            />
            <Text style={styles.submitText}>ME CONNECTER</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};
export default SignUpForm;
const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  title: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  main: {
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: 'flex-end',
    flex: 1,
    color: '#fdceed',
    fontSize: 20,
  },
  err: {
    backgroundColor: '#ff2c2c',
    paddingVertical: 4,
    textAlign: 'center',
    color: '#fdceed',
    marginBottom: 10,
    fontFamily: 'AvenirNextCondensed-DemiBold',
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textCheckBox: {
    color: '#fff',
    fontFamily: 'AvertaDemo-Regular',
    fontSize: 12,
    width: 400,
    flexShrink: 1,
  },
  textbox: {
    color: '#fff',
    fontFamily: 'AvertaDemo-Regular',
    fontSize: 12,
    width: 400,
    textDecorationLine: 'underline',
  },
  checkBox: {
    alignSelf: 'flex-start',
  },
  styleErr: {
    position: 'absolute',
    top: 0,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    width: '100%',
    padding: 19,
    backgroundColor: '#ff2c2c',
    fontFamily: 'AvenirNextCondensed-Bold',
    zIndex: 2,
  },
  wrapper: {
    flex: 1,
  },
  textInscription: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontFamily: 'AvenirNextCondensed-DemiBold',
    fontWeight: '600',
  },
  wrapperDeja: {
    flex: 1,
    alignItems: 'flex-end',
  },
  textDeja: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily: 'AvertaDemo-Regular',
  },
  wraperColtroller: {
    marginBottom: 20,
  },
  textIputIcon: {
    zIndex: 90,
  },
  loading: {
    backgroundColor: '#ff7794',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#fdceed',
  },
  submit: {
    backgroundColor: '#ff7794',
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: '#fdceed',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 18,
    fontFamily: 'AvenirNextCondensed-DemiBold',
    color: 'white',
  },
  borderCheckBox: {
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10,
    borderRadius: 10,
    fontWeight: '600',
  },
  PassMeter: {
    color: 'white',
    width: 100,
  },
});
