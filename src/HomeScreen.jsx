import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, ActivityIndicator } from 'react-native';
import { AddButton } from './buttons';
import NotesFlatList from './notesFlatList';
import { getNote } from './notesStorage';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();
  const handleAddButtonOnPress = (note) => (
    setNotes((prevState) => prevState.concat(note))
  );

  useEffect(() => {
    const unsubscribeFocusListener = navigation
      .addListener('focus', () => getNote().then((data) => {
        setNotes(data);
        setIsLoading(false);
      }));
    return unsubscribeFocusListener;
  }, [navigation]);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (!notes.length) {
    return (
      <>
        <Text>Nothing to see here, please add a note.</Text>
        <AddButton onPress={handleAddButtonOnPress} />
      </>
    );
  }
  return (
    <>
      <NotesFlatList notes={notes} setNotes={setNotes} />
      <AddButton onPress={handleAddButtonOnPress} />
    </>
  );
}
