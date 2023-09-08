

// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    this.editor = null; // Initialize editor as null

    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    // Retrieve data from IndexedDB and initialize the editor
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.initEditor(data || localStorage.getItem('content') || header);
    });
  }

  initEditor(initialValue) {
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: initialValue,
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}
