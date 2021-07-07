import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {getUser, getUserPlaceholder} from '../../store/actions/getUser';
import {useDispatch, useSelector} from 'react-redux';
import IconMap from 'react-native-vector-icons/FontAwesome';
import {IApplicationState} from '../../store/reducers/state';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import IconReload from 'react-native-vector-icons/AntDesign';
import Images from 'react-native-remote-svg';

const Discovery = () => {
  const [page, setPage]: any = useState(1);
  const [listUser, setListUser] = useState([]);
  const [isScroll, setIsScroll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const handleLoadMore = () => {
    if (page < 76) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    try {
      setRefreshing(false);
      dispatch(getUserPlaceholder(true));
      dispatch(getUser((page - 1) * 20));
    } catch (e) {}
  }, [dispatch, page, refreshing]);

  const getIsDataFetched = useSelector(
    (state: IApplicationState) => state.getUsers.isDataFetched,
  );
  console.log('getIsDataFetched', getIsDataFetched);
  const getUserSelector = useSelector(
    (state: IApplicationState) => state.getUsers.data,
  );

  useEffect(() => {
    const getUserList = () => {
      try {
        const User: [] = getUserSelector;
        setListUser(prev => [...prev, ...User]);
        dispatch(getUserPlaceholder(false));
      } catch (err) {}
    };
    getUserList();
  }, [dispatch, getUserSelector]);
  useEffect(() => {
    if (page === 1) {
      dispatch(getUserPlaceholder(true));
    }
  }, [dispatch, page]);

  const getOnlineStatusColor = (status: number) => {
    if (Number(status) === 1) {
      return '#24CF5E';
    } else if (Number(status) === 0) {
      return '#ffc142';
    }
  };

  const onRefreshs = () => {
    setRefreshing(true);
    setListUser([]);
    setPage(1);
  };
  console.log('page', page);
  const handleScroll = e => {
    const scrollTop = e.nativeEvent.contentOffset.y;
    if (scrollTop > 100) {
      !isScroll && setIsScroll(true);
    } else {
      isScroll && setIsScroll(false);
    }
  };
  const mySVGImage =
    '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><defs><style>.cls-1{fill:none;}.cls-2{fill:#4baff0;}.cls-3{fill:#fff;}.cls-4{fill:#dadada;}.cls-5{fill:#706f6f;}</style></defs><title>homme avatar 01</title><path class="cls-1" d="M-.76,128c0,43,22.17,81,56,103.64C66.12,195.35,98.57,169,136.92,169c34.46,0,64.15,21.26,77.73,51.9,25.87-23,42.11-56.1,42.11-92.93"/><path class="cls-1" d="M256.76,128C256.76,58.61,199.11,2.36,128,2.36S-.76,58.61-.76,128"/><path class="cls-2" d="M136.92,169c-38.35,0-70.8,26.32-81.71,62.61a131.25,131.25,0,0,0,159.44-10.71C201.07,190.29,171.38,169,136.92,169Z"/><rect class="cls-3" x="116.31" y="154.34" width="31.39" height="29.37"/><ellipse class="cls-3" cx="131.36" cy="108.03" rx="41.63" ry="56.28"/><path class="cls-2" d="M147.72,170.64s-12.22,9.61-16.45,11.15-3.59,10.76-3.59,10.76l27.71,2.07,4.3-4.27Z"/><path class="cls-2" d="M116.28,171.54s11.47,10.5,15.58,12.34,2.78,11,2.78,11H106.85l-4-4.57Z"/><path class="cls-2" d="M129.07,182.18a5.46,5.46,0,0,0,2.87,0,1.49,1.49,0,0,1,1.7.47l-.19,1.64-2.57,1.24-1.62-.52Z"/><path class="cls-4" d="M119,136.08c0,5.1,5.81,9.23,13,9.23s13-4.13,13-9.23Z"/><path class="cls-5" d="M172.35,104.29c21.72-74.65-99.47-82.77-82.78,1C93.87,44.69,169.39,43.91,172.35,104.29Z"/><ellipse class="cls-5" cx="121.34" cy="69.82" rx="32.57" ry="13.16" transform="translate(-16.31 44.3) rotate(-19.42)"/></svg>';
  const getMarginRight = index => {
    if (index % 2 === 0) {
      return '3%';
    } else {
      return '5%';
    }
  };
  const getMarginLeft = index => {
    if (index % 2 === 0) {
      return '5%';
    } else {
      return '3%';
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={item.uuid}
        style={{
          width: '42%',
          marginRight: getMarginRight(index),
          marginLeft: getMarginLeft(index),
          padding: 12,
          marginBottom: 24,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 10,
          elevation: 5,
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.5,
          shadowRadius: 10,
        }}>
        <View style={styles.widthImage}>
          <View style={styles.thumbnail}>
            <TouchableOpacity>
              {item.thumbnail === null ? (
                <View style={{backgroundColor: '#e1f5fc', borderRadius: 10}}>
                  <Images
                    source={{
                      uri: 'data:image/svg+xml;utf8,' + mySVGImage,
                    }}
                    style={styles.imageUser}
                  />
                </View>
              ) : (
                <Image
                  source={{
                    uri: `${item.thumbnail}`,
                  }}
                  style={styles.imageUser}
                />
              )}
            </TouchableOpacity>
            {Number(item.online) === 0 || Number(item.online) === 1 ? (
              <View
                style={{
                  width: 20,
                  zIndex: 30,
                  height: 20,
                  borderRadius: 10,
                  position: 'absolute',
                  right: -4,
                  bottom: -3,
                  borderWidth: 3,
                  borderColor: '#FFFFFF',
                  backgroundColor: getOnlineStatusColor(item.online),
                }}
              />
            ) : null}
          </View>
          <Text style={styles.name}>{item.name} </Text>
          <View style={styles.details}>
            <Text style={styles.age}>{item.age} ans</Text>
            {item.city === '-' ? null : (
              <Text style={styles.itemDatails}>|</Text>
            )}
            {item.city === '-' ? null : (
              <View style={styles.address}>
                <IconMap name="map-marker" size={15} style={styles.iconMap} />
                <Text style={styles.city}>{item.city}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.wrapper}>
        <View>
          <View style={styles.main}>
            <View style={styles.userList}>
              {isScroll ? (
                <View style={styles.reset}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={onRefreshs}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <IconReload size={20} name="reload1" />
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'AvenirNextCondensed-DemiBold',
                          marginLeft: 10,
                        }}>
                        Reset
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
              <FlatList
                keyExtractor={(item): any => item.uuid}
                horizontal={false}
                numColumns={2}
                data={listUser}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                onEndReachedThreshold={0}
                ListHeaderComponent={() => {
                  return (
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
                      <View style={styles.filterWrap}>
                        <View>
                          <Text style={styles.titleOption}>
                            Votre Recherche
                          </Text>
                          <Text style={styles.titleSmail}>Autour de moi</Text>
                        </View>
                        <View>
                          <TouchableOpacity style={styles.option}>
                            <View style={styles.numberOption}>
                              <Text style={styles.numberOptionText}>0</Text>
                            </View>
                            <View style={styles.optionItem}>
                              <Icon
                                name="options"
                                style={styles.iconOption}
                                size={20}
                              />
                              <Text style={styles.textOption}>CRITERES</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.borderGray} />
                    </View>
                  );
                }}
                ListFooterComponent={() => {
                  if (getIsDataFetched) {
                    return (
                      <Placeholder
                        style={{
                          marginBottom: 20,
                          marginTop: 10,
                        }}
                        Animation={Fade}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 20,
                          }}>
                          <PlaceholderLine style={styles.playholderLeft} />
                          <PlaceholderLine style={styles.playholderRight} />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 20,
                          }}>
                          <PlaceholderLine style={styles.playholderLeft} />
                          <PlaceholderLine style={styles.playholderRight} />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 20,
                          }}>
                          <PlaceholderLine style={styles.playholderLeft} />
                          <PlaceholderLine style={styles.playholderRight} />
                        </View>
                      </Placeholder>
                    );
                  } else {
                    return null;
                  }
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefreshs}
                  />
                }
                onScroll={e => handleScroll(e)}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Discovery;
const styles = StyleSheet.create({
  reset: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 90,
  },
  playholderLeft: {
    width: '42%',
    height: 150,
    borderRadius: 10,
    marginLeft: '5%',
    marginRight: '3%',
  },
  playholderRight: {
    width: '42%',
    height: 150,
    borderRadius: 10,
    marginLeft: '3%',
    marginRight: '5%',
  },
  borderGray: {
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
    width: 42,
    marginBottom: 25,
  },
  title: {
    fontFamily: 'AvenirNextCondensed-DemiBold',
    fontSize: 42,
    color: '#FFFFFF',
  },
  ImageBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 16,
    fontFamily: 'AvertaDemo-Regular',
    color: '#FFFFFF',
  },
  titleWrap: {
    marginLeft: 20,
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
    marginBottom: 15,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  main: {
    // paddingHorizontal: 24,
    // marginTop: 20,
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
    width: 132,
    height: 132,
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
    fontWeight: '700',
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
    // marginTop: 30,
    flexDirection: 'row',
    width: '100%',
  },
  wrapperUser: {},
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
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  numberOptionText: {
    color: '#24CF5E',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'AvenirNextCondensed-DemiBold',
  },
});
