import React, { useState, useEffect, useRef } from "react"
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native"
import Colors from "../constants/Colors"
import Icon from "@expo/vector-icons/MaterialIcons"

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry)
  const [isSecure, setSecure] = useState(secureTextEntry)
  const iconOpacity = useRef(new Animated.Value(1)).current

  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // חייב להיות false בגלל top/fontSize
    }).start()
  }, [isFocused, value])

  const togglePasswordVisibility = () => {
    Animated.timing(iconOpacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      //   setIsPasswordVisible(!isPasswordVisible)
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    })
  }

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
      <View>
        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(value.length > 0)}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => {
              setIsPasswordVisible(!isPasswordVisible)
              togglePasswordVisibility()
            }}
            style={styles.icon}
          >
            <Animated.View style={{ opacity: iconOpacity }}>
              <Icon
                name={isPasswordVisible ? "visibility" : "visibility-off"}
                size={24}
                color="#888"
              />
            </Animated.View>
          </Pressable>
        )}
      </View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: 24,
    top: "25%",
  },
  label: {
    position: "absolute",
    left: 24,
    fontFamily: "Rubik-Bold",
  },
  input: {
    height: 56,
    textAlign: "center",
    borderWidth: 4,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: Colors.gray700,
  },
  inputFocused: {
    borderColor: Colors.purple500,
  },
})
