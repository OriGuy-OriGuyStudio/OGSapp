import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import Colors from "../constants/Colors"

interface Props {
  text: string
  iconName: keyof typeof Ionicons.glyphMap
}

function IconwithText({ iconName, text }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={32} color={Colors.pink500} />
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default IconwithText

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: Colors.gray700,
    fontFamily: "Rubik-Medium",
    marginTop: 8,
  },
})
