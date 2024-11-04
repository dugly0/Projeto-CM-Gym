import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, TextInput, StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const [text, onChangeText] = React.useState("");
  const [displayText, setDisplayText] = useState<string>();

  const handlePress = () => {
    setDisplayText(text);
    onChangeText("");
    router.push({
      pathname: "/main",
      params: { displayText: text },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
      <View style={styles.center}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Digite seu nome"
        />
        <Button onPress={handlePress} title="Confirmar" color="#841584" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  center: {
    width: "80%",
  },
  input: {
    height: 50,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 300,
    alignItems: "center",
  },
});
