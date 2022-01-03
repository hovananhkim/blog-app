import React from 'react';
import { View} from 'react-native';
import { Button, Input} from 'react-native-elements';
import {PageAuth, TitleAuth} from '../components/auth.component';

export default function LoginComponent (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const sendData = () => {
   props.parentCallback({email, password})
  };
  
  return (
    <View>
      <PageAuth>
        <TitleAuth>login to Blog</TitleAuth>
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input placeholder="Password" onChangeText={setPassword} secureTextEntry={true} />
        <Button title={'Login'} onPress={sendData}/>
      </PageAuth>
      
    </View>
  );
};
