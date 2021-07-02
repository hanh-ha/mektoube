import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import Image from 'react-native-scalable-image';
import Icon from 'react-native-vector-icons/AntDesign';
import {useForm, Controller} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {login} from '../../store/actions/login';
import {useDispatch, useSelector} from 'react-redux';
import {InputSignIn} from '../../components/InputSignIn';
import {ActivityIndicator} from 'react-native-paper';
import {IApplicationState} from '../../store/reducers/state';
import Modal from 'react-native-modal';

const Home = ({navigation}) => {
  const win = Dimensions.get('window');
  const [visible, setVisible] = useState(false);
  const {control, handleSubmit, errors} = useForm();
  const dispatch = useDispatch();
  const [passWord, setpassword]: any = useState('');
  const [email, setEmail]: any = useState('');

  const onSubmit = value => {
    dispatch(login(value.email, value.password));
  };
  const [securityPassword, setSecurityPassword] = useState(true);
  const [eye, setEye] = useState('eye');
  const hiddenPassword = () => {
    eye === 'eye-off'
      ? (setEye('eye'), setSecurityPassword(true))
      : (setEye('eye-off'), setSecurityPassword(false));
  };
  const width = 0.7 * win.width;
  const loginFalse = useSelector(
    (state: IApplicationState) => state?.signIn?.loginFalse,
  );
  const loadingLogin = useSelector(
    (state: IApplicationState) => state?.signIn?.loading,
  );
  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../../../src/images/image7.png')}
        style={style.ImageBackground}>
        <View style={style.imageWrapper}>
          <Image
            source={require('../../../src/images/logo.png')}
            width={width}
          />
          <Text style={style.TextTitle}>
            L'aplication numero 1 de la recontre Musulmane et Maghrebine
          </Text>
        </View>
        <View style={style.Bottom}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text style={style.textConnector}>se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={style.wrapperInscription}>
            <Text style={style.textInscription}>
              Inscription garatuite en 1 min
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Modal
        style={style.modal}
        isVisible={visible}
        backdropOpacity={0}
        coverScreen={false}
        propagateSwipe={true}
        useNativeDriver={true}
        hasBackdrop={true}
        scrollHorizontal={true}
        swipeDirection="down">
        <View style={{position: 'absolute', top: 16, right: 16}}>
          {visible ? (
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Icon name="close" size={30} style={style.iconClose} />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={style.wrapperConnexion}>
          <Text style={style.textConnexion}>Connexion</Text>
          {errors.email || errors.password || loginFalse ? (
            <Text style={style.textincorrect}>
              Identifiant ou mot de passe incorrect
            </Text>
          ) : null}
          <View>
            <Controller
              as={InputSignIn}
              name="email"
              label={
                email
                  ? 'Veuillez vous connecter avec votre email'
                  : 'Adresse mail'
              }
              error={!!errors.email}
              control={control}
              defaultValue=""
              rules={{required: true}}
              placeholder="Address mail"
              onChangeCallback={value => {
                setEmail(value);
              }}
            />

            <View style={style.wrapperController}>
              <Controller
                as={InputSignIn}
                name="password"
                label="Votre mot de passe"
                error={!!errors.password}
                control={control}
                defaultValue=""
                rules={{required: true}}
                secureTextEntry={securityPassword}
                LinkInput={
                  passWord ? (
                    <TextInput.Icon
                      name={eye}
                      onPress={() => {
                        hiddenPassword();
                      }}
                      color="#929699"
                      style={style.textInPutIcon}
                    />
                  ) : null
                }
                placeholder="Votre mot de passe"
                onChangeCallback={value => {
                  setpassword(value);
                }}
              />
              <TouchableOpacity style={style.wrapMot}>
                <Text style={style.TextMot}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.wrappercontacter}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={style.textcontacter}>Nous contacter</Text>
            </TouchableOpacity>
            <Text style={style.textOu}>ou</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={style.textAide}>Aide</Text>
            </TouchableOpacity>
          </View>
          {loadingLogin ? (
            <ActivityIndicator
              animating={true}
              color="white"
              size={40}
              style={style.loading}
            />
          ) : (
            <Button
              onPress={handleSubmit(onSubmit)}
              style={style.subMit}
              color="#f1f1f1"
              uppercase={true}>
              <Text style={style.textMeconnecter}>Me connecter</Text>
            </Button>
          )}

          <View style={style.wraperVous}>
            <TouchableOpacity>
              <Text style={style.TextVous}>Vous n'avez pas de compte ?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={style.textInscrivez}>
                Inscrivez-vous gratuitement
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  ImageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  textConnector: {
    fontSize: 14,
    color: '#f1f1f1',
    textTransform: 'uppercase',
    fontFamily: 'AntDesign',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  TextTitle: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#f1f1f1',
    fontFamily: 'AvenirNextCondensed-Bold',
    paddingHorizontal: 20,
  },
  Bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  Button: {
    color: '#f1f1f1',
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    margin: 0,
    position: 'relative',
    height: '100%',
  },
  iconClose: {
    color: '#f1f1f1',
    // position: 'absolute',
    // top: 16,
    // right: 16,
    // flex: 1,
    // zIndex: 100,
  },
  textInput: {
    marginBottom: 10,
    color: '#0f0f0f',
    // borderWidth: 2,
    // borderColor: '#eaeaea',
  },
  subMit: {
    paddingVertical: 10,
    backgroundColor: '#24CF5E',
    borderRadius: 8,
  },
  inputError: {
    borderColor: 'red',
    marginBottom: 20,
    color: 'black',
    backgroundColor: '#f1f1f1',
    borderWidth: 1,
    borderRadius: 5,
    lineHeight: 32,
  },
  wrapperInscription: {
    backgroundColor: '#24cf5f',
    paddingVertical: 5,
    borderRadius: 10,
  },
  textInscription: {
    width: 180,
    fontSize: 14,
    color: '#f1f1f1',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'AvenirNextCondensed-DemiBold',
    paddingHorizontal: 20,
  },
  wrapperConnexion: {
    backgroundColor: '#ffffff',
    minHeight: '50%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    // paddingVertical: 20,
    paddingTop: 28,
    paddingBottom: 42,
    paddingHorizontal: 32,
  },
  textConnexion: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'AvenirNextCondensed-DemiBold',
    marginBottom: 15,
  },
  textincorrect: {
    backgroundColor: '#ffe8ea',
    padding: 12,
    color: '#E12C2C',
    textAlign: 'center',
    borderRadius: 8,
    fontSize: 12,
    fontFamily: 'AvenirNextCondensed-DemiBold',
    marginBottom: 16,
  },
  wrapperController: {
    position: 'relative',
  },
  textInPutIcon: {
    marginTop: 20,
    marginRight: 17,
  },
  wrapMot: {
    position: 'absolute',
    top: 13,
    right: 17,
  },
  TextMot: {
    fontSize: 10,
    color: '#24CF5E',
    fontFamily: 'AvenirNextCondensed-DemiBold',
  },
  wrappercontacter: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textcontacter: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color: '#7F7F7F',
    fontFamily: 'AvenirNextCondensed-DemiBold',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginRight: 3,
  },
  textOu: {
    color: '#7F7F7F',
    fontFamily: 'AvenirNextCondensed-DemiBold',
    fontSize: 14,
    marginRight: 3,
  },
  textAide: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color: '#7F7F7F',
    fontFamily: 'AvenirNextCondensed-DemiBold',
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  loading: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 12,
    borderRadius: 8,
  },
  textMeconnecter: {
    fontFamily: 'AvenirNextCondensed-DemiBold',
    color: '#FFFFFF',
    fontSize: 17,
  },
  wraperVous: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  TextVous: {
    color: 'rgba(0,0,0,0.5)',
    fontFamily: 'AvenirNextCondensed-DemiBold',
    fontSize: 14,
    marginRight: 15,
  },
  textInscrivez: {
    color: '#24CF5E',
    fontSize: 14,
    fontFamily: 'AvenirNextCondensed-DemiBold',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
Home.navigationOption = () => {
  return {header: 'null'};
};
export default Home;
