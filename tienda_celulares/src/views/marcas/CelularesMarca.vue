<template>
    <div>
        <h1>Lista de Celulares de la Marca {{ $route.params.id }}</h1>        
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemList" :key="index">
                    <td>{{ 1 + index }}</td>
                    <td>{{ item.nombre }}</td>
                    <td>{{ marcas[item.marca] || 'Cargando...' }}</td> 
                    <td>{{ item.stock }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'

export default {
    name: 'Celulares',
    data() {
        return {
            currentPage: 1,
            totalPages: 100, 
            itemList: [], 
            marcas: {} 
        }
    },
    components: {
        Modal
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
            const marcaId = this.$route.params.id;
            const vm = this;
            this.axios.get(this.baseUrl + "/celulares?marca=" + marcaId)
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
