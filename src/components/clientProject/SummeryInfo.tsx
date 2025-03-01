import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Colors from "../../constants/Colors"
import { Project } from "../../types/firestoreSchemas"
import IconwithText from "../IconwithText"

interface Props {
  project: Project
}

function SummeryInfo({ project }: Props) {
  return (
    <></>
  )
}

export default SummeryInfo

const styles = StyleSheet.create({
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
    justifyContent: "flex-start",
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
    alignSelf: "flex-start",
  },
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
  text: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
})
