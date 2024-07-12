<template>
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" required />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input v-model="password" type="password" id="password" required />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import authService from '@/services/authService';
  
  export default defineComponent({
    name: 'Login',
    setup() {
      const email = ref('');
      const password = ref('');
      const emailError = ref('');
      const passwordError = ref('');
      const router = useRouter();
  
      const validateForm = () => {
        let valid = true;
        emailError.value = '';
        passwordError.value = '';
  
        if (!email.value) {
          emailError.value = 'El email es requerido';
          valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
          emailError.value = 'El email no es válido';
          valid = false;
        }
  
        if (!password.value) {
          passwordError.value = 'La contraseña es requerida';
          valid = false;
        } else if (password.value.length < 6) {
          passwordError.value = 'La contraseña debe tener al menos 6 caracteres';
          valid = false;
        }
  
        return valid;
      };
  
      const login = async () => {
        if (validateForm()) {
          try {
            const response = await authService.login({ email: email.value, password: password.value });
            const userRole = response.role;
  
            if (userRole === 'admin') {
              router.push('/create-event');
            } else if (userRole === 'user') {
              router.push('/events');
            }
          } catch (error) {
            console.error('Error iniciando sesión:', error);
          }
        }
      };
  
      return {
        email,
        password,
        emailError,
        passwordError,
        login,
      };
    },
  });
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  .error {
    color: red;
    font-size: 12px;
  }
  </style>
  