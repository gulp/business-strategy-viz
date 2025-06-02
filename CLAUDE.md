# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a collection of HTML files containing identical single-page applications for a Turkish business strategy visualization tool. The application displays a hierarchical structure of strategic areas (Stratejik Temel Alanlar), objectives (Amaçlar), targets (Hedefler), and actions (Aksiyonlar).

## Architecture

The application is a vanilla JavaScript SPA with the following key components:

- **Multi-screen navigation**: 5 screens (s1-s5) managed by showScreen() function
- **Data structure**: strategicVisionData object containing hierarchical business data for 4 strategic areas:
  - Finans (Finance) - Red theme
  - Müşteri (Customer) - Green theme  
  - Dahili Süreçler (Internal Processes) - Blue theme
  - Öğrenme & Gelişim (Learning & Development) - Orange theme
- **Carousel system**: Uses Swiper.js for card-based navigation through each hierarchy level
- **Dynamic theming**: Colors and text contrast adjust based on selected strategic area

## Key Technical Details

- Uses CSS custom properties for theming and responsive design
- Swiper.js handles carousel functionality with pagination and navigation
- No build process or dependencies - runs directly in browser
- Turkish language interface
- Card-based UI with hover animations and 3D stacking effects

## File Naming Convention

Files follow timestamp pattern: `code - YYYY-MM-DDTHHMMSS.sss.html`
`_latest.html` appears to be the current version.

## Development Workflow

Since this is static HTML with no build process:
- Open any HTML file directly in browser for testing
- Use browser developer tools for debugging
- No installation or compilation steps required
- External dependencies loaded via CDN (Swiper.js, Google Fonts)