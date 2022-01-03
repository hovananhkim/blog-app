import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect} from 'react';
import {View, Modal} from 'react-native';
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import SimpleToast from 'react-native-simple-toast';
import Toast from 'react-native-simple-toast';
import LoginComponent from '../components/login.component';
import RegisterComponent from '../components/register.component';
import {
  getAccessToken,
  loginService,
  removeAccessToken,
  checkLogin,
  registerService,
} from '../services';

export default function Setting() {
  const [isLogin, setIsLogin] = React.useState(false);

  const [login, setLogin] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    _checkLogin();
  }, [isLogin]);

  const logout = async () => {
    removeAccessToken();
    setIsLogin(false);
  };

  const openModal = async () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const callbackLogin = async childData => {
    const {email, password} = childData;
    let accessToken;
    await loginService(email, password)
      .then(result => {
        accessToken = result.data.accessToken;
        closeModal();
      })
      .catch(error => {
        SimpleToast.show('Email and password invalid', SimpleToast.SHORT);
      });
    try {
      if (accessToken) {
        await AsyncStorage.setItem('accessToken', accessToken);
      }
    } catch (error) {
      console.log(error);
    }
    _checkLogin();
  };

  const _checkLogin = async () => {
    const _isLogin = await checkLogin();
    if (_isLogin) setIsLogin(true);
  };

  const callbackRegister = async childData => {
    const {email, password, name} = childData;
    await registerService(email, password, name)
      .then(result => {
        SimpleToast.show('Register successfully', SimpleToast.SHORT);
      })
      .catch(error => {
        if (error.response.status === 400) {
          SimpleToast.show(error.response?.data?.message[0], SimpleToast.SHORT);
        }
        else if (error.response.status === 409 ) {
          SimpleToast.show('Email already exist', SimpleToast.SHORT);
        }
        else {
          SimpleToast.show('Register failed', SimpleToast.SHORT);
        }
      });
  };

  return (
    <View>
      {!isLogin && (
        <Button
          title={'Login'}
          type="clear"
          titleStyle={{color: 'black'}}
          onPress={() => {
            setRegister(false);
            setLogin(true);
            openModal();
          }}
        />
      )}
      {!isLogin && (
        <Button
          title={'Register'}
          type="clear"
          titleStyle={{color: 'black'}}
          onPress={() => {
            setRegister(true);
            setLogin(false);
            openModal();
          }}
        />
      )}
      {isLogin && (
        <Button
          title={'Logout'}
          type="clear"
          titleStyle={{color: 'black'}}
          onPress={logout}
        />
      )}

      <Modal visible={modalVisible}>
        <SafeAreaView>
          <Button title={'Close'} type="clear" onPress={closeModal} />
          {register && <RegisterComponent parentCallback={callbackRegister} />}
          {login && <LoginComponent parentCallback={callbackLogin} />}
        </SafeAreaView>
      </Modal>
    </View>
  );
}
