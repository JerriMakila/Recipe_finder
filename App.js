import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Image } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchData = async () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + ingredient.toLowerCase();

    try{
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.results);
    } catch(error){
      setRecipes([]);
    }
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "black",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={recipes}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={listSeparator}
          renderItem={({item}) =>
            <View style={styles.itemContainer}>
              <Text style={{fontSize: 20, alignSelf: 'center'}}>{item.title}</Text>
              <Image style={{width: 100, height: 100, alignSelf: 'center'}} source={{uri: item.thumbnail}} />
            </View>} >
        </FlatList>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={ingredient}
          onChangeText={ingredient => setIngredient(ingredient)} />
        <View style={styles.buttonContainer}>
          <Button 
            onPress={fetchData}
            title='FIND' />
        </View>
        
      </View>
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    width: 50
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    flex: 1,
    paddingBottom: 10
  },

  itemContainer: {
    marginBottom: 5
  },

  listContainer: {
    flex: 8,
    paddingHorizontal: 10,
    paddingTop: 10
  },

  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 25,
    height: 35,
    marginBottom: 10,
    paddingHorizontal:5,
    width: 200
  }
});
