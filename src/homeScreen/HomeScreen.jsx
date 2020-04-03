import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import LayoutView from '../styles';
import AddButton from './AddButton';
import NotesFlatList from './NotesFlatList';
import { getNote } from '../notesStorage';

const PlaceholderText = styled.Text`
  color: #555;
  font-size: 17.5px;
`;

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => <AddButton text="Create a note" />,
  });

  useEffect(() => {
    const loadData = () => {
      getNote()
        .then((data) => {
          setNotes(data);
          setIsLoading(false);
        });
    };
    const unsubscribeFocusListener = navigation.addListener('focus', loadData);
    return unsubscribeFocusListener;
  }, [navigation]);

  let ContentComponent = () => (
    <NotesFlatList notes={notes} setNotes={setNotes} />
  );

  if (!notes.length) {
    ContentComponent = () => (
      <PlaceholderText>There&apos;s no notes, please add one.</PlaceholderText>
    );
  } if (isLoading) {
    return <LayoutView><ActivityIndicator size="large" /></LayoutView>;
  }
  return (
    <LayoutView>
      <ContentComponent />
    </LayoutView>
  );
}
