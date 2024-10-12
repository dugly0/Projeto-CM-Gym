import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

const DATA = [
  {
    id: "1",
    title: "Chest",
    image: require("../assets/images/1_05.png"),
  },
  {
    id: "2",
    title: "Biceps",
    image: require("../assets/images/1_04.png"),
  },
  {
    id: "3",
    title: "Calves",
    image: require("../assets/images/1_15.png"),
  },
  {
    id: "4",
    title: "Shoulders",
    image: require("../assets/images/1_03.png"),
  },
  {
    id: "back",
    title: "Back",
    image: require("../assets/images/1_07.png"),
  },
  {
    id: "6",
    title: "Triceps",
    image: require("../assets/images/1_08.png"),
  },
  {
    id: "7",
    title: "Abdomen",
    image: require("../assets/images/1_10.png"),
  },
  {
    id: "8",
    title: "Forearm",
    image: require("../assets/images/1_11.png"),
  },
  {
    id: "9",
    title: "Quadriceps",
    image: require("../assets/images/1_12.png"),
  },
  {
    id: "10",
    title: "Hamstrings",
    image: require("../assets/images/1_13.png"),
  },
  {
    id: "11",
    title: "Glute",
    image: require("../assets/images/1_14.png"),
  },
];

type ItemProps = { title: string; image: any };

const Item = ({ title, image }: ItemProps) => (
  <View style={styles.item}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  const { displayText } = useLocalSearchParams();
  const name = displayText || "Visitante";
  const router = useRouter();

  const handlePress = (id: string) => {
    router.push({
      pathname: `./Treinos/${id}`,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Bem vindo(a), {name} </Text>
      <Text style={styles.text}>O que vai treinar hoje? </Text>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <Item title={item.title} image={item.image} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#F2F2F2",
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    color: "#333",
    marginTop: 10,
  },
  text: {
    fontSize: 22,
    textAlign: "center",
    padding: 15,
    color: "#333",
  },
  image: {
    width: 80,
    height: 160,
    resizeMode: "contain",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
