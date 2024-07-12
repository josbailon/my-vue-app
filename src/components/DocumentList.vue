<template>
    <div>
      <nav class="navbar">
        <ul class="nav-list">
            <li class="nav-item">
          <router-link to="/documents">Ver Documentos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/events">Lista de Eventos</router-link>
        </li>
        </ul>
      </nav>
      <div class="document-list-container">
        <h2>Lista de Documentos</h2>
        <ul class="document-list">
          <li v-for="document in documents" :key="document.id" class="document-item">
            <div class="document-content">
              <h3>{{ document.title }}</h3>
              <p>{{ document.description }}</p>
              <a :href="getDocumentUrl(document.document)" target="_blank">Ver Documento</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import documentService from '@/services/documentService';
  
  interface Document {
    id: number;
    title: string;
    description: string;
    document: string;
  }
  
  export default defineComponent({
    name: 'DocumentList',
    setup() {
      const documents = ref<Document[]>([]);
  
      const fetchDocuments = async () => {
        try {
          documents.value = await documentService.getAllDocuments();
        } catch (error) {
          console.error('Error obteniendo documentos:', error);
        }
      };
  
      const getDocumentUrl = (documentName: string) => {
        return `http://localhost:3000/uploads/${documentName}`;
      };
  
      onMounted(fetchDocuments);
  
      return {
        documents,
        getDocumentUrl,
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
  
  /* Estilo para el contenedor de la lista de documentos */
  .document-list-container {
    max-width: 800px;
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
  
  .document-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .document-item {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .document-item:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
  
  .document-content {
    text-align: left;
  }
  
  h3 {
    margin-top: 0;
    font-size: 24px;
    color: #333;
  }
  
  p {
    font-size: 16px;
    color: #666;
  }
  
  a {
    display: inline-block;
    margin-top: 10px;
    color: #007bff;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: #0056b3;
  }
  </style>
  