/**
 * Main Application Entry Point
 * Coordinates all modules and initializes the application
 */

// Import styles
import '../styles/main.css';

// Import modules
import NavigationManager from './modules/navigation.js';
import CarouselManager from './modules/carousel.js';
import ThemeManager from './modules/theming.js';
import { strategicVisionData, getStrategicAreaData } from './modules/data.js';
import { createItemCardHTML, safeQuerySelector, safeQuerySelectorAll } from './utils/dom.js';

/**
 * Main Application Class
 */
class BusinessStrategyApp {
  constructor() {
    this.navigation = new NavigationManager();
    this.carousel = new CarouselManager();
    this.theme = new ThemeManager();
    
    // Application state
    this.currentStrategicAreaKey = null;
    this.currentAmac = null;
    this.currentHedef = null;
    
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    console.log('Initializing Business Strategy Visualization App...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupApplication());
    } else {
      this.setupApplication();
    }
  }

  /**
   * Set up the application after DOM is ready
   */
  setupApplication() {
    this.setupCategoryCards();
    this.setupBackButtonCallbacks();
    this.navigation.showScreen('s1');
    
    console.log('Application initialized successfully');
  }

  /**
   * Set up category card event listeners
   */
  setupCategoryCards() {
    const categoryCards = safeQuerySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const areaKey = card.dataset.area;
        if (areaKey && strategicVisionData[areaKey]) {
          this.handleCategoryCardClick(areaKey);
        }
      });
    });
  }

  /**
   * Set up back button callbacks for navigation
   */
  setupBackButtonCallbacks() {
    // Override navigation methods to include carousel population
    this.navigation.populateAmacsCarousel = () => this.populateAmacsCarousel();
    this.navigation.populateHedeflerCarousel = () => this.populateHedeflerCarousel();
  }

  /**
   * Handle category card click
   * @param {string} areaKey - Strategic area key
   */
  handleCategoryCardClick(areaKey) {
    this.currentStrategicAreaKey = areaKey;
    const areaData = getStrategicAreaData(areaKey);
    
    if (areaData) {
      // Add area key to data for theme manager
      areaData.areaKey = areaKey;
      this.theme.setTheme(areaData);
      this.populateAmacsCarousel();
      this.navigation.showScreen('s3');
    }
  }

  /**
   * Populate Amaçlar (objectives) carousel
   */
  populateAmacsCarousel() {
    const areaData = getStrategicAreaData(this.currentStrategicAreaKey);
    if (!areaData) return;

    // Set screen title
    this.navigation.setScreenTitle('s3', 
      `<span class="main-title-text">${areaData.pluralTitle}</span>`
    );

    // Clear and populate carousel
    this.carousel.clearCarousel('s3');

    areaData.amacs.forEach((amac, index) => {
      const styling = this.theme.getCardStyling('amac');
      const cardHTML = createItemCardHTML(amac, 'amac', index, styling);
      const slide = this.carousel.addSlide('s3', cardHTML);
      
      // Add click listener to the card
      const card = slide.querySelector('.item-card.clickable[data-id^="A"]');
      if (card) {
        card.addEventListener('click', () => {
          this.currentAmac = areaData.amacs[index];
          this.populateHedeflerCarousel();
          this.navigation.showScreen('s4');
        });
      }
    });

    this.carousel.initSwiper('s3');
  }

  /**
   * Populate Hedefler (targets) carousel
   */
  populateHedeflerCarousel() {
    const areaData = getStrategicAreaData(this.currentStrategicAreaKey);
    if (!areaData || !this.currentAmac) return;

    const originalAmacIndex = areaData.amacs.findIndex(a => a.id === this.currentAmac.id);
    const amacShortTitle = `Amaç ${originalAmacIndex + 1}`;

    // Set screen title
    this.navigation.setScreenTitle('s4',
      `<span class="title-eyebrow">${this.currentAmac.id}</span> ` +
      `<span class="title-parent-name">${amacShortTitle}</span> ` +
      `<span class="title-text-separator">/</span> ` +
      `<span class="main-title-text">Hedefler</span>`
    );

    // Set back button text
    this.navigation.setBackButtonText('s4', `&larr; ${areaData.pluralTitle}`);

    // Clear and populate carousel
    this.carousel.clearCarousel('s4');

    // Add static amac card
    const amacStyling = this.theme.getCardStyling('staticAmac');
    const amacCardHTML = createItemCardHTML(this.currentAmac, 'staticAmac', originalAmacIndex, amacStyling);
    const amacSlide = this.carousel.addSlide('s4', amacCardHTML);
    
    // Add click listener to static amac card
    const staticAmacCard = amacSlide.querySelector('.static-muted-header');
    if (staticAmacCard) {
      staticAmacCard.addEventListener('click', () => {
        this.populateAmacsCarousel();
        this.navigation.showScreen('s3');
      });
    }

    // Add hedef cards
    this.currentAmac.hedefler.forEach((hedef, index) => {
      const hedefStyling = this.theme.getCardStyling('hedef');
      const hedefCardHTML = createItemCardHTML(hedef, 'hedef', index, hedefStyling, this.currentAmac.id);
      const slide = this.carousel.addSlide('s4', hedefCardHTML);
      
      // Add click listener if hedef has aksiyons
      const card = slide.querySelector('.item-card.clickable[data-id^="H"]');
      if (card && hedef.aksiyons && hedef.aksiyons.length > 0) {
        card.addEventListener('click', () => {
          this.currentHedef = hedef;
          this.populateAksiyonsCarousel();
          this.navigation.showScreen('s5');
        });
      } else if (card) {
        // Remove clickable class if no aksiyons
        card.style.cursor = 'default';
        card.classList.remove('clickable');
      }
    });

    this.carousel.initSwiper('s4');
  }

  /**
   * Populate Aksiyonlar (actions) carousel
   */
  populateAksiyonsCarousel() {
    if (!this.currentAmac || !this.currentHedef) return;

    const hedefFullId = `${this.currentAmac.id}.${this.currentHedef.id}`;
    const originalHedefIndex = this.currentAmac.hedefler.findIndex(h => h.id === this.currentHedef.id);
    const hedefShortTitle = `Hedef ${originalHedefIndex + 1}`;

    // Set screen title
    this.navigation.setScreenTitle('s5',
      `<span class="title-eyebrow">${hedefFullId}</span> ` +
      `<span class="title-parent-name">${hedefShortTitle}</span> ` +
      `<span class="title-text-separator">/</span> ` +
      `<span class="main-title-text">Aksiyonlar</span>`
    );

    // Set back button text
    this.navigation.setBackButtonText('s5', `&larr; ${hedefShortTitle}`);

    // Clear and populate carousel
    this.carousel.clearCarousel('s5');

    // Add static hedef card
    const hedefStyling = this.theme.getCardStyling('staticHedef');
    const hedefCardHTML = createItemCardHTML(this.currentHedef, 'staticHedef', originalHedefIndex, hedefStyling, this.currentAmac.id);
    const hedefSlide = this.carousel.addSlide('s5', hedefCardHTML);
    
    // Add click listener to static hedef card
    const staticHedefCard = hedefSlide.querySelector('.static-muted-header');
    if (staticHedefCard) {
      staticHedefCard.addEventListener('click', () => {
        this.populateHedeflerCarousel();
        this.navigation.showScreen('s4');
      });
    }

    // Add aksiyon cards
    this.currentHedef.aksiyons.forEach((aksiyon, index) => {
      const aksiyonStyling = this.theme.getCardStyling('aksiyon');
      const aksiyonCardHTML = createItemCardHTML(aksiyon, 'aksiyon', index, aksiyonStyling, this.currentAmac.id, this.currentHedef.id);
      this.carousel.addSlide('s5', aksiyonCardHTML);
    });

    this.carousel.initSwiper('s5');
  }
}

// Initialize the application
const app = new BusinessStrategyApp();

// Export for potential external access
window.BusinessStrategyApp = app;