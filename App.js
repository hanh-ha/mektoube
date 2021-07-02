import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/stores';
import RootNavigation from './src/navigation/index';

const AppWrap = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};
export default AppWrap;
