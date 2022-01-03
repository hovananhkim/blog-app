import React from 'react';
import {View, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';

export default function BlogUpdateComponent(props) {
  const {data} = props;
  const [title, setTitle] = React.useState(data?.title);
  const [description, setDescription] = React.useState(data?.description);
  const [image, setImage] = React.useState(data?.image);

  const sendData = () => {
    props.parentCallback({title, description, image});
  };

  return (
    <View>
      <Text style={{fontSize: 30, textAlign: 'center', margin: 20}}>
        Edit blog
      </Text>
      <Input
        placeholder="Title"
        onChangeText={setTitle}
        defaultValue={title}
        multiline={true}
      />
      <Input
        placeholder="Description"
        onChangeText={setDescription}
        defaultValue={description}
        multiline={true}
      />
      <Input
        placeholder="Image"
        onChangeText={setImage}
        defaultValue={image}
        multiline={true}
      />
      <Button
        title={'Save'}
        style={{marginLeft: 10, marginRight: 10}}
        onPress={sendData}
      />
    </View>
  );
}
