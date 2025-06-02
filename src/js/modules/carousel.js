/**
 * Carousel Module
 * Handles Swiper carousel functionality and card management
 */

import { Swiper } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

class CarouselManager {
  constructor() {
    this.swipers = {
      s3: null,
      s4: null,
      s5: null
    };
  }

  /**
   * Initialize Swiper for a specific screen
   * @param {string} screenKey - Screen identifier (s3, s4, s5)
   */
  initSwiper(screenKey) {
    // Destroy existing swiper if it exists
    if (this.swipers[screenKey]) {
      this.swipers[screenKey].destroy(true, true);
    }

    // Create new swiper instance
    this.swipers[screenKey] = new Swiper(`#${screenKey}_swiper_container`, {
      slidesPerView: 1,
      spaceBetween: 20,
      grabCursor: true,
      
      // Pagination
      pagination: {
        el: `#${screenKey}_pagination`,
        clickable: true
      },
      
      // Navigation
      navigation: {
        nextEl: `#${screenKey}_next`,
        prevEl: `#${screenKey}_prev`
      },
      
      // Responsive breakpoints
      breakpoints: {
        600: {
          slidesPerView: 1.5
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      },
      
      // Accessibility
      a11y: {
        prevSlideMessage: 'Önceki',
        nextSlideMessage: 'Sonraki'
      },
      
      // Observer for dynamic content
      observer: true,
      observeParents: true
    });

    return this.swipers[screenKey];
  }

  /**
   * Get swiper instance for a screen
   * @param {string} screenKey - Screen identifier
   * @returns {Swiper|null} Swiper instance or null
   */
  getSwiper(screenKey) {
    return this.swipers[screenKey] || null;
  }

  /**
   * Clear carousel content
   * @param {string} screenKey - Screen identifier
   */
  clearCarousel(screenKey) {
    const wrapper = document.getElementById(`${screenKey}_swiper_wrapper`);
    if (wrapper) {
      wrapper.innerHTML = '';
    }
  }

  /**
   * Add slide to carousel
   * @param {string} screenKey - Screen identifier
   * @param {string} content - HTML content for the slide
   * @returns {HTMLElement} Created slide element
   */
  addSlide(screenKey, content) {
    const wrapper = document.getElementById(`${screenKey}_swiper_wrapper`);
    if (!wrapper) return null;

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = content;
    wrapper.appendChild(slide);

    return slide;
  }

  /**
   * Update carousel after content changes
   * @param {string} screenKey - Screen identifier
   */
  updateCarousel(screenKey) {
    const swiper = this.swipers[screenKey];
    if (swiper) {
      swiper.update();
    }
  }

  /**
   * Go to specific slide
   * @param {string} screenKey - Screen identifier
   * @param {number} index - Slide index
   */
  goToSlide(screenKey, index) {
    const swiper = this.swipers[screenKey];
    if (swiper) {
      swiper.slideTo(index);
    }
  }

  /**
   * Destroy all swipers
   */
  destroyAll() {
    Object.keys(this.swipers).forEach(key => {
      if (this.swipers[key]) {
        this.swipers[key].destroy(true, true);
        this.swipers[key] = null;
      }
    });
  }

  /**
   * Reinitialize all carousels
   */
  reinitializeAll() {
    Object.keys(this.swipers).forEach(key => {
      this.initSwiper(key);
    });
  }
}

export default CarouselManager;