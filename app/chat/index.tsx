import { useNavigation } from "expo-router"
import React, { useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { WebView } from "react-native-webview"

const ChatBotScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      title: "צ'אט עם OGS",
    })
  }, [])
  const chatBotHTML = `
  <html>
    <body style="margin: 0; padding: 0; height: 100%;">
      <iframe src='https://google.com'
              width="100%" 
              height="100%" 
              style="border: none;">
      </iframe>
    </body>
  </html>
`
  return (
    <View style={styles.container}>
      {/* <WebView
        source={{ uri: "https://try-52dcfd.zapier.app" }}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={true}
        mixedContentMode="always"
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      /> */}
      <WebView
        originWhitelist={["*"]}
        source={{ uri: "https://origuystudio.zapier.app" }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ChatBotScreen
