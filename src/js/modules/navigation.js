/**
 * Navigation Module
 * Handles screen transitions and navigation state
 */

class NavigationManager {
  constructor() {
    this.screens = {
      s1: document.getElementById('screen1'),
      s2: document.getElementById('screen2'),
      s3: document.getElementById('screen3'),
      s4: document.getElementById('screen4'),
      s5: document.getElementById('screen5')
    };
    
    this.currentScreen = 's1';
    this.initializeEventListeners();
  }

  /**
   * Initialize navigation event listeners
   */
  initializeEventListeners() {
    // Home buttons
    const homeButtons = document.querySelectorAll('.home-button');
    homeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.showScreen('s1'));
    });

    // Back buttons
    const backButtons = [
      { id: 's3_backButton', screen: 's2' },
      { id: 's4_backButton', screen: 's3', callback: 'populateAmacsCarousel' },
      { id: 's5_backButton', screen: 's4', callback: 'populateHedeflerCarousel' }
    ];

    backButtons.forEach(({ id, screen, callback }) => {
      const button = document.getElementById(id);
      if (button) {
        button.addEventListener('click', () => {
          if (callback && this[callback]) {
            this[callback]();
          }
          this.showScreen(screen);
        });
      }
    });

    // Initial stack click
    const cardStackWrapper = document.querySelector('.card-stack-wrapper');
    if (cardStackWrapper) {
      cardStackWrapper.addEventListener('click', () => this.showScreen('s2'));
    }
  }

  /**
   * Show specific screen
   * @param {string} screenKey - Screen identifier (s1, s2, etc.)
   */
  showScreen(screenKey) {
    // Hide all screens
    Object.values(this.screens).forEach(screen => {
      if (screen) {
        screen.classList.remove('active');
      }
    });

    // Show target screen
    if (this.screens[screenKey]) {
      this.screens[screenKey].classList.add('active');
      this.currentScreen = screenKey;
      
      // Trigger screen-specific actions
      this.onScreenChange(screenKey);
    }
  }

  /**
   * Handle screen change events
   * @param {string} screenKey - The new screen key
   */
  onScreenChange(screenKey) {
    // Add any screen-specific logic here
    console.log(`Navigated to screen: ${screenKey}`);
    
    // Emit custom event for other modules to listen
    window.dispatchEvent(new CustomEvent('screenChanged', {
      detail: { screen: screenKey }
    }));
  }

  /**
   * Get current screen
   * @returns {string} Current screen key
   */
  getCurrentScreen() {
    return this.currentScreen;
  }

  /**
   * Check if specific screen is active
   * @param {string} screenKey - Screen to check
   * @returns {boolean} True if screen is active
   */
  isScreenActive(screenKey) {
    return this.currentScreen === screenKey;
  }

  /**
   * Set screen title
   * @param {string} screenKey - Target screen
   * @param {string} title - Title HTML content
   */
  setScreenTitle(screenKey, title) {
    const titleElement = document.getElementById(`${screenKey}_title`);
    if (titleElement) {
      titleElement.innerHTML = title;
    }
  }

  /**
   * Set back button text
   * @param {string} screenKey - Target screen
   * @param {string} text - Button text
   */
  setBackButtonText(screenKey, text) {
    const backButton = document.getElementById(`${screenKey}_backButton`);
    if (backButton) {
      backButton.innerHTML = text;
    }
  }
}

export default NavigationManager;