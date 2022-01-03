import React from 'react';
import type {Node} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Header, Tab, TabView} from 'react-native-elements';
import {FlatList, ScrollView, ScrollViewComponent, Text, View, ViewComponent} from 'react-native';
import styled from 'styled-components';
import BlogsScreen from './src/screens/blogs.screen';
import MyBlogsScreen from './src/screens/my-blogs.screen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Setting from './src/screens/setting.screen';
export const TitleApp = styled(Text)`
  font-size: 20px;
`;

const App: () => Node = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <SafeAreaProvider>
      <Header centerComponent={<TitleApp>Blog App</TitleApp>} />
      <Tab value={index} onChange={setIndex}>
        <Tab.Item title="Home" />
        <Tab.Item title="My Blog" />
        <Tab.Item title="Setting" />
      </Tab>
      { index === 0 && <BlogsScreen/>}
      { index === 1 && <MyBlogsScreen/>}
      { index === 2 && <Setting/>}
    </SafeAreaProvider>
  );
};

export default App;
