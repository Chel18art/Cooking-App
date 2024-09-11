import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, Button, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Use this for bare React Native

const initialRecipes = [
  { id: '1', name: 'Salad', image: require('./assets/salad.png'), favorite: false, instructions: 'Mix all ingredients in a bowl.' },
  { id: '2', name: 'Nachos', image: require('./assets/Nachos.jpg'), favorite: false, instructions: 'Layer chips with cheese and bake.' },
  { id: '3', name: 'Flank Steak', image: require('./assets/Steak.jpg'), favorite: false, instructions: 'Grill steak and serve with sides.' },
  { id: '4', name: 'Salmon', image: require('./assets/salmon.jpg'), favorite: false, instructions: 'Season and bake the salmon.' },
];

const RecipeDashboard = () => {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'favorites', 'addRecipe', 'details'
  const [recipes, setRecipes] = useState(initialRecipes);
  const [favorites, setFavorites] = useState([]);
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newRecipeInstructions, setNewRecipeInstructions] = useState('');
  const [newRecipeImage, setNewRecipeImage] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipePress = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('details');
  };

  const handleFavoritePress = (recipe) => {
    const updatedRecipes = recipes.map(r =>
      r.id === recipe.id ? { ...r, favorite: !r.favorite } : r
    );
    setRecipes(updatedRecipes);
    setFavorites(updatedRecipes.filter(r => r.favorite));
  };

  const handleMenuPress = (view) => {
    setCurrentView(view);
    setSelectedRecipe(null);
  };

  const handleAddRecipeSubmit = () => {
    if (!newRecipeName || !newRecipeInstructions) {
      Alert.alert('Please fill in all fields');
      return;
    }
    const newRecipe = {
      id: (recipes.length + 1).toString(),
      name: newRecipeName,
      image: newRecipeImage ? { uri: newRecipeImage } : require('./assets/default.jpg'), // Use uploaded image or placeholder
      favorite: false,
      instructions: newRecipeInstructions,
    };
    setRecipes([...recipes, newRecipe]);
    setNewRecipeName('');
    setNewRecipeInstructions('');
    setNewRecipeImage(null);
    setCurrentView('home');
  };

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        setNewRecipeImage(response.assets[0].uri);
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.recipeContainer}>
      <TouchableOpacity style={styles.recipeButton} onPress={() => handleRecipePress(item)}>
        <Image source={item.image} style={styles.recipeImage} />
        <Text style={styles.recipeText}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => handleFavoritePress(item)}
      >
        <Text style={styles.favoriteText}>{item.favorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>What do you want to cook today?</Text>

      <View style={styles.menuBar}>
        <TouchableOpacity style={styles.menuButton} onPress={() => handleMenuPress('home')}>
          <Text style={styles.menuText}>Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => handleMenuPress('favorites')}>
          <Text style={styles.menuText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => handleMenuPress('addRecipe')}>
          <Text style={styles.menuText}>Add Recipe</Text>
        </TouchableOpacity>
      </View>

      {currentView === 'home' && (
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.recipeList}
        />
      )}

      {currentView === 'favorites' && (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.recipeList}
        />
      )}

      {currentView === 'addRecipe' && (
        <View style={styles.addRecipeContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Dish Name"
            value={newRecipeName}
            onChangeText={setNewRecipeName}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Cooking Instructions"
            value={newRecipeInstructions}
            onChangeText={setNewRecipeInstructions}
            multiline
          />
          <Button title="Pick an Image" onPress={handleImagePick} />
          {newRecipeImage && (
            <Image source={{ uri: newRecipeImage }} style={styles.previewImage} />
          )}
          <Button title="Submit" onPress={handleAddRecipeSubmit} />
        </View>
      )}

      {currentView === 'details' && selectedRecipe && (
        <View style={styles.detailsContainer}>
          <Image source={selectedRecipe.image} style={styles.detailsImage} />
          <Text style={styles.detailsTitle}>{selectedRecipe.name}</Text>
          <Text style={styles.detailsInstructions}>{selectedRecipe.instructions}</Text>
          <Button title="Back to Home" onPress={() => handleMenuPress('home')} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  recipeList: {
    justifyContent: 'space-between',
  },
  recipeContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  recipeButton: {
    flex: 1,
    alignItems: 'center',
  },
  recipeImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  recipeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  favoriteText: {
    fontSize: 20,
  },
  addRecipeContainer: {
    padding: 20,
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  detailsImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsInstructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default RecipeDashboard;
