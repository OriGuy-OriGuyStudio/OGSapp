import { useNavigation } from "expo-router"
import { canGoBack } from "expo-router/build/global-state/routing"
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useLayoutEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useClient } from "../../src/context/ClientContext"
import { getClientById } from "../../src/services/firestoreService"
import { getAuth } from "firebase/auth"
import { Client } from "../../src/types/firestoreSchemas"

interface Props {}

function Dashboard({}: Props) {
  const navigation = useNavigation()
  const { client, setClient } = useClient()
  const auth = getAuth()
  useLayoutEffect(() => {
    async function getClient() {
      const clientFetched = await getClientById(auth.currentUser?.uid as string)
      return clientFetched as Client
    }
    getClient().then((client) => setClient(client))
  }, [])
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `שלום ${client?.name}`,
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
      <StatusBar style="auto" />
    </View>
  )
}

export default Dashboard

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
