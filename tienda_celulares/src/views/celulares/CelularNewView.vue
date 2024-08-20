<template>
    <div>
      <h1>Agregar Nuevo Celular</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" id="name" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }"
            placeholder="Ingrese el nombre" />
          <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
          
          <label for="marca">Marca:</label>
          <select id="marca" v-model="form.marca" :class="{ 'is-invalid': errors.marca }">
            <option value="" disabled>Selecciona una marca</option>
            <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
          </select>
          <div v-if="errors.marca" class="invalid-feedback">{{ errors.marca }}</div>
          
          <label for="stock">Stock:</label>
          <input type="number" id="stock" v-model="form.stock" :class="{ 'is-invalid': errors.stock }"
            placeholder="Ingrese el stock" />
          <div v-if="errors.stock" class="invalid-feedback">{{ errors.stock }}</div>
        </div>
        <button type="submit" class="btn btn-primary">Agregar</button>
      </form>
    </div>
  </template>
  
    
  <script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'AddCelular',
  data() {
    return {
      errors: {},
      marcas: [], 
      form: {
        nombre: '',
        marca: '',
        stock: ''
      }
    };
  },
  methods: {
    ...mapActions(['increment']),

    // Cargar marcas desde el servidor
    loadMarcas() {
      this.axios.get(this.baseUrl + "/marcas")
        .then(response => {
          this.marcas = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },

    validateForm() {
      this.errors = {};

      if (!this.form.nombre) {
        this.errors.nombre = 'El nombre es obligatorio.';
      }

      if (!this.form.marca) {
        this.errors.marca = 'La marca es obligatoria.';
      }

      if (!this.form.stock) {
        this.errors.stock = 'El stock es obligatorio.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        this.save();
      }
    },

    save() {
      this.axios.post(this.baseUrl + "/celulares", this.form)
        .then(response => {
          if (response.status == 201) {
            this.$emit('on-register', response.data);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl;
    }
  },
  mounted() {
    this.loadMarcas(); 
  }
}
</script>

    
  <style scoped></style>
    