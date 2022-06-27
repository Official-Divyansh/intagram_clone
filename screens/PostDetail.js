import { View, Text, Image , StyleSheet, Button, RefreshControl,ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import instaLogo from '../assets/instaLogo.png'
import { Divider } from 'react-native-elements'
import { searchFollower } from '../utils/fetch'
import { client } from '../client'


export default function PostDetail({route, navigation}) {
  const [follower, setFollower] = useState()
  const [folow, setFolow] = useState('Follow')
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const profileName= route.params.name
  const Email= route.params.Email
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
    }, 2000);
    
  }, []);

  useEffect(()=>{
    console.log(Email, "rouyte params")
   
     setLoading(false)
     const query = searchFollower(profileName)
    
    client.fetch(query)
    .then((data)=>{
      setFollower(data[0].follower)
      console.log(data[0].followedBy)
      if(data[0].followedBy != null){
        data[0].followedBy.map((data)=>{
          if(data == Email){
            setFolow('UnFollow')
            setLoading(false)
          }
        })
      }
      
    })
    setLoading(false)
  },[refreshing, folow])


  const followBtn = ()=>{
    client
    .patch(profileName.slice(0, profileName.length - 11)) // Document ID to patch
    .inc({follower: 1}) // Increment field by count
    .setIfMissing({followedBy: []})
    .commit() // Perform the patch and return a promise
    .then(() => {
      setFolow('UnFollow')
      client
      .patch(profileName.slice(0, profileName.length - 11))
      .setIfMissing({followedBy: []})
      .insert('after', 'followedBy[-1]', [Email])
      .commit()
    .then((updatedBike) => {
      console.log('Hurray, the bike is updated! New document:')
      console.log(updatedBike)
    })
    })
  }
  const UnFollowBtn = ()=>{
    client
    .patch(profileName.slice(0, profileName.length - 11)) // Document ID to patch
    .set({inStock: false}) // Shallow merge
    .dec({follower: 1}) // Increment field by count
    .commit() // Perform the patch and return a promise
    .then((updatedBike) => {
      console.log('Hurray, the bike is updated! New document:')
      console.log(updatedBike)
      setFolow('Follow')
    })
    .catch((err) => {
      console.error('Oh no, the update failed: ', err.message)
    })
  }

  if(loading){
    return (
      <Text>Loading...</Text>
    )
  }else{
  return (
         <>
         <SafeAreaView style={{backgroundColor: 'black', flex: 1}}
         >
         
         <View >
         <View style={{display: 'flex' , flexDirection: 'row', alignItems: 'center'}}> 
             <Ionicons  name="chevron-back-outline" color='white' size={35} onPress={()=> navigation.goBack()} />
           <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20, color: 'white'}}>{profileName.slice(0, profileName.length-4)}...</Text>
           </View>
     
           <View style={{display: 'flex', flexDirection: 'row',  marginTop: 20, alignItems: 'center', justifyContent: 'space-between',}}>
             <View>
     
           <Image
           source={instaLogo}
           style={{ width: 160, height: 90, resizeMode: 'contain', transform: [{translateX: -15}]}}
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
     
           <View style={{display: 'flex', flexDirection: 'row',alignItems: 'center', height: '30%' }}>
           <View style={[{ width: "40%",margin: 10}]}>
             {
               folow == 'Follow' ?(
               <Button
               title='Follow'
               onPress={followBtn}
               />
               ) :(
                 <Button
                 title='Unfollow'
                 onPress={UnFollowBtn}
                 />
               )
             }
             </View> 
           <View style={[{ width: "40%",  borderWidth: 1, borderColor: 'gray',margin: 10 }]}>
               <Button
                 title="Message" 
                 color='#000'
                 />
             </View> 
           </View>
           <Divider />
         </View>
         <ScrollView
           refreshControl={
             <RefreshControl
               refreshing={refreshing}
               onRefresh={onRefresh}
            /> }
             >
               </ScrollView>
         </SafeAreaView>
         </>
     )
           }
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