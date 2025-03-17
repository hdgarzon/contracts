// src/services/WixTokenService.js
import { setAuthToken } from './api-auth';
import { API_URL, APP_ID } from '../config/env';

class WixTokenService {
  constructor() {
    this.token = null;
    this.userProfile = null;
    this.isListening = false;
    this.tokenCallback = null;
    this.fallbackTimer = null;
    this.retryInterval = null;
  }

  /**
   * Inicializa el servicio y comienza a escuchar mensajes de Wix
   * @param {Function} callback - Función que se ejecutará cuando se reciba el token
   * @returns {void}
   */
  initialize(callback) {
    if (this.isListening) return;
    
    this.tokenCallback = callback;
    this.isListening = true;
    
    // Añadir el listener para mensajes de Wix
    window.addEventListener('message', this.handleMessage);
    
    // Notificar a Wix que la app está lista para recibir datos
    this.notifyReady();
    
    console.log('[WixTokenService] Inicializado y escuchando mensajes');
    
    // Timer de respaldo para casos donde Wix no responde (solo en producción)
    if (process.env.NODE_ENV === 'production') {
      this.fallbackTimer = setTimeout(() => {
        if (!this.token) {
          console.log('[WixTokenService] No se recibió respuesta de Wix después de 10 segundos');
          
          // Podríamos llamar al callback con datos vacíos o redirigir a una página de error
          if (typeof this.tokenCallback === 'function') {
            this.tokenCallback({
              token: null,
              userProfile: null,
              error: 'timeout'
            });
          }
        }
      }, 10000);
    }
  }

  /**
   * Notifica a Wix que la aplicación está lista para recibir datos
   */
  notifyReady() {
    try {
      console.log('[WixTokenService] Enviando mensaje de ready a Wix');
      
      window.parent.postMessage({
        ready: true,
        applicationId: APP_ID
      }, '*');
      
      // Reintentar hasta 3 veces en producción
      if (process.env.NODE_ENV === 'production') {
        let retryCount = 0;
        this.retryInterval = setInterval(() => {
          if (!this.token && retryCount < 3) {
            console.log(`[WixTokenService] Reintentando enviar mensaje de ready (${retryCount + 1}/3)`);
            
            window.parent.postMessage({
              ready: true,
              applicationId: APP_ID
            }, '*');
            
            retryCount++;
          } else {
            clearInterval(this.retryInterval);
          }
        }, 3000);
      }
    } catch (error) {
      console.error('[WixTokenService] Error al notificar readiness a Wix:', error);
    }
  }

  /**
   * Maneja los mensajes recibidos desde Wix
   * @param {MessageEvent} event - Evento de mensaje
   */
  handleMessage = (event) => {
    // Verificar que el mensaje proviene de Wix
    if (event.data && typeof event.data === 'object') {
      console.log('[WixTokenService] Mensaje recibido:', event.data);
      
      // Si el mensaje contiene un token
      if (event.data.token) {
        console.log('[WixTokenService] Token recibido de Wix');
        
        // Guardar el token y el perfil del usuario
        this.token = event.data.token;
        
        // Extraer información del perfil de usuario si está disponible
        if (event.data.userProfile) {
          this.userProfile = event.data.userProfile;
          console.log('[WixTokenService] Perfil de usuario:', this.userProfile);
        }
        
        // Establecer el token en el servicio de auth
        setAuthToken(this.token);
        
        // Limpiar timers de retries y fallback
        if (this.retryInterval) {
          clearInterval(this.retryInterval);
        }
        
        if (this.fallbackTimer) {
          clearTimeout(this.fallbackTimer);
        }
        
        // Ejecutar callback si existe
        if (typeof this.tokenCallback === 'function') {
          this.tokenCallback({
            token: this.token,
            userProfile: this.userProfile
          });
        }
      }
    }
  };

  /**
   * Detiene la escucha de mensajes de Wix y limpia los timers
   */
  cleanup() {
    if (this.isListening) {
      window.removeEventListener('message', this.handleMessage);
      this.isListening = false;
      
      if (this.fallbackTimer) {
        clearTimeout(this.fallbackTimer);
      }
      
      if (this.retryInterval) {
        clearInterval(this.retryInterval);
      }
      
      console.log('[WixTokenService] Limpieza realizada, ya no se escuchan mensajes');
    }
  }

  /**
   * Obtiene el token actual
   * @returns {string|null} Token de autenticación o null si no hay token
   */
  getToken() {
    return this.token;
  }

  /**
   * Obtiene el perfil del usuario actual
   * @returns {Object|null} Perfil del usuario o null si no hay perfil
   */
  getUserProfile() {
    return this.userProfile;
  }
}

// Exportar una única instancia del servicio
export default new WixTokenService();