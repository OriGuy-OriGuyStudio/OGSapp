import React from "react"
import { Text, Pressable, StyleSheet, Linking, Alert } from "react-native"
import Colors from "../constants/Colors"

const WhatsAppLink = () => {
  const phoneNumber = "972547520899" // החלף למספר שלך בפורמט בינלאומי ללא "+"
  const message = encodeURIComponent(
    "שלום, אני מעוניין במידע נוסף על השירותים של הסטודיו 😊!"
  )

  const openWhatsApp = async () => {
    const url = `https://wa.me/${phoneNumber}?text=${message}`

    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url)
    } else {
      Alert.alert("שגיאה", "לא ניתן לפתוח את וואטסאפ.")
    }
  }

  return (
    <Pressable onPress={openWhatsApp}>
      <Text style={styles.note}>עדיין לא רשום? צור קשר עם סטודיו אורי גיא</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  note: {
    color: Colors.green700, // ירוק של וואטסאפ
    textDecorationLine: "underline",
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    marginTop: 16,
  },
  //   note: {
  //     fontSize: 16,
  //     fontFamily: "Rubik-Regular",
  //     // marginBottom: 8,
  //     marginTop: 16,
  //     color: Colors.gray700,
  //   },
})

export default WhatsAppLink
