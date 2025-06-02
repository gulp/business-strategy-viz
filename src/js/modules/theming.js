/**
 * Theming Module
 * Handles color management and theme switching for strategic areas
 */

class ThemeManager {
  constructor() {
    this.currentTheme = {
      pillarColor: '',
      pillarColorLight: '',
      useDarkText: false
    };
  }

  /**
   * Set theme based on strategic area
   * @param {Object} areaData - Strategic area data containing theme info
   */
  setTheme(areaData) {
    this.currentTheme = {
      pillarColor: areaData.pillarColor,
      pillarColorLight: areaData.pillarColorLight,
      useDarkText: areaData.useDarkText,
      areaKey: areaData.areaKey || this.getAreaKeyFromData(areaData)
    };
  }
  
  /**
   * Get area key from data (helper method)
   * @param {Object} areaData - Strategic area data
   * @returns {string} Area key
   */
  getAreaKeyFromData(areaData) {
    const colorMap = {
      '#D9534F': 'finans',
      '#5CB85C': 'musteri', 
      '#428BCA': 'dahili-surecler',
      '#F0AD4E': 'ogrenme-gelisim'
    };
    return colorMap[areaData.pillarColor] || 'finans';
  }

  /**
   * Get current theme colors
   * @returns {Object} Current theme configuration
   */
  getCurrentTheme() {
    return { ...this.currentTheme };
  }

  /**
   * Generate card styling based on card type and current theme
   * @param {string} cardType - Type of card (amac, hedef, aksiyon, etc.)
   * @returns {Object} Styling configuration
   */
  getCardStyling(cardType) {
    const theme = this.currentTheme;
    
    const styling = {
      bgColor: 'var(--color-card-bg)',
      bgClass: '',
      cardTextColor: theme.useDarkText ? 'var(--color-dark-text)' : 'var(--color-light-text)',
      headerElementsColor: theme.useDarkText ? 'var(--color-dark-text)' : 'var(--color-light-text)',
      cardClasses: 'item-card',
      isClickable: true
    };

    switch (cardType) {
      case 'amac':
        styling.bgClass = `bg-${theme.areaKey}`;
        styling.cardClasses += ' clickable';
        styling.headerElementsColor = 'var(--color-accent-text)';
        styling.cardTextColor = theme.useDarkText ? 'var(--color-dark-text)' : 'var(--color-light-text)';
        break;

      case 'staticAmac':
        styling.cardClasses += ' static-header-card static-muted-header clickable';
        styling.headerElementsColor = 'var(--color-medium-text)';
        styling.cardTextColor = 'var(--color-medium-text)';
        break;

      case 'hedef':
        styling.bgClass = `bg-${theme.areaKey}-light`;
        styling.cardClasses += ' clickable';
        styling.headerElementsColor = theme.useDarkText ? 'var(--color-dark-text)' : 'var(--color-accent-text)';
        styling.cardTextColor = theme.useDarkText ? 'var(--color-dark-text)' : 'var(--color-light-text)';
        break;

      case 'staticHedef':
        styling.cardClasses += ' static-header-card static-muted-header clickable';
        styling.headerElementsColor = 'var(--color-medium-text)';
        styling.cardTextColor = 'var(--color-medium-text)';
        break;

      case 'aksiyon':
        styling.bgColor = 'var(--color-aksiyon-bg)';
        styling.cardClasses += ' aksiyon-card-item';
        styling.isClickable = false;
        styling.headerElementsColor = 'var(--color-light-text)';
        styling.cardTextColor = 'var(--color-light-text)';
        break;
    }

    return styling;
  }

  /**
   * Get icon color based on card type and theme
   * @param {string} cardType - Type of card
   * @returns {string} Icon color
   */
  getIconColor(cardType) {
    if (this.currentTheme.useDarkText && 
        cardType !== 'staticAmac' && 
        cardType !== 'staticHedef') {
      return this.currentTheme.pillarColor;
    }
    return '#FFD700'; // Default gold color
  }

  /**
   * Get ID background color based on card type and theme
   * @param {string} cardType - Type of card
   * @returns {string} Background color for ID elements
   */
  getIdBackgroundColor(cardType) {
    if (cardType === 'staticAmac' || cardType === 'staticHedef') {
      return 'rgba(170,170,170,0.1)';
    }
    
    if (this.currentTheme.useDarkText && 
        (cardType === 'amac' || cardType === 'hedef')) {
      return 'rgba(0,0,0,0.1)';
    }
    
    return 'rgba(255,255,255,0.15)';
  }

  /**
   * Apply theme to CSS custom properties
   * @param {Object} areaData - Strategic area data
   */
  applyThemeToCSS(areaData) {
    const root = document.documentElement;
    
    root.style.setProperty('--current-pillar-color', areaData.pillarColor);
    root.style.setProperty('--current-pillar-color-light', areaData.pillarColorLight);
    root.style.setProperty('--current-use-dark-text', areaData.useDarkText ? '1' : '0');
  }

  /**
   * Reset theme to default
   */
  resetTheme() {
    this.currentTheme = {
      pillarColor: '',
      pillarColorLight: '',
      useDarkText: false
    };
    
    const root = document.documentElement;
    root.style.removeProperty('--current-pillar-color');
    root.style.removeProperty('--current-pillar-color-light');
    root.style.removeProperty('--current-use-dark-text');
  }
}

export default ThemeManager;