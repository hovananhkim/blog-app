import React, {useEffect} from 'react';
import {Modal, View, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import BlogCreatComponent from '../components/blog-create.component';
import BlogActionComponent from '../components/blog-action.component';
import {checkLogin, createBlog, getAllMyBlog} from '../services';
import SimpleToast from 'react-native-simple-toast';

export default function MyBlogsScreen() {
  const [blogs, setBlogs] = React.useState([]);
  const [isLogin, setIsLogin] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [change, setChange] = React.useState(0);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const _checkLogin = async () => {
    const _isLogin = await checkLogin();
    setIsLogin(_isLogin);
  };

  useEffect(() => {
    _checkLogin();
    _getAllMyBlogs();
  }, [change]);

  const _getAllMyBlogs = async () => {
    await getAllMyBlog()
      .then(result => setBlogs(result.data))
      .catch(error => setBlogs([]));
  };
  const callBackCreateBlog = async childData => {
    const {title, description, image} = childData;
    await createBlog(title, description, image)
      .then(result => {
        SimpleToast.show('Create blog successfully', SimpleToast.SHORT);
      })
      .catch(error => {
        SimpleToast.show('Create blog failed', SimpleToast.SHORT);
      });
    setChange(change + 1);
  };
  const updateData = () => {
    setChange(change + 1);
  };
  return (
    <ScrollView>
      {isLogin && (
        <View>
          <View style={{alignItems: 'center'}}>
            <Button
              title={'Create'}
              style={{width: 120, marginTop: 10}}
              onPress={openModal}
            />
            <Modal visible={modalVisible}>
              <SafeAreaView>
                <Button title={'Close'} type="clear" onPress={closeModal} />
                <ScrollView>
                  <BlogCreatComponent parentCallback={callBackCreateBlog} />
                </ScrollView>
              </SafeAreaView>
            </Modal>
          </View>

          {blogs.map((blog, index) => (
            <BlogActionComponent
              data={blog}
              key={index}
              parentCallback={updateData}
            />
          ))}
        </View>
      )}
      {!isLogin && <Text style={{textAlign:'center'}}>Please login to access your Blog</Text>}
    </ScrollView>
  );
}
