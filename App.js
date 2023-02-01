import React, {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList, Modal } from 'react-native';

export default function App() {
  const [textItem, setTextItem] = useState("")
  const [list, setList] = useState([])
  const [itemSelected, setItemSelected] = useState([""])
  const [modalVisible, setModalVisible] = useState(false)

  const onHandleChangeItem = text => {
    setTextItem(text)
  }
  const addItem = () => {
    setList(prevState => [...prevState, textItem])
    setTextItem("")
  }
  const handleModal = (item) => {
    setItemSelected(item)
    setModalVisible(true)
  }
  const onHandleDelete = item => {
    setList(prevState => prevState.filter(element => element !== item))
    setModalVisible(!modalVisible)
  }


  const renderItem = ({item}) => (
    <View style={styles.renderItemStyle}>
      <Text>{item} </Text>
      <Button title='Edit' onPress={ ()=> handleModal(item) } />
    </View>
  )
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Lista de Compras</Text>       
        <View style= {styles.inputContainer}>
          <TextInput 
          placeholder="Escribe tu Producto" 
          style={styles.addItemInput} 
          onChangeText={onHandleChangeItem}
          value={textItem}
          />
          <Button title="ADD" onPress={addItem} />  

        </View>
      </View>
      <View style={{ flex: 2}}>
        <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
      
        />
        </View>
        <Modal 
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalStyle}>
            <Text style={styles.modalTextStyle}>{itemSelected} </Text>
            <Button title="Delete"
            onPress={() => onHandleDelete(itemSelected) } />
             <Button title="Dismiss"
            onPress={() => setModalVisible(false) } /> 
            </View>
          </View>
        </Modal>

      </View>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  titleContainer: {
    height: 200,
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  inputContainer: {
    flexDirection:"row",
    JustifyContent: "space-between",
    alignItems:"center",
  },
  addItemInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 10,
    width:"80%",
    height:45,
    shadowColor: "black",
    shadowOffset:{width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius:6,
    elevation: 3,

  },
  title: {
    marginBottom: 30,
    fontSize: 30,
    fontWeight: "500",
    color: "#1E283C",
  },
  listContainer: {
    flex: 2,
    marginHorizontal: 25,
    marginTop: 40,
    padding: 3,
  },
  renderItemStyle: {
    height:65,
    marginBottom: 25,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems:"center",
    borderRadius: 15,
    padding: 5,
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset:{width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius:3,
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    margin: 22,
    justifyContent:"center",
    alignItems:"center"
  },
  modalStyle: {
    margin: 20,
    backgroundColor: "white",
    borderRadius:20,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset:{width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius:4,
    elevation: 5,

  },
  modalTextStyle: {
    fontSize: 30,
  }
  
});
