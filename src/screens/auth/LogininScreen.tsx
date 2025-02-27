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
import { getClientById } from "../../services/firestoreService"
import {
  getAuth,
  getReactNativePersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "../../config/firebaseConfig"
import { useClient } from "../../context/ClientContext"
import { Client } from "../../types/firestoreSchemas"
import FloatingLabelInput from "../../components/FloatingLabelInput"
import Colors from "../../constants/Colors"
import WhatsAppLink from "../../components/WhatsappLink"
import { persistentLocalCache } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface Props {}

function LogininScreen({}: Props) {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigation = useNavigation()
  const router = useRouter()
  const { client, setClient } = useClient()
  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      const client = await getClientById(res.user.uid)
      setClient(client as Client)
      //   router.push("/OTPVerificationScreen")
    } catch (error) {
      Alert.alert("שגיאה", "שגיאה")
      console.log(error)
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        source={require("../../../assets/images/logo/appLogo.png")}
        style={{ width: 100, height: 100 }}
      />
      <View style={styles.headersContainer}>
        <Text style={styles.h1}>ברוכים הבאים </Text>
        <Text style={styles.h2}>זה הזמן להתחבר</Text>
      </View>

      <FloatingLabelInput
        label={"אימייל"}
        value={email}
        onChangeText={setEmail}
      />

      <FloatingLabelInput
        label="סיסמא"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        className="flex-row items-center justify-center px-8 py-3 mt-4 bg-pink500 rounded-2xl"
        onPress={handleLogin}
      >
        <Text
          style={{ fontFamily: "Rubik-Black" }}
          className="text-2xl text-center text-wy100"
        >
          התחבר
        </Text>
      </Pressable>
      <WhatsAppLink />
    </KeyboardAvoidingView>
  )
}

export default LogininScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.wy100,
  },
  headersContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    fontSize: 32,
    fontFamily: "Rubik-Black",
    // marginBottom: 16,
    marginTop: 16,
    color: Colors.gray700,
  },
  h2: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
    marginBottom: 16,
    marginTop: -12,
    color: Colors.gray700,
  },
  note: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    // marginBottom: 8,
    marginTop: 16,
    color: Colors.gray700,
  },
})
