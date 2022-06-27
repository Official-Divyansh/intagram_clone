import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import  Ionicons  from 'react-native-vector-icons/Ionicons'
import {client} from '../client'
import { searchLikes } from '../utils/fetch'



export default function FetchPost({postData, navigation, setPost}) {
   const [indexNum, setIndexNum] = useState([])
   let s =[]
   const onClick = (id)=>{
      
     s[id] = [...s, id]
     setIndexNum(s)
     console.log(indexNum)
   }
  return (
    <>
     {postData.map((data,index)=>(
      <TouchableOpacity key={index} activeOpacity={0.94} style={{marginBottom: 20}}  >
        <TouchableOpacity onPress={()=> navigation.navigate('PostDetail', {
        name: data.title
      })} >

          <View style={{display: 'flex',flexDirection: 'row', alignItems: 'center', padding: 8, justifyContent: 'space-between'}}>

            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
            
            >
          <Ionicons
          size={35}
          color='white'
          name="person-circle-outline"/>
       <Text style={{color: 'white', marginLeft: 10}} >{data.title}</Text>
       </View>
        
       <Ionicons name="ellipsis-vertical-outline" 
       color="white"
       size={20}
       />
          </View>
       </TouchableOpacity>

       <RestaurentImage image={data.image} />
      
       <View style={{flexDirection:'row' , justifyContent: 'space-between', alignItems: 'center', marginTop: 15}}>
      <View style={{flexDirection:'row' , justifyContent: 'space-between', alignItems: 'center'}}>
        
        <Ionicons color="white" size={25} style={{marginLeft: 15}}
        name={s[id] == index? 'heart' : 'heart-outline'}
        onPress={()=> onClick(index) }
        />
    
           
        <Ionicons name='chatbubble-outline' color="white" size={25} style={{marginLeft: 15}} />
        <Ionicons name='paper-plane-outline' color="white" size={25} style={{marginLeft: 15}} />
      </View>
        <Ionicons name='bookmark-outline' color="white" size={25} />
    </View>
  <Text style={{color:"white"}} >Liked by dark emerade and others 56</Text>
  <Text style={{color:"white"}} >{data.caption}</Text>
        </TouchableOpacity>
    ))}
    
   </>
  )
}

//  <RestaurentInfo name={data.caption}  post={post} setLike={setLike} title={data.title}  /> 
// const RestaurentInfo = ({name,like,setLike,title,post})=>(
//   <>
//     <View style={{flexDirection:'row' , justifyContent: 'space-between', alignItems: 'center', marginTop: 15}}>
//       <View style={{flexDirection:'row' , justifyContent: 'space-between', alignItems: 'center'}}>
        
//         <Ionicons name='heart-outline' color="white" size={25} style={{marginLeft: 15}}
//         onPress={()=> watchList ? onAd}
//         />
              
            
//         <Ionicons name='chatbubble-outline' color="white" size={25} style={{marginLeft: 15}} />
//         <Ionicons name='paper-plane-outline' color="white" size={25} style={{marginLeft: 15}} />
//       </View>
//         <Ionicons name='bookmark-outline' color="white" size={25} />
//     </View>
//   <Text style={{color:"white"}} >Liked by dark emerade and others 56</Text>
//   <Text style={{color:"white"}} >{name}</Text>
//   </>
// )

const RestaurentImage = (props)=>(
    <>
    <Image
    source={{
        uri: props.image
    }}
style={{width: "100%", aspectRatio: 1, alignContent: 'center'}}
    />
    </>
)
