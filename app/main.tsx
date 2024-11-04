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
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export const DATA = {
  categorias: [
    {
      id: "chest",
      title: "Chest",
      image: require("../assets/images/1_05.png"),
    },
    {
      id: "biceps",
      title: "Biceps",
      image: require("../assets/images/1_04.png"),
    },
    {
      id: "calves",
      title: "Calves",
      image: require("../assets/images/1_15.png"),
    },
    {
      id: "shoulders",
      title: "Shoulders",
      image: require("../assets/images/1_03.png"),
    },
    {
      id: "back",
      title: "Back",
      image: require("../assets/images/1_07.png"),
    },
    {
      id: "triceps",
      title: "Triceps",
      image: require("../assets/images/1_08.png"),
    },
    {
      id: "leg",
      title: "Legs",
      image: require("../assets/images/1_12.png"),
    },
  ],
  exercicios: {
    chest: [
      {
        id: "1",
        title: "Bench Press",
        image: require("../assets/images/gifExercicios/chest/1.gif"),
      },
      {
        id: "2",
        title: "Pec Deck",
        image: require("../assets/images/gifExercicios/chest/2.gif"),
      },
      {
        id: "3",
        title: "Dumbbell Fly",
        image: require("../assets/images/gifExercicios/chest/3.gif"),
      },
      {
        id: "4",
        title: "Cable Crossover",
        image: require("../assets/images/gifExercicios/chest/4.gif"),
      },
    ],
    back: [
      {
        id: "1",
        title: "Barbell Row",
        image: require("../assets/images/gifExercicios/back/1.gif"),
      },
      {
        id: "2",
        title: "Cable Rear Pulldown",
        image: require("../assets/images/gifExercicios/back/2.gif"),
      },
      {
        id: "3",
        title: "Pull-Up",
        image: require("../assets/images/gifExercicios/back/3.gif"),
      },
      {
        id: "4",
        title: "Barbell Bent Over Row",
        image: require("../assets/images/gifExercicios/back/4.gif"),
      },
    ],
    biceps: [
      {
        id: "1",
        title: "Dumbbell Curl",
        image: require("../assets/images/gifExercicios/biceps/1.gif"),
      },
      {
        id: "2",
        title: "Barbell Curl",
        image: require("../assets/images/gifExercicios/biceps/2.gif"),
      },
      {
        id: "3",
        title: "EZ Bar Preacher Curl",
        image: require("../assets/images/gifExercicios/biceps/3.gif"),
      },
      {
        id: "4",
        title: "Hammer Curl",
        image: require("../assets/images/gifExercicios/biceps/4.gif"),
      },
    ],
    calves: [
      {
        id: "1",
        title: "Standing Calf Raise",
        image: require("../assets/images/gifExercicios/calves/1.gif"),
      },
      {
        id: "2",
        title: "Leg Press Calf Raise",
        image: require("../assets/images/gifExercicios/calves/2.gif"),
      },
      {
        id: "3",
        title: "Lever Seated Calf Raise",
        image: require("../assets/images/gifExercicios/calves/3.gif"),
      },
      {
        id: "4",
        title: "Standing Barbell Calf Raise",
        image: require("../assets/images/gifExercicios/calves/4.gif"),
      },
    ],
    shoulders: [
      {
        id: "1",
        title: "Dumbbell Lateral Raise",
        image: require("../assets/images/gifExercicios/shoulders/1.gif"),
      },
      {
        id: "2",
        title: "Dumbbell Shoulder Press",
        image: require("../assets/images/gifExercicios/shoulders/2.gif"),
      },
      {
        id: "3",
        title: "Smith Machine Shoulder Press",
        image: require("../assets/images/gifExercicios/shoulders/3.gif"),
      },
      {
        id: "4",
        title: "Cable Lateral Raise",
        image: require("../assets/images/gifExercicios/shoulders/4.gif"),
      },
    ],
    triceps: [
      {
        id: "1",
        title: "Push-down",
        image: require("../assets/images/gifExercicios/triceps/1.gif"),
      },
      {
        id: "2",
        title: "Skull Crusher",
        image: require("../assets/images/gifExercicios/triceps/2.gif"),
      },
      {
        id: "3",
        title: "One Arm Triceps Extension",
        image: require("../assets/images/gifExercicios/triceps/3.gif"),
      },
      {
        id: "4",
        title: "Overhead Triceps Extension",
        image: require("../assets/images/gifExercicios/triceps/4.gif"),
      },
    ],
    leg: [
      {
        id: "1",
        title: "Squat",
        image: require("../assets/images/gifExercicios/leg/1.gif"),
      },
      {
        id: "2",
        title: "Leg Press",
        image: require("../assets/images/gifExercicios/leg/2.gif"),
      },
      {
        id: "3",
        title: "Deadlift",
        image: require("../assets/images/gifExercicios/leg/3.gif"),
      },
      {
        id: "4",
        title: "Leg Curl",
        image: require("../assets/images/gifExercicios/leg/4.gif"),
      },
      {
        id: "5",
        title: "Leg Extension",
        image: require("../assets/images/gifExercicios/leg/5.gif"),
      },
      {
        id: "6",
        title: "Bulgarian Squat",
        image: require("../assets/images/gifExercicios/leg/6.gif"),
      },
    ],
  },
};

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
      pathname: `./treinos/${id}`,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Bem vindo(a), {name} </Text>
      <Text style={styles.text}>O que vai treinar hoje? </Text>
      <FlatList
        data={DATA.categorias}
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
