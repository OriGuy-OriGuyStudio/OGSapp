import React, { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"

import { FirebaseAuthTypes } from "@react-native-firebase/auth"

const OTPVerificationScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")

 

  return (
    <View style={{ padding: 20 }}>
      <>
        <Text>🔢 הזן קוד אימות:</Text>
        <TextInput
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="numeric"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
        {/* <Button title="אמת קוד" onPress={handleVerifyCode} /> */}
      </>
    </View>
  )
}

export default OTPVerificationScreen
