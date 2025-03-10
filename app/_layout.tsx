import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import React, { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import "../global.css"
import { ClientProvider } from "../src/context/ClientContext"
import Colors from "../src/constants/Colors"
import CustomHeader from "../src/components/CustomHeader"
interface Props {}
SplashScreen.preventAutoHideAsync()
function Layout({}: Props) {
  const [loaded, error] = useFonts({
    "Rubik-Black": require("../assets/fonts/Rubik-Black.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
  })
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <ClientProvider>
      <Stack
        screenOptions={
          {
            header: () => <CustomHeader title={""} isDashboard={false} />
            //   headerShown: true,
            //   headerStyle: {
            //     backgroundColor: Colors.purple500,
            //   },
            //   headerTintColor: Colors.wy100,
            //   headerTitleStyle: {
            //     // fontWeight: "bold",
            //     fontFamily: "Rubik-Black",
            //     fontSize: 24,
            //   },
            //   headerTitleAlign: "center",
            //   contentStyle: {
            //     width: "100%",
            //   },
          }
        }
      ></Stack>
    </ClientProvider>
  )
}

export default Layout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
})
