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
    <div class="event-list-container">
      <h2>Lista de Eventos</h2>
      <div class="event-grid">
        <div v-for="event in events" :key="event.id" class="event-item">
          <div class="event-content">
            <h3>{{ event.title }}</h3>
            <p>{{ event.description }}</p>
          </div>
          <div class="event-image-container" v-if="event.image" @click="openModal(event.image)">
            <img :src="getImageUrl(event.image)" alt="Event Image" class="event-image" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="closeModal">×</span>
        <img :src="getImageUrl(modalImage)" alt="Event Image" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import eventService from '@/services/eventService';

export default defineComponent({
  name: 'EventList',
  setup() {
    const events = ref([]);
    const showModal = ref(false);
    const modalImage = ref('');

    const fetchEvents = async () => {
      try {
        events.value = await eventService.getAllEvents();
      } catch (error) {
        console.error('Error obteniendo eventos:', error);
      }
    };

    const getImageUrl = (imageName: string) => {
      return `http://localhost:3000/uploads/${imageName}`;
    };

    const openModal = (image: string) => {
      modalImage.value = image;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      modalImage.value = '';
    };

    onMounted(fetchEvents);

    return {
      events,
      showModal,
      modalImage,
      getImageUrl,
      openModal,
      closeModal,
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

/* Estilo para el contenedor de la lista de eventos */
.event-list-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.event-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.event-content {
  margin-bottom: 15px;
}

.event-item h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.event-item p {
  margin: 5px 0 0;
  color: #666;
}

.event-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
}

.event-image {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #333;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
}
</style>
