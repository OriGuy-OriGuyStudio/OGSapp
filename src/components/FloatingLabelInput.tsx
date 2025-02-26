import React, { useState, useEffect, useRef } from "react"
import { TextInput, View, Text, StyleSheet, Animated } from "react-native"
import Colors from "../constants/Colors"

interface FloatingLabelInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // חייב להיות false בגלל top/fontSize
    }).start()
  }, [isFocused, value])

  const labelStyle = {
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 5], // תווית יורדת כשאין פוקוס
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], // התווית קטנה כשהיא זזה למעלה
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ["#888", "#6200EE"], // צבע משתנה בעת פוקוס
    }),
  }

  return (
    <View style={styles.container}>
      {/* תווית עם אנימציה */}
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>

      {/* שדה טקסט */}
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value.length > 0)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

export default FloatingLabelInput

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "80%",
    marginVertical: 8,
  },
  label: {
    position: "absolute",
    left: 16,
    fontFamily: "Rubik-Bold",
  },
  input: {
    height: 56,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: Colors.gray100,
  },
  inputFocused: {
    borderColor: Colors.purple500,
  },
})
