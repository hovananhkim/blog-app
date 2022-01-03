import React from 'react';
import {Card} from 'react-native-elements';
import {Text, Image} from 'react-native';

export default function BlogViewComponent(props) {
  const {data} = props;
  return (
    <Card>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>{data.title}</Text>
      <Text style={{fontSize: 13, marginBottom: 12}}>{data.createdBy}</Text>
      <Text style={{marginBottom: 12}}>{data.description}</Text>
      <Image
        source={{
          uri: data.image,
        }}
        style={{height: 150}}
      />
    </Card>
  );
}
