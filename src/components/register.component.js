import React from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {PageAuth, TitleAuth} from '../components/auth.component';

export default function RegisterComponent(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const sendData = () => {
    props.parentCallback({email, password, name});
  };

  return (
    <View>
      <PageAuth>
        <TitleAuth>Register to Blog</TitleAuth>
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Input placeholder="Name" onChangeText={setName} />
        <Button title={'Register'} onPress={sendData} />
      </PageAuth>
    </View>
  );
}
