import { View, Text, TextInput, Button } from 'react-native'
import {useState} from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import firebase from '../firebase'

export default function Register() {
    const [name , setName] = useState()
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const onSignUp = ()=>{
      console.log(email, password)

        firebase.auth().createUserWithEmailAndPassword(`${email}`, `${password}`)
        .then((result)=>{
            console.log(result)
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <SafeAreaView>
    <View>
      <TextInput 
      
      placeholder='name'
      onChangeText={name=> setName(name) }
      />
      <TextInput 
      placeholder='Email'
      onChangeText={email => setEmail(email) }
      />
      <TextInput 
      placeholder='password'
      secureTextEntry={true}
      onChangeText={password=> setPassword(password) }
      />
      <Button
      onPress={()=> onSignUp()}
      title="SignUp"
      />
    </View>
      </SafeAreaView>
  )
}