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
  Modal,
  TextInput,
  Button,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DATA } from "./main";

type Exercise = {
  id: string;
  title: string;
  image: any;
};

type ItemProps = {
  title: string;
  image: any;
  onAddNote: () => void;
};

const Item: React.FC<ItemProps> = ({ title, image, onAddNote }) => (
  <View style={styles.item}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity onPress={onAddNote} style={styles.button}>
      <Text style={styles.buttonText}>Adicionar Anotação</Text>
    </TouchableOpacity>
  </View>
);

const Back: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(
    null
  );
  const [note, setNote] = useState<string>("");
  const [notes, setNotes] = useState<{ [key: string]: string[] }>({});

  const handleOpenModal = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId);
    setModalVisible(true);
  };

  const handleSaveNote = () => {
    if (note.trim() && selectedExerciseId !== null) {
      setNotes((prevNotes) => ({
        ...prevNotes,
        [selectedExerciseId]: [...(prevNotes[selectedExerciseId] || []), note],
      }));
      setNote("");
      setModalVisible(false);
    }
  };

  const exercicios: Exercise[] = DATA.exercicios[id];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={exercicios}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            image={item.image}
            onAddNote={() => handleOpenModal(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Adicionar Anotação</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua anotação aqui..."
            value={note}
            onChangeText={setNote}
          />
          <View style={styles.buttonContainer}>
            <Button title="Salvar" onPress={handleSaveNote} />
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
          <FlatList
            data={notes[selectedExerciseId ?? ""] || []}
            renderItem={({ item }) => (
              <View style={styles.noteItem}>
                <Text>{item}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>
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
  image: {
    width: 150,
    height: 200,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginBottom: 15,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 10,
  },
  noteItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    width: "100%",
  },
});

export default Back;
