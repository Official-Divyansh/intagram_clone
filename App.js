import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import CreatePost from './components/CreatePost';
import Bottom from './components/Bottom';
import Profile from './components/Profile';
import PostDetail from './screens/PostDetail'
import Home from './screens/Home';

export default function App() {
  const stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}} >
        <stack.Screen name='Login' component={Login} />
        <stack.Screen name='Home' component={Home} />
        <stack.Screen name='CreatePost' component={CreatePost} />
        <stack.Screen name='Profile' component={Profile} />
        <stack.Screen name='PostDetail' component={PostDetail}  />
      </stack.Navigator>
      
    </NavigationContainer>
  );
}

