import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { SafeAreaView } from "react-native-safe-area-context"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
interface Props {
  title: string
}

const CustomHeader = ({ title }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <FontAwesome5
          name="user-edit"
          size={24}
          color={Colors.wy100}
          style={styles.icon}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.purple500,
    borderRadius: 24,
  },
  header: {
    backgroundColor: Colors.purple500,
    borderRadius: 24,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    height: 88, // Set a fixed height for the header
  },
  title: {
    color: Colors.wy100,
    fontFamily: "Rubik-Black",
    fontSize: 24,
  },
  icon: {
    marginRight: 10,
    position: "absolute",
    left: 24,
  },
})

export default CustomHeader
