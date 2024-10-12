import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
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
    <SafeAreaView>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="Digite seu nome"
      />
      <Button onPress={handlePress} title="Confirmar" color="#841584" />
    </SafeAreaView>
  );
}
