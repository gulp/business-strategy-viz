/**
 * DOM Utilities Module
 * Common DOM manipulation functions
 */

/**
 * Create HTML card component
 * @param {Object} data - Card data (id, title, icon, etc.)
 * @param {string} cardType - Type of card (amac, hedef, aksiyon, etc.)
 * @param {number} index - Card index
 * @param {Object} styling - Styling configuration from theme manager
 * @param {...string} additionalArgs - Additional arguments for ID generation
 * @returns {string} HTML string for the card
 */
export function createItemCardHTML(data, cardType, index, styling, ...additionalArgs) {
  let mainTitleText = "";
  let idForDisplay = "";
  const description = data.title;
  
  // Generate content based on card type
  switch (cardType) {
    case 'amac':
      mainTitleText = `Amaç ${index + 1}`;
      idForDisplay = data.id;
      break;
    case 'staticAmac':
      mainTitleText = `Amaç ${index + 1}`;
      idForDisplay = data.id;
      break;
    case 'hedef':
      mainTitleText = `Hedef ${index + 1}`;
      idForDisplay = `${additionalArgs[0]}.${data.id}`;
      break;
    case 'staticHedef':
      mainTitleText = `Hedef ${index + 1}`;
      idForDisplay = `${additionalArgs[0]}.${data.id}`;
      break;
    case 'aksiyon':
      mainTitleText = `Aksiyon ${index + 1}`;
      idForDisplay = `${additionalArgs[0]}.${additionalArgs[1]}${data.id}`;
      break;
  }

  // Generate icon HTML
  const iconHTML = data.icon 
    ? `<div class="item-card-icon text-2xl text-yellow-400 self-center mt-2 mb-2">${data.icon}</div>`
    : '';

  // Generate KPI stack HTML
  let kpiStackHTML = '';
  if (cardType === 'aksiyon' && data.subText && Array.isArray(data.subText)) {
    kpiStackHTML = '<div class="kpi-stack-container w-full mt-auto">';
    data.subText.forEach(kpi => {
      kpiStackHTML += `<div class="kpi-item">${kpi.replace(/\n/g, '<br>')}</div>`;
    });
    kpiStackHTML += '</div>';
  }

  // Build data attributes
  const dataAttributes = [
    styling.isClickable ? `data-index="${index}"` : '',
    `data-id="${data.id}"`,
    `data-amac-id="${additionalArgs[0] || ''}"`,
    `data-hedef-id="${(cardType === 'staticHedef' || cardType === 'aksiyon') ? data.id : ''}"`
  ].filter(Boolean).join(' ');

  return `
    <div class="${styling.cardClasses} ${styling.bgClass}" 
         ${dataAttributes}>
      <div class="item-card-header flex justify-between w-full mb-2 items-center">
        <span class="item-card-main-title text-xl font-bold">
          ${mainTitleText}
        </span>
        <span class="item-card-id text-lg font-medium px-2 py-0.5 rounded bg-white bg-opacity-15">
          ${idForDisplay}
        </span>
      </div>
      <p class="item-card-description text-base mb-4 flex-grow">
        ${description.replace(/\n/g, '<br>')}
      </p>
      ${iconHTML}
      ${kpiStackHTML}
    </div>`;
}

/**
 * Get ID background color helper
 * @param {string} cardType - Card type
 * @param {Object} styling - Styling object
 * @returns {string} Background color
 */
function getIdBackgroundColor(cardType, styling) {
  if (cardType === 'staticAmac' || cardType === 'staticHedef') {
    return 'rgba(170,170,170,0.1)';
  }
  // This should ideally come from theme manager, but for now using inline logic
  return 'rgba(255,255,255,0.15)';
}

/**
 * Add event listener with cleanup
 * @param {HTMLElement} element - Target element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @returns {Function} Cleanup function
 */
export function addEventListenerWithCleanup(element, event, handler) {
  element.addEventListener(event, handler);
  return () => element.removeEventListener(event, handler);
}

/**
 * Query selector with error handling
 * @param {string} selector - CSS selector
 * @param {HTMLElement} context - Context element (default: document)
 * @returns {HTMLElement|null} Found element or null
 */
export function safeQuerySelector(selector, context = document) {
  try {
    return context.querySelector(selector);
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`, error);
    return null;
  }
}

/**
 * Query selector all with error handling
 * @param {string} selector - CSS selector
 * @param {HTMLElement} context - Context element (default: document)
 * @returns {NodeList} Found elements
 */
export function safeQuerySelectorAll(selector, context = document) {
  try {
    return context.querySelectorAll(selector);
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`, error);
    return [];
  }
}

/**
 * Create element with classes and attributes
 * @param {string} tag - HTML tag name
 * @param {Array} classes - Array of CSS classes
 * @param {Object} attributes - Object of attributes
 * @param {string} innerHTML - Inner HTML content
 * @returns {HTMLElement} Created element
 */
export function createElement(tag, classes = [], attributes = {}, innerHTML = '') {
  const element = document.createElement(tag);
  
  if (classes.length > 0) {
    element.classList.add(...classes);
  }
  
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  
  return element;
}

/**
 * Animate element with CSS transitions
 * @param {HTMLElement} element - Target element
 * @param {Object} styles - CSS styles to apply
 * @param {number} duration - Animation duration in ms
 * @returns {Promise} Promise that resolves when animation completes
 */
export function animateElement(element, styles, duration = 300) {
  return new Promise(resolve => {
    const originalTransition = element.style.transition;
    element.style.transition = `all ${duration}ms ease-in-out`;
    
    Object.entries(styles).forEach(([property, value]) => {
      element.style[property] = value;
    });
    
    setTimeout(() => {
      element.style.transition = originalTransition;
      resolve();
    }, duration);
  });
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}