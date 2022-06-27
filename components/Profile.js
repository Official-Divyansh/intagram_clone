import { View, Text, Button, ScrollView, Image, StyleSheet, RefreshControl } from 'react-native'
import React,{useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchFollower } from '../utils/fetch';
import { client } from '../client';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({route, navigation}) {
  const [follower, setFollower] = useState()
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profilePic, setProfilePic] = useState('')
  const profileName= route.params.name
  // const Email= route.params.Email
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
    }, 2000);
    
  }, []);

  useEffect(()=>{
     setLoading(true)
     console.log(profileName)
     const query = searchFollower(profileName)
     client.fetch(query)
    .then((data)=>{
      console.log(data, 'profile')
      setProfilePic(data[0].profilePicture)
      setFollower(data[0].follower)  
    })
    setLoading(false)
  },[])

  // const getDp =()=>{
  //   const data = await AsyncStorage.getItem("Dp");
  //   setProfilePic(data)
  // }
  const logOut = ()=>{
     AsyncStorage.clear();
     navigation.navigate('Login')
    
  }

  const url = 'https://qsjdgpnkfcaontjgobdf.supabase.co/storage/v1/object/public/avatars/9a97baee-e6fe-4add-9249-f18e6045ae6c.jpg'


  return (
         <>
         <SafeAreaView style={{backgroundColor: 'black', flex: 1}}
         >
         
         <View >
         <View style={{display: 'flex' , flexDirection: 'row', alignItems: 'center'}}> 
             <Ionicons  name="chevron-back-outline" color='white' size={35} onPress={()=> navigation.goBack()} />
           <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20, color: 'white'}}>{profileName}...</Text>
           </View>
     
           <View style={{display: 'flex', flexDirection: 'row',  marginTop: 20, alignItems: 'center', justifyContent: 'space-between',}}>
             
             <View style={{marginLeft: 10}}>
     
           <Image
           source={{uri: profilePic?profilePic: url}}
          style={{ width: 90, height: 90, resizeMode: 'contain', borderRadius : 400/2 }}
           />
           </View>
            
            <View style={{display: 'flex', flexDirection: 'row', transform: [{translateX: -20}], justifyContent: 'space-between', }}>
              <View>
                <Text style={styles.numbers}>0</Text>
                <Text style={styles.Items}>Posts</Text>
              </View>
              <View>
                <Text style={styles.numbers}>{follower}</Text>
                <Text style={styles.Items}>Followers</Text>
              </View>
              <View>
                <Text style={styles.numbers}>0</Text>
                <Text style={styles.Items}>Following</Text>
              </View>
            </View>
            
           </View>
     
         
           
           <Divider style={{marginTop: 20}} />
         </View>
         <ScrollView
           refreshControl={
             <RefreshControl
               refreshing={refreshing}
               onRefresh={onRefresh}
            /> }
             >
               </ScrollView>
               <Button 
               title='Log out'
               onPress={logOut}
               />
         </SafeAreaView>
         </>
     )
           }

const styles = StyleSheet.create({
  numbers: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: "700"
  },
  Items: {
    color: 'white', 
    fontSize: 18,
    marginLeft: 10
  }
})