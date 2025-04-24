const API_BASE = import.meta.env.PROD
  ? 'https://book-reader-djno.onrender.com/api'  // Production backend
  : '/api';  // Proxy in development

export default API_BASE;
