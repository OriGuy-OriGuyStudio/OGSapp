import { StatusBar } from "expo-status-bar"
import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import LogininScreen from "../src/screens/auth/LogininScreen"
import "../global.css"
import { useClient } from "../src/context/ClientContext"
import Dashboard from "./client"
import { getAuth } from "firebase/auth"
import Colors from "../src/constants/Colors"
interface Props {}

function Home({}: Props) {
  const { client } = useClient()
  const isAuth = getAuth()
  useEffect(() => {}, [client])
  return (
    <View style={styles.container}>
      {isAuth.currentUser?.email ? <Dashboard /> : <LogininScreen />}

      <StatusBar style="auto" />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.wy100,
  },
})
