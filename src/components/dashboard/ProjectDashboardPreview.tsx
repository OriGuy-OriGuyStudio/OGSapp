import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import IconwithText from "../IconwithText"
import Colors from "../../constants/Colors"
import { Project } from "../../types/firestoreSchemas"
import { useRouter } from "expo-router"

interface Props {
  project: Project
}

function ProjectDashboardPreview({ project }: Props) {
  const router = useRouter()
  return (
    <View style={styles.dataContainers}>
      <Pressable onPress={() => router.push(`/project/${project.id}`)}>
        <Text style={styles.text}>
          {project.name}{" "}
          <Text style={styles.stageText}>(שלב נוכחי: {project.stage})</Text>
        </Text>
      </Pressable>

      <View style={styles.iconsContainer}>
        <IconwithText text={"העלה קובץ"} iconName={"add"} />
        <IconwithText text={"תשלומים"} iconName={"cash"} />
        <IconwithText text={" לוח זמנים"} iconName={"calendar"} />
      </View>
    </View>
  )
}

export default ProjectDashboardPreview

const styles = StyleSheet.create({
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
  stageText: {
    fontSize: 16,
    color: Colors.purple500,
    fontFamily: "Rubik-Medium",
  },
})
