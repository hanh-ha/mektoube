import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {getUser} from '../../store/actions/getUser';
import {useDispatch, useSelector} from 'react-redux';
import IconMap from 'react-native-vector-icons/FontAwesome';

const Discovery = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const User = useSelector(state => state.getUsers.data);
  const getOnlineStatusColor = (status: number) => {
    console.log('dsdsd', status);
    if (status === 1) {
      return 'green';
    } else if (status == 0) {
      return '#ffc142';
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.wrapperUser}>
        <View style={styles.widthImage}>
          <TouchableOpacity style={styles.thumbnail}>
            <Image
              source={{
                uri: `${item.thumbnail}`,
              }}
              style={styles.imageUser}
            />
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                position: 'absolute',
                right: 0,
                bottom: 0,
                borderWidth: 3,
                borderColor: '#FFFFFF',
                backgroundColor: getOnlineStatusColor(item.online),
              }}
            />
          </TouchableOpacity>
          <Text style={styles.name}>{item.name} </Text>
          <View style={styles.details}>
            <Text style={styles.age}>{item.age} ans</Text>
            <Text style={styles.itemDatails}>|</Text>
            <View style={styles.address}>
              <IconMap name="map-marker" size={15} style={styles.iconMap} />
              <Text style={styles.city}>{item.city}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.wrapper}>
      <View>
        <ImageBackground
          source={{
            uri: 'https://responsive-staging.ltservices2.ovh/images/temp/discover-banner-male.jpg',
          }}
          style={styles.ImageBackground}>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>Rencontres</Text>
            <Text style={styles.textTitle}>
              Découvrez les profils et croisez vos destins !
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.main}>
          <View style={styles.filterWrap}>
            <View>
              <Text style={styles.titleOption}>Votre Recherche</Text>
              <Text style={styles.titleSmail}>Autour de moi</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.option}>
                <View style={styles.numberOption}>
                  <Text style={styles.numberOptionText}>0</Text>
                </View>
                <View style={styles.optionItem}>
                  <Icon name="options" style={styles.iconOption} size={20} />
                  <Text style={styles.textOption}>CRITERES</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.userList}>
            <FlatList
              keyExtractor={(item): any => item.uuid}
              horizontal={false}
              numColumns={2}
              data={User}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default Discovery;
const styles = StyleSheet.create({
  title: {
    fontFamily: 'AvenirNextCondensed-DemiBold',
    fontSize: 42,
    color: '#FFFFFF',
  },
  ImageBackground: {
    width: '100%',
    height: 245,
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 16,
    fontFamily: 'AvertaDemo-Regular',
    color: '#FFFFFF',
  },
  titleWrap: {
    marginLeft: 14,
  },
  option: {
    backgroundColor: '#24CF5E',
    width: 132,
    height: 52,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    position: 'absolute',
    top: 5,
    right: 6,
    paddingVertical: 1,
    paddingHorizontal: 6,
  },
  iconOption: {
    color: '#FFFFFF',
    marginRight: 1,
  },
  textOption: {
    color: '#FFFFFF',
    fontFamily: 'AvenirNextCondensed-DemiBold',
    fontSize: 18,
  },
  filterWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  main: {
    paddingHorizontal: 24,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
  },
  wrapper: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  titleOption: {
    fontFamily: 'AvenirNextCondensed-DemiBold',
    color: '#000000',
    fontSize: 23,
  },
  titleSmail: {
    fontFamily: 'AvertaDemo-Regular',
    color: '#24CF5E',
    fontSize: 15,
  },
  iconMap: {
    color: '#989CA0',
    marginRight: 5,
  },
  imageUser: {
    width: 128,
    height: 128,
    borderRadius: 10,
    // alignSelf: 'center',
  },
  thumbnail: {
    borderRadius: 10,
    marginBottom: 14,
    position: 'relative',
  },
  name: {
    fontFamily: 'AvenirNextCondensed-Bold',
    color: '#313840',
    fontSize: 14,
    marginBottom: 4,
    alignSelf: 'flex-start',
    width: 128,
  },
  age: {
    fontFamily: 'AvenirNextCondensed-DemiBold',
    fontSize: 10,
    color: '#989CA0',
    marginRight: 15,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 128,
    overflow: 'hidden',
  },
  itemDatails: {
    color: '#989CA0',
    marginRight: 15,
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  city: {
    color: '#989CA0',
    fontSize: 10,
    fontFamily: 'AvenirNextCondensed-DemiBold',
  },
  userList: {
    marginTop: 30,
    flexDirection: 'row',
    width: '100%',
  },
  wrapperUser: {
    paddingBottom: 16,
    marginBottom: 10,
    width: '48%',
    margin: '2%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  widthImage: {
    width: 128,
  },
  numberOptionText: {
    color: '#24CF5E',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'AvenirNextCondensed-DemiBold',
  },
});
