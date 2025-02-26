import React, { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import {
  signInWithPhoneNumber,
  verifyCode,
} from "../../services/firestoreService"
import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { useAuth } from "../../context/AuthContext"

const OTPVerificationScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const { confirm } = useAuth()

  // אימות קוד SMS
  const handleVerifyCode = async () => {
    if (!confirm) return
    try {
      await verifyCode(confirm, verificationCode)
      Alert.alert("הצלחה!", "התחברת בהצלחה.")
    } catch (error) {
      Alert.alert("שגיאה", "הקוד שהוזן שגוי.")
    }
  }

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
        <Button title="אמת קוד" onPress={handleVerifyCode} />
      </>
    </View>
  )
}

export default OTPVerificationScreen
