/**
 * Menu Enhancement - Optional JavaScript for improved UX
 * 
 * This script enhances the CSS-only menu component with:
 * - Click outside to close functionality
 * - Better keyboard navigation
 * - Smart viewport positioning
 * - Progressive enhancement (works with or without JS)
 * 
 * The menu component works perfectly without this script,
 * this just adds nice-to-have features.
 */

(function() {
  'use strict';

  // Check if browser supports details/summary
  if (!('open' in document.createElement('details'))) {
    console.warn('Menu enhancement: Browser does not support <details> element');
    return;
  }

  let isEnhanced = false;

  function enhanceMenus() {
    if (isEnhanced) return;
    
    const menus = document.querySelectorAll('details.menu');
    
    if (menus.length === 0) return;

    menus.forEach(menu => {
      // Add enhanced class for styling hooks if needed
      menu.classList.add('menu--enhanced');
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        // Check if click is outside this menu
        if (!menu.contains(e.target)) {
          menu.removeAttribute('open');
        }
      });

      // Smart positioning when menu opens
      menu.addEventListener('toggle', () => {
        if (menu.hasAttribute('open')) {
          requestAnimationFrame(() => {
            positionMenuInViewport(menu);
          });
        }
      });

      // Enhanced keyboard support
      menu.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'Escape':
            menu.removeAttribute('open');
            const summary = menu.querySelector('summary');
            if (summary) summary.focus();
            break;
            
          case 'ArrowDown':
            if (menu.hasAttribute('open')) {
              e.preventDefault();
              focusNextMenuItem(menu);
            }
            break;
            
          case 'ArrowUp':
            if (menu.hasAttribute('open')) {
              e.preventDefault();
              focusPreviousMenuItem(menu);
            }
            break;
            
          case 'Enter':
          case ' ':
            const target = e.target;
            if (target.matches('.menu__link[href="#"]')) {
              e.preventDefault();
              // Close menu when selecting a dummy link
              menu.removeAttribute('open');
            }
            break;
        }
      });

      // Handle submenu behavior (for nested details)
      const submenus = menu.querySelectorAll('details.menu__item--has-submenu');
      submenus.forEach(submenu => {
        submenu.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent closing parent menu
        });

        // Position submenus smartly too
        submenu.addEventListener('toggle', () => {
          if (submenu.hasAttribute('open')) {
            requestAnimationFrame(() => {
              positionSubmenuInViewport(submenu);
            });
          }
        });
      });
    });

    isEnhanced = true;
    console.log('Menu enhancement: Enhanced', menus.length, 'menus');
  }

  function positionMenuInViewport(menu) {
    const content = menu.querySelector('.menu__content');
    if (!content) return;

    const rect = content.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let adjustments = {};

    // Check if menu overflows right edge
    if (rect.right > viewport.width) {
      if (menu.classList.contains('menu--right')) {
        // Already right-aligned, keep it
      } else {
        // Switch to right alignment
        adjustments.right = '0';
        adjustments.left = 'auto';
      }
    }

    // Check if menu overflows bottom edge
    if (rect.bottom > viewport.height) {
      // Try positioning above
      const trigger = menu.querySelector('summary');
      const triggerRect = trigger?.getBoundingClientRect();
      
      if (triggerRect && triggerRect.top > rect.height) {
        adjustments.top = 'auto';
        adjustments.bottom = '100%';
        adjustments.marginTop = '0';
        adjustments.marginBottom = 'var(--size-1)';
      }
    }

    // Check if menu overflows left edge (when right-aligned)
    if (rect.left < 0) {
      adjustments.left = '0';
      adjustments.right = 'auto';
    }

    // Apply adjustments
    Object.assign(content.style, adjustments);
  }

  function positionSubmenuInViewport(submenu) {
    const content = submenu.querySelector('.menu__content');
    if (!content) return;

    const rect = content.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let adjustments = {};

    // Check if submenu overflows right edge
    if (rect.right > viewport.width) {
      // Position on left side of parent
      adjustments.left = 'auto';
      adjustments.right = '100%';
      adjustments.marginLeft = '0';
      adjustments.marginRight = 'var(--size-1)';
    }

    // Check if submenu overflows left edge
    if (rect.left < 0) {
      // Position on right side of parent
      adjustments.left = '100%';
      adjustments.right = 'auto';
      adjustments.marginLeft = 'var(--size-1)';
      adjustments.marginRight = '0';
    }

    // Check vertical positioning
    if (rect.bottom > viewport.height) {
      // Align bottom of submenu with bottom of viewport
      const overflow = rect.bottom - viewport.height;
      adjustments.top = `${-overflow}px`;
    }

    if (rect.top < 0) {
      // Align top of submenu with top of viewport
      adjustments.top = `${-rect.top}px`;
    }

    // Apply adjustments
    Object.assign(content.style, adjustments);
  }

  function focusNextMenuItem(menu) {
    const menuItems = menu.querySelectorAll('.menu__link:not([aria-disabled="true"])');
    const currentIndex = Array.from(menuItems).findIndex(item => item === document.activeElement);
    const nextIndex = (currentIndex + 1) % menuItems.length;
    menuItems[nextIndex]?.focus();
  }

  function focusPreviousMenuItem(menu) {
    const menuItems = menu.querySelectorAll('.menu__link:not([aria-disabled="true"])');
    const currentIndex = Array.from(menuItems).findIndex(item => item === document.activeElement);
    const prevIndex = currentIndex <= 0 ? menuItems.length - 1 : currentIndex - 1;
    menuItems[prevIndex]?.focus();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceMenus);
  } else {
    enhanceMenus();
  }

  // Re-enhance if new menus are added dynamically
  const observer = new MutationObserver(() => {
    const newMenus = document.querySelectorAll('details.menu:not(.menu--enhanced)');
    if (newMenus.length > 0) {
      isEnhanced = false;
      enhanceMenus();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Expose for manual initialization if needed
  window.MenuEnhancement = {
    enhance: enhanceMenus,
    version: '1.1.0'
  };

})();