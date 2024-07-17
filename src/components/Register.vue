
<template>
  
  <div class="register-page">
    <div class="register-container">
      <h2>Registro</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input v-model="name" type="text" id="name" required />
          <span v-if="nameError" class="error">{{ nameError }}</span>
        </div>
        <div class="form-group">
          <label for="city">Ciudad:</label>
          <input v-model="city" type="text" id="city" required />
          <span v-if="cityError" class="error">{{ cityError }}</span>
        </div>
        <div class="form-group">
          <label for="telefono">Teléfono:</label>
          <input v-model="telefono" type="text" id="telefono" required />
          <span v-if="telefonoError" class="error">{{ telefonoError }}</span>
        </div>
        <div class="form-group">
          <label for="cedula">Cédula:</label>
          <input v-model="cedula" type="text" id="cedula" required />
          <span v-if="cedulaError" class="error">{{ cedulaError }}</span>
        </div>
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
import axios from 'axios';
import authService from '@/services/authService';

export default defineComponent({
  name: 'Register',
  setup() {
    const name = ref('');
    const city = ref('');
    const telefono = ref('');
    const cedula = ref('');
    const email = ref('');
    const password = ref('');
    const role = ref('');
    const nameError = ref('');
    const cityError = ref('');
    const telefonoError = ref('');
    const cedulaError = ref('');
    const emailError = ref('');
    const passwordError = ref('');
    const roleError = ref('');
    const router = useRouter();

    const validateForm = () => {
      let valid = true;
      nameError.value = '';
      cityError.value = '';
      telefonoError.value = '';
      cedulaError.value = '';
      emailError.value = '';
      passwordError.value = '';
      roleError.value = '';

      if (!name.value) {
        nameError.value = 'El nombre es requerido';
        valid = false;
      }

      if (!city.value) {
        cityError.value = 'La ciudad es requerida';
        valid = false;
      }

      if (!telefono.value) {
        telefonoError.value = 'El teléfono es requerido';
        valid = false;
      }

      if (!cedula.value) {
        cedulaError.value = 'La cédula es requerida';
        valid = false;
      }

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
          await authService.register({ 
            name: name.value,
            city: city.value,
            telefono: telefono.value,
            cedula: cedula.value,
            email: email.value,
            password: password.value,
            role: role.value 
          });
          router.push('/login');
        } catch (err) {
          console.error('Error registrando usuario:', err);
          if (axios.isAxiosError(err)) {
            const serverError = err.response?.data.message;
            if (serverError) {
              if (serverError.includes('email')) {
                emailError.value = serverError;
              } else if (serverError.includes('password')) {
                passwordError.value = serverError;
              } else if (serverError.includes('role')) {
                roleError.value = serverError;
              } else {
                alert('Error registrando usuario: ' + serverError);
              }
            } else {
              alert('Error desconocido al registrar usuario');
            }
          } else {
            alert('Error desconocido al registrar usuario');
          }
        }
      }
    };

    return {
      name,
      city,
      telefono,
      cedula,
      email,
      password,
      role,
      nameError,
      cityError,
      telefonoError,
      cedulaError,
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
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  padding: 20px;
}

.register-container {
  max-width: 600px;
  width: 100%;
  padding: 40px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.5s;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
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
  padding: 12px;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f8f8f8;
  transition: border-color 0.3s, background-color 0.3s;
}

input:focus,
select:focus {
  border-color: #6a11cb;
  background-color: #e6e6ff;
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #6a11cb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2575fc;
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
