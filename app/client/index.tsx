import { useNavigation } from "expo-router"
import { canGoBack } from "expo-router/build/global-state/routing"
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useLayoutEffect, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { useClient } from "../../src/context/ClientContext"
import {
  getClientById,
  getPaymentsByClientID,
  getPaymentsByProjectId,
  getProjectById,
  getProjectsByClientID,
} from "../../src/services/firestoreService"
import { getAuth } from "firebase/auth"
import {
  Client,
  FirestoreSchemaTypes,
  Payment,
  Project,
} from "../../src/types/firestoreSchemas"
import CustomHeader from "../../src/components/CustomHeader"
import Colors from "../../src/constants/Colors"
import IconwithText from "../../src/components/IconwithText"
import ProjectDashboardPreview from "../../src/components/dashboard/ProjectDashboardPreview"
import ProjectDashboardPaymentsPreview from "../../src/components/dashboard/ProjectDashboardPaymentsPreview"

// Define the Props interface (currently empty)
interface Props {}
interface DataSection {
  title: string
  data: FirestoreSchemaTypes[]
}
// Define the Dashboard component
function Dashboard({}: Props) {
  // Get navigation object from expo-router
  const navigation = useNavigation()
  // Get client and setClient from ClientContext
  const { client, setClient, projects, setProjects, payments, setPayments } =
    useClient()
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [loadingPayments, setLoadingPayments] = useState(true)
  const DATA: DataSection[] = [
    {
      title: `הפרוייקטים של ${client?.name}`,
      data: projects.length <= 0 ? [] : projects,
    },
    {
      title: "סטטוס תשלומים שנותרו",
      data: payments.length <= 0 ? [] : payments,
    },
  ]
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
    handleGetAllProjectsByClientId()
  }, [client]) // Add client as a dependency to update the title when client changes

  useEffect(() => {
    if (client) {
      handleGetAllProjectsByClientId()
    }
  }, [client])

  // useEffect to fetch payments when the client changes
  useEffect(() => {
    if (client) {
      handleGetAllPaymentsByClientId()
    }
  }, [client])
  // Functions
  async function handleGetAllProjectsByClientId() {
    const projectsFetched = await getProjectsByClientID(
      auth.currentUser?.uid as string
    )
    setProjects(projectsFetched)
    setLoadingProjects(false)
  }
  async function handleGetAllPaymentsByClientId() {
    try {
      setLoadingPayments(true)
      const paymentsFetched = await getPaymentsByClientID(
        auth.currentUser?.uid as string
      )
      setPayments(paymentsFetched)
    } catch (error) {
      console.error("Error fetching payments: ", error)
      setLoadingPayments(false)
    } finally {
      setLoadingPayments(false)
    }
  }

  // Render the component UI
  return (
    <View style={styles.container}>
      <View style={styles.dataContainers}>
        <Text style={styles.text}>פעולות מומלצות</Text>
        <View style={styles.iconsContainer}>
          <IconwithText text={"צ'אט מהיר"} iconName={"chatbubble-ellipses"} />
          <IconwithText text={"מידע אישי"} iconName={"person"} />
          <IconwithText text={"תשלומים"} iconName={"cash"} />
          <IconwithText text={"קבצים"} iconName={"file-tray-full"} />
        </View>
      </View>
      <SectionList
        style={{ paddingBottom: 16 }}
        sections={DATA}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => {
          if ((item as Project).name) {
            return (
              <ProjectDashboardPreview projectName={(item as Project).name} />
            )
          } else if ((item as Payment).status) {
            return <ProjectDashboardPaymentsPreview payment={item as Payment} />
          } else {
            return null
          }
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={() => <Text>אין פריטים להצגה</Text>}
        renderSectionFooter={({ section }) => {
          if (
            section.title === `הפרוייקטים של ${client?.name}` &&
            loadingProjects
          ) {
            return <ActivityIndicator size="large" color={Colors.purple500} />
          } else if (
            section.title === "סטטוס תשלומים שנותרו" &&
            loadingPayments
          ) {
            return <ActivityIndicator size="large" color={Colors.purple500} />
          } else {
            return null
          }
        }}
      />

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

    width: "100%",
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "Rubik-Black",
    marginTop: 16,
    marginBottom: 8,
    color: Colors.purple500,
    textAlign: "right",
    alignSelf: "flex-start",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 16,
  },
  dataContainers: {
    backgroundColor: Colors.wy100,
    paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    gap: 24,
    borderRadius: 24,
    width: "100%",
    elevation: 4, // Android shadow
    shadowColor: Colors.wy700, // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.25, // iOS shadow opacity
    shadowRadius: 4, // iOS shadow radius
  },
  text: {
    fontSize: 24,
    color: Colors.gray700,
    fontFamily: "Rubik-Bold",
  },
})

// <Text style={styles.sectionTitle}>הפרוייקטים של {client?.name}</Text>
//       {projects.length <= 0 ? (
//         <Text>אין פרוייקטים עדיין, בקרוב אורי יוסיף</Text>
//       ) : (
//         <FlatList
//           data={projects}
//           renderItem={(project) => {
//             return <ProjectDashboardPreview projectName={project.item.name} />
//           }}
//           keyExtractor={(project) => project.id}
//           ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
//         />
//       )}
