<template>
    <div>
      <h1>Registrar Marca</h1>
      <form @submit.prevent="submitForm()">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" id="name" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }"
            placeholder="Ingrese el nombre" />
          <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
          <label for="procedencia">Procedencia:</label>
          <input type="text" id="procedencia" v-model="form.procedencia" :class="{ 'is-invalid': errors.procedencia }"
            placeholder="Ingrese la procedencia de la marca" />
          <div v-if="errors.procedencia" class="invalid-feedback">{{ errors.procedencia }}</div>
        </div>
        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
    </div>
  </template>
    
  <script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    name: 'RegisterMarca',
    data() {
      return {
        form: {
          nombre: '',
          procedencia: ''
        },
        errors: {}
      };
    },
    methods: {
      ...mapActions(['increment']),
      validateForm() {
        this.errors = {};
  
        if (!this.form.nombre) {
          this.errors.nombre = 'El nombre es obligatorio.';
        }
        
        if (!this.form.procedencia) {
          this.errors.procedencia = 'La procedencia es obligatoria.';
        }
  
        return Object.keys(this.errors).length === 0;
      },
  
      submitForm() {
        if (this.validateForm()) {
          // Enviar los datos al servidor
          this.save();
          // Reiniciar el formulario
          this.form = {
            nombre: '',
            procedencia: ''
          };
        }
      },
      save() {
        const vm = this;
        this.axios.post(this.baseUrl + "/marcas", this.form)
          .then(function (response) {
            if (response.status == '201') {
              vm.$emit('on-register', response.data);
            }
            console.log(response);
            vm.itemList = response.data;
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },
    computed: {
      // propiedades computadas que dependen de otras propiedades reactivas
      ...mapState(['count']),
      ...mapGetters(['doubleCount', 'getBaseUrl']),
      baseUrl() {
        return this.getBaseUrl
      }
    },
  }
  </script>
    
  <style scoped></style>
    