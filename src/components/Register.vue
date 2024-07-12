<template>
  <div class="register-page">
    <div class="register-container">
      <h2>Registro</h2>
      <form @submit.prevent="register">
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
        <div class="form-group">
          <label for="role">Rol:</label>
          <select v-model="role" id="role" required>
            <option value="" disabled>Selecciona un rol</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <span v-if="roleError" class="error">{{ roleError }}</span>
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '@/services/authService';

export default defineComponent({
  name: 'Register',
  setup() {
    const email = ref('');
    const password = ref('');
    const role = ref('');
    const emailError = ref('');
    const passwordError = ref('');
    const roleError = ref('');
    const router = useRouter();

    const validateForm = () => {
      let valid = true;
      emailError.value = '';
      passwordError.value = '';
      roleError.value = '';

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

      if (!role.value) {
        roleError.value = 'El rol es requerido';
        valid = false;
      }

      return valid;
    };

    const register = async () => {
      if (validateForm()) {
        try {
          await authService.register({ email: email.value, password: password.value, role: role.value });
          router.push('/login');
        } catch (error) {
          console.error('Error registrando usuario:', error);
        }
      }
    };

    return {
      email,
      password,
      role,
      emailError,
      passwordError,
      roleError,
      register,
    };
  },
});
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}

.register-container {
  max-width: 500px; /* Incrementa el ancho máximo */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  color: #333;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f9f9f9;
  transition: border-color 0.3s;
}

input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
  font-family: 'Arial', sans-serif;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
