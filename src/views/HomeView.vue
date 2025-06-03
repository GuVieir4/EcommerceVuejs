<template>
    <div>
        <h1 class="text-3xl font-bold text-center mb-6">Homepage</h1>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <produtoCard v-for = "p in produtos" :key="p.name" :produto="p" />
        </div>

        <div class="flex justify-center gap-4 mt-6">
            <button @click="previousPage" class="btn bg-[#10427E] text-[#FFCC01] font-bold px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50" :disabled="offset === 0">Anterior</button>
            <button @click="nextPage" class="btn bg-[#10427E] text-[#FFCC01] font-bold px-4 py-2 rounded hover:bg-blue-700">Próximo</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import produtoCard from '../components/ProdutoCardComponent.vue'

const offset = ref(0)
const limit = 12

const produtos = ref([])

const fetchprodutos = async () => {
    const response = await axios.get(`https://dummyjson.com/products?skip=${offset.value}&limit=${limit}`)
    const results = response.data.products

    produtos.value = results.map(p => ({
        id: p.id,
        name: p.title,
        description: p.description,
        price: p.price,
        rating: p.rating,
        stock: p.stock,
        tags: p.tags?.[0] || '',
        image: p.images?.[0] || ''
    }))
}

const nextPage = () => {
    offset.value += limit
    fetchprodutos()
}

const previousPage = () => {
    if (offset.value >= limit) {
        offset.value -= limit
        fetchprodutos()
    }
}

onMounted(fetchprodutos)
</script>
