import React, {useEffect, useState} from "react"
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import {useNavigation, useRouter} from "expo-router";

interface Props {}

function AuthScreen({}: Props) {
    const router = useRouter();
    const navigation = useNavigation();
  const [phonenumber, setPhonenumber] = useState<string>("")
    useEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, []);
  return (
    <KeyboardAvoidingView className="bg-wy100 flex-1 w-full justify-center items-center align-middle">
      <Image
        source={require("../../../assets/images/logo/appLogo.svg")}
        style={{ width: 150, height: 150 }}
      />
      <Text
        style={{ fontFamily: "Rubik-Black" }}
        className="text-5xl text-purple500 mb-6"
      >
        זה הזמן להתחבר
      </Text>

      <Text
        style={{ fontFamily: "Rubik-Bold" }}
        className="text-3xl mb-4 text-gray700"
      >
        הזמן מספר טלפון
      </Text>
      <TextInput
        keyboardType="phone-pad"
        keyboardAppearance="default"
        onChangeText={setPhonenumber}
        value={phonenumber}
        className="border-2 border-gray500 rounded-lg p-2 w-3/5"
      />
    </KeyboardAvoidingView>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3a3a3a",
  },
  text: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
})
