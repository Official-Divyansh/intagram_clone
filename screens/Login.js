import { View, Text, Image, TextInput, Button,SafeAreaView ,StyleSheet, StatusBar} from 'react-native'
import {useState, useEffect} from 'react'
import logo2 from '../assets/logo2.png'
import { client } from '../client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home'
export default function Login({navigation}) {
// AsyncStorage.clear()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [value, setValue] = useState('undefined')
  
  const SetUser = ()=>{
     console.log(email, password)
     const doc = {
       _id: password,
       _type: 'user',
       email: email,
       password: password
      }
     
      client.createIfNotExists(doc)
      .then((data)=>{
        console.log(data)
        AsyncStorage.setItem(
          'email',
          email
          );
          setEmail('')
          setPassword('')
          const IDE =  email.slice(0,email.length - 11)
        const doc2 = {
          _id: IDE,
          _type: 'followed',
          title: email,
          follower: 0
        }
        
        client.createIfNotExists(doc2)
        .then((data)=>{
          console.log(data)
          getData()
          navigation.navigate('Home')
   
          })
         
        })
      
      }
      const getData = async() =>{
        const data = await AsyncStorage.getItem("email");
        setValue(data)
        console.log(value, "Login")
      }
      
      
      useEffect( () => {
         getData()
         
        }, [value])
        
   
     if(value == undefined){
   return (
      <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={{ height: "80%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <View style={{ display: 'flex', justifyContent: 'center', width: "100%", height: 100, backgroundColor: "none" }}>
          <View style={{ alignItems: 'center' }}>

            <Image
              source={logo2}
              style={{ width: 160, height: 90, resizeMode: 'contain' }}

            />
          </View>
          <View style={{ marginRight: 60, marginLeft: 60 }}>
            <TextInput
            value={email}
            placeholderTextColor="rgba(0,0,0,.7)"
            placeholder='Phone number,email or username'
              style={{ backgroundColor: "gray", marginBottom: 14, padding: 9, color: "white" }}
              onChangeText={email => setEmail(email)}
            />
            <TextInput
            secureTextEntry={true}
            placeholderTextColor="rgba(0,0,0,.7)"
            placeholder="Password"
            value={password}
              style={{ backgroundColor: "gray", marginBottom: 14, padding: 9, color: "white",borderBottomWidth: 0}}
              onChangeText={password => setPassword(password)}
            />
            <Button
              title='Log In'
              onPress={()=> 
                SetUser()
              }
            />
            <Button
              title='Get In'
              onPress={()=> 
                getData()
              }
            />
          </View>
        </View>
      </View>
      <DividerWithText /> 
       <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
         <Text style={{color: 'white', fontSize: 12}}>Don't have account</Text>
         <Text style={{color: 'rgb(0,149,246)', fontSize: 15, fontWeight: 'bold', marginLeft: 6}}>Sign up</Text>
       </View>
       </SafeAreaView>
     )}else {
  return (
    <Home navigation={navigation} Email={value} />
   
    )
      }
     

  
}
const DividerWithText = () => (
  <View style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', flexDirection: 'row' }}>

    <View style={{ height: 1, width: "45%", backgroundColor: "gray" }}></View>

    <Text style={{ color: 'white', fontSize: 16, transform: [{ translateY: -10 }] }}>or</Text>
    <View style={{ height: 1, width: "45%", backgroundColor: "gray", alignItems: 'flex-end' }}></View>
  </View>

)

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});