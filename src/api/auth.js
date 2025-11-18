import api from './axios'

export function login(payload) {
  return api.post('/login', payload);
}
