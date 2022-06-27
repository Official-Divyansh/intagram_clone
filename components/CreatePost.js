import { View, Text, ScrollView ,Image, TextInput, Button} from 'react-native'
import {useEffect, useState} from 'react'
import Bottom from './Bottom'
import * as ImagePicker from 'expo-image-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { client } from '../client'
import { supabase } from '../supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function CreatePost({route,navigation}) {
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')
    const [file, setFile] = useState('')
    const [postCreate, setPostCreate] = useState('change dp')
    const [profilePicture, setProfilePicture] = useState(false)

    const uploadImage = async  (photo) =>{
        const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1)
        const filename  = photo.uri.replace(/^.*[\\\/]/, "")
        var formData = new FormData();
        formData.append("file",{
            uri: photo.uri,
            name: filename,
            type: photo.type ? `image/${ext}` : `video/${ext}`
        })
        const {data,error} = await supabase.storage.from("avatars").upload(filename, formData)
        
        if(data)
        download(filename)

        
    }
    const pickImage = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            
            quality: 0.5,
        });
        
        if (!result.cancelled) {
            setImage(result.uri)
            uploadImage(result)
        }
    }
     const download =  async (photo)=>{
        const { publicURL, error } = supabase
  .storage
  .from('avatars')
  .getPublicUrl(photo)

console.log(publicURL)
setFile(publicURL)
    
    }


    const savePin = () => {
   
        const doc = {
            _type: 'post',
            id: Number.MIN_SAFE_INTEGER,
            title: route.params.name,
            caption,
            watchList: false,
            image: file
        }
          client.create(doc).then(() => {
              console.log(doc)
           navigation.navigate('Login');
          });
        
      };
      const getData = async() =>{
        const data = await AsyncStorage.getItem("email");
        client.patch(data.slice(0,data.length - 11))
        .setIfMissing({profilePicture: file})
        .set({profilePicture: file})
        .commit()
       

      }
      useEffect(() => {
       getData()
      }, [])
      


  return (
      <>   
          <Button
          title={postCreate}
          onPress={()=> {
            setProfilePicture(!profilePicture)  
            if(profilePicture)
            setPostCreate('change Dp')
            else
            setPostCreate('Create Post')
        }}
          />
        
      {
          profilePicture ?
          <ChangeToScreen  image={image} pickImage={pickImage} savePin={getData}      placeholder="Change your bio here...." img='Change Dp' />
          : <ChangeToScreen image={image} pickImage={pickImage} savePin={savePin}
          setCaption={setCaption} placeholder="Caption here...."  img='Create Post'  />
      }
      </>
  )

}



const ChangeToScreen = ({image , pickImage, savePin, placeholder, img, setCaption})=>{
    return (
        <View style={{height: "100%",backgroundColor: 'black'}}>
        <View style={{height: '95%'}}>
        
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: "40%"}}>
                {
                    image ==null ? (
                        <>
                        <Text onPress={pickImage} style={{color: 'white'}}>{img}</Text>
                        <Ionicons onPress={pickImage} name='add-outline' color='white' size={25} />
                        </>
                        
                    ): (
                        <Image source={{ uri: image }} style={{ width: "90%", height: "100%" }} />
                        )
                }
                      
            </View>
            
        <Divider />
        
        <View style={{marginVertical: 20}}>
            <TextInput
            placeholder={placeholder}
            style={{backgroundColor: 'gray', height: 60, 
            color:'white',padding: 20, fontSize: 16, margin: 10}}
            onChangeText={caption => setCaption(caption)}
            />
        </View>
        <View style={{transform: [{translateY: 250}]}}>
        <Button
        onPress={savePin}
        title='Post'
        />
        </View>
            
        </View>
           <Bottom/>
           
              </View>
    )
}