import React from 'react';
import {Button, Card} from 'react-native-elements';
import {Text, Image, View, Alert, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BlogUpdateComponent from './blog-update.component';
import {ScrollView} from 'react-native';
import {deleteBlog, editBlog} from '../services';
import SimpleToast from 'react-native-simple-toast';

export default function BlogActionComponent(props) {
  const {data} = props;
  const [modalVisible, setModalVisible] = React.useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const confirmDelete = () => {
    Alert.alert('Are you sure', 'Delete this blog', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: _deleteBlog},
    ]);
  };

  const _deleteBlog = async() => {
    await deleteBlog(data.id)
      .then(result => {
        SimpleToast.show('Delete blog successfully', SimpleToast.SHORT);
      })
      .catch(error => {
        SimpleToast.show('Delete blog failed', SimpleToast.SHORT);
      });
    props.parentCallback();
  };

  const callBackEditBlog = async(childData) => {
    const {title, description, image} = childData;
    const id = data.id;
    await editBlog(id, title, description, image)
      .then(result => {
        SimpleToast.show('Edit blog successfully', SimpleToast.SHORT);
      })
      .catch(error => {
        SimpleToast.show('Edit blog failed', SimpleToast.SHORT);
      });
    props.parentCallback();
  };

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
      <View style={{flex: 2, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Button title={'Edit'} onPress={openModal} />
        </View>
        <View style={{flex: 1}}>
          <Button title={'Delete'} onPress={confirmDelete} />
        </View>
      </View>
      <Modal visible={modalVisible}>
        <SafeAreaView>
          <ScrollView>
            <Button title={'Close'} type="clear" onPress={closeModal} />
            <BlogUpdateComponent
              data={data}
              parentCallback={callBackEditBlog}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </Card>
  );
}
