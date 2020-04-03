import { AsyncStorage } from 'react-native';
import uid from 'uid';

export async function getNote(key) {
  if (key) {
    return JSON.parse(await AsyncStorage.getItem(key));
  }

  const keys = await AsyncStorage.getAllKeys();
  const keyPairs = await AsyncStorage.multiGet(keys);
  const deserializedKeyPairs = keyPairs.map(([keyNote, value]) => ({
    key: keyNote,
    ...JSON.parse(value),
  }));

  deserializedKeyPairs.sort((firstPair, secondPair) => {
    const firstDateValue = firstPair.storedTime;
    const secondDateValue = secondPair.storedTime;

    return -1 * (firstDateValue - secondDateValue);
  });

  return deserializedKeyPairs;
}

function handleRepeatString(titles, string, counter = 1) {
  const repeatString = `${string} (${counter})`;
  if (titles.includes(repeatString)) {
    return handleRepeatString(titles, string, counter + 1);
  }

  return repeatString;
}

async function handleRepeatTitle(noteTitle) {
  const notes = await getNote();
  const titles = notes.map(({ title }) => title);

  if (titles.includes(noteTitle)) {
    return handleRepeatString(titles, noteTitle);
  }

  return noteTitle;
}

export async function setNote(title, text, key) {
  let storedKey;
  let checkedTitle;
  const titleTrim = title.trim();

  if (key) {
    storedKey = key;
    const prevNote = await getNote(key);
    const prevTitle = prevNote.title;

    if (title !== prevTitle) {
      checkedTitle = await handleRepeatTitle(titleTrim);
    } else {
      checkedTitle = title;
    }
  } else {
    storedKey = uid();
    checkedTitle = await handleRepeatTitle(titleTrim);
  }

  const data = { title: checkedTitle, text, storedTime: Date.now() };
  await AsyncStorage.setItem(storedKey, JSON.stringify(data));
  return { key: storedKey, ...data };
}

export async function removeNote(key) {
  AsyncStorage.removeItem(key);
}
