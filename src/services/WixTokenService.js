// src/services/WixTokenService.js
import { setAuthToken } from './api-auth';
import { API_URL, APP_ID, updateToken } from '../config/env'; // Importa la función updateToken

class WixTokenService {
  constructor() {
    this.token = null;
    this.userProfile = null;
    this.isListening = false;
    this.tokenCallback = null;
  }

  initialize(callback) {
    if (this.isListening) return;
    
    this.tokenCallback = callback;
    this.isListening = true;
    
    // Añadir el listener para mensajes de Wix
    window.addEventListener('message', this.handleMessage);
    
    // Notificar a Wix que la app está lista para recibir datos
    this.notifyReady();
    
    console.log('[WixTokenService] Inicializado y escuchando mensajes');
  }

  notifyReady() {
    try {
      console.log('[WixTokenService] Enviando mensaje de ready a Wix');
      
      window.parent.postMessage({
        ready: true,
        applicationId: APP_ID
      }, '*');
    } catch (error) {
      console.error('[WixTokenService] Error al notificar readiness a Wix:', error);
    }
  }

  handleMessage = (event) => {
    // Verificar que el mensaje contiene algo útil
    if (event.data && typeof event.data === 'object') {
      console.log('[WixTokenService] Mensaje recibido:', event.data);
      
      // Buscar token en varias propiedades posibles
      const token = event.data.token || event.data.TOKEN;
      
      if (token) {
        console.log('[WixTokenService] Token recibido de Wix');
        
        // Guardar el token
        this.token = token;
        
        // Extraer información del perfil de usuario si está disponible
        if (event.data.userProfile) {
          this.userProfile = event.data.userProfile;
          console.log('[WixTokenService] Perfil de usuario:', this.userProfile);
        }
        
        // IMPORTANTE: Actualizar el token en env.js
        updateToken(token); // Llama a la función para actualizar el token
        
        // Establecer el token en el servicio de auth
        setAuthToken(token);
        
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

  cleanup() {
    if (this.isListening) {
      window.removeEventListener('message', this.handleMessage);
      this.isListening = false;
      console.log('[WixTokenService] Limpieza realizada, ya no se escuchan mensajes');
    }
  }

  getToken() {
    return this.token;
  }

  getUserProfile() {
    return this.userProfile;
  }
}

export default new WixTokenService();