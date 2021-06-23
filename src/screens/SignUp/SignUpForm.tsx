import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {InputText} from '../../components/InputText';
import {useForm, Controller} from 'react-hook-form';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {StackActions} from '@react-navigation/native';
import {Button, Checkbox} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {postSignUp} from '../../store/actions/postSignUp';
import {TextInput} from 'react-native-paper';
import {ActivityIndicator} from 'react-native-paper';
import {IApplicationState} from '../../store/reducers/state';

const SignUpForm = ({navigation}) => {
  const {control, handleSubmit, errors} = useForm();
  const dispatch = useDispatch();
  const [err, setErr]: any = useState(null);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const StateSignUp = useSelector((state: IApplicationState) => state.signUp);
  const loadingSignup = useSelector(
    (state: IApplicationState) => state.postSignUp.loading,
  );
  console.log('loadingSignup', loadingSignup);

  const onSubmit = values => {
    if (checked2 && checked1) {
      setErr('');
      dispatch(postSignUp({...StateSignUp, ...values}));
    } else {
      setErr('Vous devez accepter less CGU');
    }
  };
  const [securityPassword, setSecurityPassword] = useState(true);
  const [eye, setEye] = useState('eye-off');
  const hiddenPassword = () => {
    eye === 'eye'
      ? (setEye('eye-off'), setSecurityPassword(true))
      : (setEye('eye'), setSecurityPassword(false));
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
            size={30}
            color="white"
            style={{}}
          />
        </TouchableOpacity>
        <Text style={styles.textInscription}>Inscription</Text>
        <TouchableOpacity style={styles.wrapperDeja}>
          <Text style={styles.textDeja}>Deja un compte ?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.wraperColtroller}>
          <Controller
            as={InputText}
            name="email"
            label="Email"
            error={!!errors.email}
            control={control}
            defaultValue=""
            rules={{required: true}}
          />
          {errors.email ? (
            <Text style={styles.err}>L'E-Mail ne peut pas être vide</Text>
          ) : null}
          <Controller
            as={InputText}
            name="firstname"
            label="Prénom"
            error={!!errors.firstname}
            control={control}
            defaultValue=""
            rules={{required: true}}
          />
          {errors.firstname ? (
            <Text style={styles.err}>L'E-Mail ne peut pas être vide</Text>
          ) : null}
          <Controller
            as={InputText}
            name="password"
            label="Mot de Passe"
            error={!!errors.password}
            control={control}
            defaultValue=""
            rules={{required: true}}
            secureTextEntry={securityPassword}
            LinkInput={
              <TextInput.Icon
                name={eye}
                onPress={() => {
                  hiddenPassword();
                }}
                color="brown"
                style={styles.textIputIcon}
              />
            }
          />
          {errors.Password ? (
            <Text style={styles.err}>L'E-Mail ne peut pas être vide</Text>
          ) : null}
        </View>
        <View>
          <View style={styles.checkBoxWrapper}>
            <Checkbox
              status={checked1 ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked1(!checked1);
              }}
              testID="1"
              color="white"
              uncheckedColor="#fdceed"
            />
            <Text style={styles.textCheckBox}>
              Je certifie eetre majeur(e) et j'accepte lé conditions gensnerales
              d'utilisations
            </Text>
          </View>
          <View style={styles.checkBoxWrapper}>
            <Checkbox.Android
              status={checked2 ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked2(!checked2);
              }}
              testID="1"
              color="white"
              uncheckedColor="#fdceed"
              style={styles.checkBox}
            />
            <Text style={styles.textCheckBox}>
              j'accepte que mes donneses renseigneses y compris celles
              facultaives à mon origine
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
          <Button
            style={styles.submit}
            color="white"
            icon="check"
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.submitText}>ME CONNECTER</Text>
          </Button>
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
    marginVertical: 10,
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
    backgroundColor: '#E71111',
    paddingVertical: 5,
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
    color: '#fdceed',
    fontFamily: 'AntDesign',
  },
  checkBox: {
    width: 100,
    height: 50,
  },
  styleErr: {
    position: 'absolute',
    top: 0,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    width: '100%',
    padding: 20,
    backgroundColor: '#E71111',
    fontFamily: 'AvenirNextCondensed-Bold',
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
  },
  wrapperDeja: {
    flex: 1,
    alignItems: 'flex-end',
  },
  textDeja: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily: 'AntDesign',
  },
  wraperColtroller: {
    marginBottom: 20,
  },
  textIputIcon: {
    marginTop: 20,
    marginRight: 17,
  },
  loading: {
    backgroundColor: '#ff7794',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#fdceed',
  },
  submit: {
    backgroundColor: '#ff7794',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#fdceed',
  },
  submitText: {
    fontSize: 15,
    fontFamily: 'AvenirNextCondensed-Bold',
  },
});
