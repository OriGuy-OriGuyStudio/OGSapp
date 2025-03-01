import React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import Colors from "../constants/Colors"
import { SafeAreaView } from "react-native-safe-area-context"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "expo-router"

interface Props {
  title: string
  isDashboard: boolean
}

const CustomHeader = ({ title, isDashboard }: Props) => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <FontAwesome5 name="user-edit" size={24} color={Colors.wy100} />
        <Text style={styles.title}>{title}</Text>
        {isDashboard ? (
          <></>
        ) : (
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.wy100} />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.purple500,
    borderRadius: 24,
    // paddingHorizontal: 24,
  },
  header: {
    backgroundColor: Colors.purple500,
    borderRadius: 24,
    // padding: 10,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 88, // Set a fixed height for the header
  },
  title: {
    color: Colors.wy100,
    fontFamily: "Rubik-Black",
    fontSize: 24,
  },
})

export default CustomHeader
