import { useNavigation } from "expo-router"
import { canGoBack } from "expo-router/build/global-state/routing"
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useLayoutEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useClient } from "../../src/context/ClientContext"
import { getClientById } from "../../src/services/firestoreService"
import { getAuth } from "firebase/auth"
import { Client } from "../../src/types/firestoreSchemas"
import CustomHeader from "../../src/components/CustomHeader"
import Colors from "../../src/constants/Colors"
import IconwithText from "../../src/components/IconwithText"

// Define the Props interface (currently empty)
interface Props {}

// Define the Dashboard component
function Dashboard({}: Props) {
  // Get navigation object from expo-router
  const navigation = useNavigation()
  // Get client and setClient from ClientContext
  const { client, setClient } = useClient()
  // Get the authentication object from Firebase
  const auth = getAuth()

  // useLayoutEffect to fetch client data when the component mounts
  useLayoutEffect(() => {
    async function getClient() {
      // Fetch client data by user ID
      const clientFetched = await getClientById(auth.currentUser?.uid as string)
      return clientFetched as Client
    }
    // Set the fetched client data to the state
    getClient().then((client) => setClient(client))
  }, [])

  // useEffect to set navigation options when the component mounts
  useEffect(() => {
    navigation.setOptions({
      //   headerShown: true,
      // Set the header title with the client's name
      header: () => <CustomHeader title={`שלום ${client?.name}  👋🏻`} />,
    })
  }, [client]) // Add client as a dependency to update the title when client changes

  // Render the component UI
  return (
    <View style={styles.container}>
      <View style={styles.dataContainers}>
        <Text style={styles.text}>פעולות מומלצות</Text>
        <View style={styles.iconsContainer}>
          <IconwithText text={"צ'אט מהיר"} iconName={"chatbubble-ellipses"} />
          <IconwithText text={"צ'אט מהיר"} iconName={"chatbubble-ellipses"} />
          <IconwithText text={"צ'אט מהיר"} iconName={"chatbubble-ellipses"} />
          <IconwithText text={"צ'אט מהיר"} iconName={"chatbubble-ellipses"} />
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  )
}

export default Dashboard

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.wy100,
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  dataContainers: {
    backgroundColor: Colors.wy500,
    paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    gap: 24,
    borderRadius: 24,
    width: "100%",
  },
  text: {
    fontSize: 20,
    color: "#000",
    fontFamily: "Rubik-Bold",
  },
})
