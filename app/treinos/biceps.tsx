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
import { DATA } from "../../app/main";

type ItemProps = { title: string; image: any };

const Item = ({ title, image }: ItemProps) => (
  <View style={styles.item}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Biceps = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const handleSaveNote = () => {
    if (note.trim()) {
      setNotes([...notes, note]);
      setNote("");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Adicionar Anotação</Text>
      </TouchableOpacity>
      <FlatList
        data={DATA.exercicios.biceps}
        renderItem={({ item }) => (
          <View>
            <Item title={item.title} image={item.image} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
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
            data={notes}
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
  text: {
    fontSize: 22,
    textAlign: "center",
    padding: 15,
    color: "#333",
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    margin: 20,
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
  notesContainer: {
    width: "100%",
    marginBottom: 15,
  },
  noteItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    width: "100%",
  },
});

export default Biceps;
