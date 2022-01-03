import React from 'react';
import {View, Text} from 'react-native';
import {Button, Input} from 'react-native-elements';

export default function BlogCreateComponent(props) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');

  const sendData = () => {
    props.parentCallback({title, description, image});
  };

  return (
    <View>
      <Text style={{fontSize: 30, textAlign: 'center', margin: 20}}>
        Create new a blog
      </Text>
      <Input placeholder="Title" onChangeText={setTitle} multiline={true} />
      <Input
        placeholder="Description"
        onChangeText={setDescription}
        multiline={true}
      />
      <Input placeholder="Image" onChangeText={setImage} multiline={true} />
      <Button
        title={'Save'}
        style={{marginLeft: 10, marginRight: 10}}
        onPress={sendData}
      />
    </View>
  );
}
