import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Colors from "../../constants/Colors"
import IconwithText from "../IconwithText"
import { useRouter } from "expo-router"

interface Props {}

function RecommandedActions({}: Props) {
    const router = useRouter()
  return (
    <>
      <Text style={styles.text}>פעולות מומלצות</Text>
      <View style={styles.iconsContainer}>
        <IconwithText
          text={"צ'אט מהיר"}
          iconName={"chatbubble-ellipses"}
          onPress={() => router.push("/chat")}
        />
        <IconwithText text={"מידע אישי"} iconName={"person"} />
        <IconwithText text={"תשלומים"} iconName={"cash"} />
        <IconwithText text={"קבצים"} iconName={"file-tray-full"} />
      </View>
    </>
  )
}

export default RecommandedActions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    color: Colors.gray700,
    fontFamily: "Rubik-Bold",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 16,
  },
})
