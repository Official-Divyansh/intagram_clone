import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function LandingScreen({navigation}) {
  return (
      <SafeAreaView>

    <View>
      <Button
      title='Regiser'
      onPress={()=> navigation.navigate("Register")}
      />
      <Button
      title='Login'
      onPress={()=> navigation.navigate("Login")}
      />
    </View>
      </SafeAreaView>
  )
}