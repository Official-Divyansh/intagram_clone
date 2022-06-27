import {RefreshControl, View, Text, SafeAreaView, StyleSheet, StatusBar, ScrollView, Image } from 'react-native'
import React,{ useState } from 'react'
import logo2 from '../assets/logo2.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Bottom from '../components/Bottom'
import New from '../components/fetchPost'




const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function Home({ navigation, Email }) {
  const [post, setPost] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  // useEffect(() => {
    // const query = '*[_type == "Followed" && title == $ownerId ]'
    // client
    // .patch('72bd0305-05c7-4b02-8240-ddd5442f51bb') // Document ID to patch
    // .set({inStock: false}) // Shallow merge
    // .inc({follower: 1}) // Increment field by count
    // .insert('after', 'followed[-1]',['comment'])
    // .commit() // Perform the patch and return a promise
    // .then((updatedBike) => {
    //   console.log('Hurray, the bike is updated! New document:')
    //   console.log(updatedBike)
    // })
    // .catch((err) => {
    //   console.error('Oh no, the update failed: ', err.message)
    // })
   
  // }, [refreshing])
  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
    return (
      <>
      <StatusBar />
      <SafeAreaView style={styles.AndroidSafeArea}>
        <View >
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
            <Image
              source={logo2}
              style={{ width: 100, height: 90, resizeMode: 'contain', marginLeft: 15 }}
            />

            <Ionicons name='add-outline' color="white" size={30} style={{ transform: [{ translateX: 70 }] }} />
            <Ionicons name='paper-plane-outline'
              onPress={() => navigation.navigate("CreatePost")}
              color="white" size={23} style={{ marginRight: 15 }} />
          </View>
        </View>
  
        <ScrollView
         refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={true} >
        
           <New navigation={navigation}  refreshing={refreshing} Email={Email}  />
        </ScrollView>

        <Bottom navigation={navigation} title={Email} />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "black",
    //   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    
  }
});
