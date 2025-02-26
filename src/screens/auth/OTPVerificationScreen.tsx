import React, { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"

import { FirebaseAuthTypes } from "@react-native-firebase/auth"

const OTPVerificationScreen = () => {
  return (
    <View style={{ padding: 20 }}>
      <>
        <Text>🔢 הזן קוד אימות:</Text>
      </>
    </View>
  )
}

export default OTPVerificationScreen
