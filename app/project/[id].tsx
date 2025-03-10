import { useLocalSearchParams, useNavigation } from "expo-router"
import React, { useLayoutEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import {
  getPaymentsByClientID,
  getPaymentsByProjectId,
  getProjectById,
} from "../../src/services/firestoreService"
import { Payment, Project } from "../../src/types/firestoreSchemas"
import CustomHeader from "../../src/components/CustomHeader"
import Colors from "../../src/constants/Colors"
import IconwithText from "../../src/components/IconwithText"

interface Props {}

function Index({}: Props) {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const [project, setProject] = useState<Project>()
  const [payment, setPayment] = useState<Payment>()

  async function handleGetProject() {
    const project = await getProjectById(id as string)
    const payment = await getPaymentsByProjectId(id as string)
    setProject(project as Project)
    setPayment(payment as Payment)
  }
  useLayoutEffect(() => {
    try {
      handleGetProject()
        .then(() => {})
        .finally(() => {
          navigation.setOptions({
            header: () => (
              <CustomHeader
                title={project?.name as string}
                isDashboard={false}
              />
            ),
          })
        })
    } catch (error) {
      console.log(error)
    }
  }, [id, project])
  return (
    <View style={styles.container}>
      <View style={styles.dataContainers}>
        <Text style={styles.sectionTitle}>מידע מהיר</Text>
        <View style={styles.mainProjectDataContaner}>
          <Text style={styles.label}>
            סטטוס הפרוייקט: <Text style={styles.status}>{project?.status}</Text>{" "}
          </Text>
          <Text style={styles.label}>
            שלב נוכחי : <Text style={styles.status}>{project?.stage}</Text>{" "}
          </Text>
          <Text style={styles.label}>
            תשלום שנותר :{" "}
            <Text style={styles.status}>
              {(payment?.totalPay as number) -
                (payment?.depositAmount as number) -
                (payment?.fullfillAmount as number)}{" "}
              ש"ח
            </Text>
          </Text>
          <View style={styles.iconsContainer}>
            <IconwithText text={"העלה קבצים"} iconName={"add"} />
            <IconwithText text={"תשלומים"} iconName={"cash"} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.wy100,
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  mainProjectDataContaner: {
    justifyContent: "flex-end",
    alignItems:"flex-end"
  },
  label: {
    fontFamily: "Rubik-Black",
    fontSize: 24,
    color: Colors.gray700,
    marginTop: -8,
  },
  status: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    color: Colors.gray700,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    width: "100%",
    gap: 16,
  },
  sectionTitle: {
    fontSize: 32,
    fontFamily: "Rubik-Black",
    // marginTop: 16,
    marginBottom: 8,
    color: Colors.purple500,
    textAlign: "right",
    alignSelf: "flex-end",
  },
  dataContainers: {
    backgroundColor: Colors.wy100,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignItems: "flex-end",
    borderRadius: 24,
    width: "100%",
    elevation: 4,
    shadowColor: Colors.wy700,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 16,
  },
  text: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
})
