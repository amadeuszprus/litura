/**
 * Dialog & Alert Enhancement - Optional JavaScript for improved UX
 * 
 * This script enhances the CSS-only dialog and alert components with:
 * - Auto-dismiss for alerts
 * - Programmatic alert creation
 * - Better keyboard navigation for dialogs
 * - Focus management
 * - Progressive enhancement (works with or without JS)
 * 
 * The components work perfectly without this script,
 * this just adds nice-to-have features.
 */

(function() {
  'use strict';

  let isEnhanced = false;

  function enhanceComponents() {
    if (isEnhanced) return;
    
    enhanceDialogs();
    enhanceAlerts();
    
    isEnhanced = true;
    console.log('Dialog & Alert enhancement: Components enhanced');
  }

  function enhanceDialogs() {
    const dialogs = document.querySelectorAll('details.dialog');
    
    dialogs.forEach(dialog => {
      dialog.classList.add('dialog--enhanced');
      
      // Close dialog when clicking backdrop
      const backdrop = dialog.querySelector('.dialog__backdrop');
      if (backdrop) {
        backdrop.addEventListener('click', () => {
          dialog.removeAttribute('open');
        });
      }

      // Close dialog with close button
      const closeBtn = dialog.querySelector('.dialog__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          dialog.removeAttribute('open');
        });
      }

      // Focus management
      dialog.addEventListener('toggle', () => {
        if (dialog.hasAttribute('open')) {
          // Store the element that opened the dialog
          dialog._triggerElement = document.activeElement;
          
          // Focus first focusable element in dialog
          requestAnimationFrame(() => {
            const firstFocusable = dialog.querySelector(
              'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (firstFocusable) {
              firstFocusable.focus();
            }
          });
        } else {
          // Return focus to trigger element
          if (dialog._triggerElement) {
            dialog._triggerElement.focus();
            delete dialog._triggerElement;
          }
        }
      });

      // Enhanced keyboard support
      dialog.addEventListener('keydown', (e) => {
        if (!dialog.hasAttribute('open')) return;

        switch (e.key) {
          case 'Escape':
            e.preventDefault();
            dialog.removeAttribute('open');
            break;
            
          case 'Tab':
            trapFocus(dialog, e);
            break;
        }
      });
    });
  }

  function enhanceAlerts() {
    const alerts = document.querySelectorAll('.alert');
    
    alerts.forEach(alert => {
      alert.classList.add('alert--enhanced');
      
      // Auto-dismiss functionality
      if (alert.hasAttribute('data-auto-dismiss')) {
        const duration = parseInt(alert.getAttribute('data-auto-dismiss')) || 5000;
        alert.style.setProperty('--alert-duration', `${duration}ms`);
        alert.classList.add('alert--auto-dismiss');
        
        setTimeout(() => {
          dismissAlert(alert);
        }, duration);
      }

      // Manual dismiss
      const closeBtn = alert.querySelector('.alert__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          dismissAlert(alert);
        });
      }
    });
  }

  function trapFocus(dialog, event) {
    const focusableElements = dialog.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  function dismissAlert(alert) {
    // Prevent multiple dismiss calls
    if (alert.classList.contains('alert--dismissing')) {
      return;
    }
    
    alert.classList.add('alert--dismissing');
    
    // Listen specifically for the alertSlideOut animation
    const handleAnimationEnd = (e) => {
      // Make sure the animation event is from this alert element and the right animation
      if (e.target === alert && e.animationName === 'alertSlideOut') {
        if (alert.parentNode) {
          alert.parentNode.removeChild(alert);
        }
        alert.removeEventListener('animationend', handleAnimationEnd);
      }
    };
    
    alert.addEventListener('animationend', handleAnimationEnd);
    
    // Fallback removal after animation duration + buffer
    setTimeout(() => {
      if (alert.parentNode && alert.classList.contains('alert--dismissing')) {
        alert.parentNode.removeChild(alert);
      }
    }, 400); // 300ms animation + 100ms buffer
  }

  // Public API for creating alerts programmatically
  function createAlert(options = {}) {
    const {
      type = 'info',
      title = '',
      message = '',
      position = 'top-right',
      autoDismiss = 5000,
      closable = true,
      solid = false
    } = options;

    // Create alert element
    const alert = document.createElement('div');
    const variant = solid ? `${type}-solid` : type;
    alert.className = `alert alert--${variant} alert--enhanced`;
    
    if (autoDismiss) {
      alert.setAttribute('data-auto-dismiss', autoDismiss);
      alert.style.setProperty('--alert-duration', `${autoDismiss}ms`);
      alert.classList.add('alert--auto-dismiss');
    }

    // Create alert content
    let alertHTML = '';
    
    // Icon
    alertHTML += `<div class="alert__icon">${getAlertIcon(type)}</div>`;
    
    // Content
    alertHTML += '<div class="alert__content">';
    if (title) {
      alertHTML += `<div class="alert__title">${title}</div>`;
    }
    if (message) {
      alertHTML += `<div class="alert__message">${message}</div>`;
    }
    alertHTML += '</div>';
    
    // Close button
    if (closable) {
      alertHTML += `
        <button class="alert__close" aria-label="Zamknij">
          <svg viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      `;
    }

    alert.innerHTML = alertHTML;

    // Get or create container
    let container = document.querySelector(`.alert-container--${position}`);
    if (!container) {
      container = document.createElement('div');
      container.className = `alert-container alert-container--${position}`;
      document.body.appendChild(container);
    }

    // Add alert to container
    container.appendChild(alert);

    // Set up auto-dismiss
    if (autoDismiss) {
      setTimeout(() => {
        dismissAlert(alert);
      }, autoDismiss);
    }

    // Set up manual dismiss
    if (closable) {
      const closeBtn = alert.querySelector('.alert__close');
      closeBtn.addEventListener('click', () => {
        dismissAlert(alert);
      });
    }

    return alert;
  }

  function getAlertIcon(type) {
    const icons = {
      info: '<svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>',
      success: '<svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>',
      warning: '<svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>',
      error: '<svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>'
    };
    return icons[type] || icons.info;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceComponents);
  } else {
    enhanceComponents();
  }

  // Re-enhance if new components are added dynamically
  const observer = new MutationObserver(() => {
    const newDialogs = document.querySelectorAll('details.dialog:not(.dialog--enhanced)');
    const newAlerts = document.querySelectorAll('.alert:not(.alert--enhanced)');
    
    if (newDialogs.length > 0 || newAlerts.length > 0) {
      isEnhanced = false;
      enhanceComponents();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Expose public API
  window.DialogAlertEnhancement = {
    enhance: enhanceComponents,
    createAlert: createAlert,
    dismissAlert: dismissAlert,
    version: '1.0.0'
  };

})();