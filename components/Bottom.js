import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import  Ionicons  from 'react-native-vector-icons/Ionicons'

export default function Bottom({navigation,title}) {
  useEffect(()=>{
    console.log(title, "bottom")
  },[])
  return (
    <View style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 20,
        justifyContent: "space-between",
        backgroundColor: 'black'
    }}>
    
        <Icon icon="home-outline"/>
        <Icon icon="search-outline"  />
        <Icon icon="add-outline" navigation={navigation} uri="CreatePost" title={title}/>
        <Icon icon="heart-outline" />
        <Icon icon="person-circle-outline" title={title}  navigation={navigation} uri="Profile"/>
    </View>
  )
}

const Icon = ({title,navigation,...props})=>(
    <View>

    <Ionicons
    name={props.icon}
    size={25}
    color='white'
    style={{
        marginBottom: 3,
        alignSelf: 'center'
    }}
    onPress={()=> navigation.navigate(props.uri,{
      name: title  

    })}
    />
   
    </View>
)