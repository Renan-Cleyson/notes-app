import { AsyncStorage } from 'react-native';
import uid from 'uid';

class NotesStorage {
  constructor() {
    this.notes = [];
    this.dataWasLoaded = false;
  }
  initialize() {
    return AsyncStorage.getAllKeys()
      .then((keys) => {
        AsyncStorage.multiGet(keys)
          .then((notes) => {
            this.notes = notes.map((note) => ({ id: note[0], ...JSON.parse(note[1]) }));
            this.checkAllTitles();
          })
      })
  }

  getTitles(id = '') {
    if (id) {
      return this.notes.find(id);
    }
    return this.notes.map(({ title }) => title);
  }

  getNote(id) {
    if (id) {
      return this.notes.find(id);
    }

    return this.notes;
  }

  handleRepeatTitles(titles, string, counter = 1) {
    const repeatString = `${string} (${counter})`;
    if (titles.includes(repeatString)) {
      return this.handleRepeatTitles(titles, string, counter + 1);
    }

    return repeatString;
  }

  checkAllTitles() {
    this.notes.forEach(({ id, title, text }) => {
      let checkedTitle;
      const titles = this.getTitles();

      if (titles.includes(title)) {
        checkedTitle = this.handleRepeatTitles(titles, title.trim());
      } else {
        checkedTitle = title;
      }

      AsyncStorage.setItem(id, JSON.stringify({ title: checkedTitle, text }));
    });
  }

  setNote(title, text) {
    let checkedTitle;
    const titles = this.getTitles();

    if (titles.includes(title)) {
      checkedTitle = this.handleRepeatTitles(titles, title.trim());
    } else {
      checkedTitle = title;
    }

    const id = uid();
    const data = { title: checkedTitle, text };
    AsyncStorage.setItem(
      id,
      JSON.stringify(data),
    );

    this.notes.push({ id, ...data });
  }
}

export default NotesStorage;
