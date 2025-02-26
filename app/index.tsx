import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, View } from "react-native"
import LogininScreen from "../src/screens/auth/LogininScreen"
import "../global.css"
interface Props {}

function Home({}: Props) {
  return (
    <View style={styles.container}>
      <LogininScreen />

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
    backgroundColor: "#fff",
  },
})
