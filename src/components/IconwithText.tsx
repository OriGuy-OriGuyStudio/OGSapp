import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import Colors from "../constants/Colors"

interface Props {
  text: string
  iconName: keyof typeof Ionicons.glyphMap
  onPress?: () => void
}

function IconwithText({ iconName, text, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Ionicons name={iconName} size={32} color={Colors.pink500} />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
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
