class Controls {
  constructor() {
    this.jump = false;

    // this.#addKeyboardListeners();
  }

  #addKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      switch(e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
        case ' ':
          e.preventDefault();
          this.jump = true;
          break;
      }
    });
  }
}