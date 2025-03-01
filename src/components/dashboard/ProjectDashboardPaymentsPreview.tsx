import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { getProjectById } from "../../services/firestoreService"
import { Payment, Project } from "../../types/firestoreSchemas"
import Colors from "../../constants/Colors"

interface Props {
  payment: Payment
}

function ProjectDashboardPaymentsPreview({ payment }: Props) {
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    async function fetchProject() {
      if (payment.projectId) {
        const projectFetched = await getProjectById(payment.projectId)
        setProject(projectFetched as Project)
      }
    }
    fetchProject()
  }, [payment.projectId])
  const getStatusStyle = (status: string) => {
    return status === "שולם" ? styles.greenText : styles.redText
  }
  return (
    <View style={styles.dataContainers}>
      <Text style={styles.projectName}>{project?.name}</Text>
      <Text style={styles.text}>
        מקדמה:{" "}
        <Text style={getStatusStyle(payment.despositStatus)}>
          {payment.despositStatus}
        </Text>
      </Text>
      <Text style={styles.text}>
        תשלום סופי:{" "}
        <Text style={getStatusStyle(payment.fullfillStatus)}>
          {payment.fullfillStatus}
        </Text>
      </Text>
    </View>
  )
}

export default ProjectDashboardPaymentsPreview

const styles = StyleSheet.create({
  dataContainers: {
    backgroundColor: Colors.wy100,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 24,
    width: "100%",
    elevation: 4,
    shadowColor: Colors.wy700,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 16,
  },
  projectName: {
    fontSize: 20,
    color: Colors.gray700,
    fontFamily: "Rubik-Black",
  },
  text: {
    fontSize: 16,
    color: Colors.gray700,
    fontFamily: "Rubik-Medium",
  },
  label: {
    fontSize: 16,
    color: Colors.gray700,
    fontFamily: "Rubik-Bold",
  },
  paymantContainer: {
    flexDirection: "row",
  },
  greenText: {
    color: Colors.purple500,
    fontFamily: "Rubik-Black",
  },
  redText: {
    color: Colors.red500,
    fontFamily: "Rubik-Black",
  },
  additionalText: {
    fontSize: 16,
    color: Colors.gray700,
    fontFamily: "Rubik-Medium",
    marginTop: 8,
  },
})
