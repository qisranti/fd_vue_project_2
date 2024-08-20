<template>
    <div>
        <Modal v-model:modelValue="showModalNuevo">
            <CelularNewView @on-register="onRegister($event)" />
        </Modal>
        <Modal v-model:modelValue="showModalEdit">
            <CelularEditView @on-update="onUpdate($event)" :item="itemToEdit" />
        </Modal>
        <h1>Lista de Celulares</h1>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px">
            <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo</button>
            <div>
                <button @click="buscar()" class="btn btn-lith" style="float:right">Buscar</button>
                <input type="search" style="float:right" v-model="textToSearch" @search="buscar()">
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Stock</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemList" :key="index">
                    <td>{{ 1 + index }}</td>
                    <td>{{ item.nombre }}</td>
                    <td>{{ marcas[item.marca] || 'Cargando...' }}</td> 
                    <td>{{ item.stock }}</td>
                    <td>
                        <button @click="edit(item)" class="btn btn-dark" style="margin-right: 15px;">Editar</button>
                        <button @click="Eliminar(item.id)" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import CelularNewView from './CelularNewView.vue';
import CelularEditView from './CelularEditView.vue';

export default {
    name: 'Celulares',
    data() {
        return {
            currentPage: 1,
            totalPages: 100, 
            showModalNuevo: false,
            showModalEdit: false,
            itemToEdit: null,
            textToSearch: '',
            itemList: [], 
            marcas: {} 
        }
    },
    components: {
        Modal,
        CelularEditView,
        CelularNewView
    },
    methods: {
        ...mapActions(['increment']),
        getMarcaNombre(id) {
            if (!this.marcas[id]) {  
                this.axios.get(this.baseUrl + "/marcas/" + id)
                    .then(response => {
                        this.marcas[id] = response.data.nombre;  
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
        getList() {
            const vm = this;
            this.axios.get(this.baseUrl + "/celulares?&q=" + this.textToSearch)
                .then(response => {
                    vm.itemList = response.data;
                    vm.itemList.forEach(item => {
                        this.getMarcaNombre(item.marca);
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        },
        edit(item) {
            this.itemToEdit = Object.assign({}, item);
            this.showModalEdit = true;
        },
        Eliminar(id) {
            if (confirm("¿Está seguro de eliminar el registro?")) {
                this.axios.delete(this.baseUrl + "/celulares/" + id)
                    .then(() => {
                        this.getList();
                        this.$toast.show("Registro eliminado.", "danger");
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
        buscar() {
            this.getList();
        },
        onRegister() {
            this.getList();
            this.showModalNuevo = false;
            this.$toast.show('Registro exitoso', 'success');
        },
        onUpdate() {
            this.getList();
            this.showModalEdit = false;
            this.itemToEdit = null;
            this.$toast.show('Edición exitosa', 'info');
        },
        showToast(message, type) {
            this.$toast.show(message, type);
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
        this.getList();
    },
}
</script>

<style></style>
