import { useNavigation, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Alert,
} from "react-native"
import {
  signInWithPhoneNumber,
  verifyCode,
} from "../../services/firestoreService"
import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { useAuth } from "../../context/AuthContext"

interface Props {}

function LogininScreen({}: Props) {
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const { setConfirm } = useAuth()
  const navigation = useNavigation()
  const router = useRouter()
  const handleSendCode = async () => {
    try {
      const confirmation = await signInWithPhoneNumber(phoneNumber)
      setConfirm(confirmation) // שמירה ב-Context
      router.push("/OTPVerificationScreen")
    } catch (error) {
      Alert.alert("שגיאה", "אירעה שגיאה בשליחת הקוד.")
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  return (
    <KeyboardAvoidingView className="items-center justify-center flex-1 w-full align-middle bg-wy100">
      <Image
        source={require("../../../assets/images/logo/appLogo.png")}
        style={{ width: 100, height: 100 }}
      />
      <Text
        style={{ fontFamily: "Rubik-Bold" }}
        className="mt-8 mb-1 text-xl text-gray700"
      >
        הזמן מספר טלפון
      </Text>
      <TextInput
        keyboardType="phone-pad"
        keyboardAppearance="default"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        className="w-3/5 p-2 border-2 rounded-lg border-gray500"
      />
      <Pressable
        className="flex-row items-center justify-center px-8 py-3 mt-4 bg-pink500 rounded-2xl"
        onPress={handleSendCode}
      >
        <Text
          style={{ fontFamily: "Rubik-Bold" }}
          className="text-2xl text-center text-wy100"
        >
          שלח קוד אימות
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

export default LogininScreen

