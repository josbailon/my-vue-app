<template>
  <div>
    <nav class="navbar">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/create-event">Crear Evento</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/upload-document">Subir Documento</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/documents">Ver Documentos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/events">Lista de Eventos</router-link>
        </li>
      </ul>
    </nav>
    <div class="upload-document-container">
      <h2>Subir Documento</h2>
      <form @submit.prevent="uploadDocument" enctype="multipart/form-data" class="upload-document-form">
        <div class="form-group">
          <label for="title">Título:</label>
          <input v-model="title" type="text" id="title" required />
          <span v-if="titleError" class="error">{{ titleError }}</span>
        </div>
        <div class="form-group">
          <label for="description">Descripción:</label>
          <input v-model="description" type="text" id="description" required />
          <span v-if="descriptionError" class="error">{{ descriptionError }}</span>
        </div>
        <div class="form-group">
          <label for="document">Documento:</label>
          <input @change="onFileChange" type="file" id="document" accept=".pdf,.doc,.docx,.txt" required />
          <span v-if="documentError" class="error">{{ documentError }}</span>
        </div>
        <button type="submit">Subir Documento</button>
        <p v-if="message" class="message">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import documentService from '@/services/documentService';

export default defineComponent({
  name: 'UploadDocument',
  setup() {
    const title = ref('');
    const description = ref('');
    const document = ref<File | null>(null);
    const titleError = ref('');
    const descriptionError = ref('');
    const documentError = ref('');
    const message = ref<string | null>(null);

    const onFileChange = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        document.value = files[0];
      }
    };

    const validateForm = () => {
      let valid = true;
      titleError.value = '';
      descriptionError.value = '';
      documentError.value = '';

      if (!title.value) {
        titleError.value = 'El título es requerido';
        valid = false;
      }

      if (!description.value) {
        descriptionError.value = 'La descripción es requerida';
        valid = false;
      }

      if (!document.value) {
        documentError.value = 'El documento es requerido';
        valid = false;
      }

      return valid;
    };

    const uploadDocument = async () => {
      if (validateForm()) {
        try {
          const formData = new FormData();
          formData.append('title', title.value);
          formData.append('description', description.value);
          if (document.value) {
            formData.append('document', document.value);
          }
          const response = await documentService.uploadDocument(formData);
          message.value = response.message;

          setTimeout(() => {
            title.value = '';
            description.value = '';
            document.value = null;
            message.value = '';
          }, 2000);
        } catch (error) {
          console.error('Error subiendo documento:', error);
          message.value = 'Error al subir el documento';
        }
      }
    };

    return {
      title,
      description,
      document,
      titleError,
      descriptionError,
      documentError,
      message,
      onFileChange,
      uploadDocument,
    };
  },
});
</script>

<style scoped>
/* Estilo para la barra de navegación */
.navbar {
  background-color: #1f1f1f;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
}

.nav-list {
  list-style: none;
  padding: 0;
  display: flex;
  margin: 0;
}

.nav-item {
  margin: 0 20px;
}

.nav-item a {
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-item a:hover {
  color: #ff6347;
}

/* Estilo para el contenedor del formulario */
.upload-document-container {
  max-width: 600px;
  margin: auto;
  padding: 30px;
  background: linear-gradient(135deg, #f9f9f9, #e0e0e0);
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

h2 {
  margin-bottom: 25px;
  font-size: 32px;
  color: #333;
  font-family: 'Arial', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.upload-document-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #555;
}

input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="file"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

button:active {
  background-color: #004494;
}

.error {
  color: #ff6347;
  font-size: 14px;
}

.message {
  color: #28a745;
  font-size: 16px;
  margin-top: 15px;
  text-align: center;
  animation: fadeIn 1s ease-in-out;
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
