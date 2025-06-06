<template>
  <div class="container mx-auto px-4">
    <!-- Banner de Marketing -->
    <section
      class="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between shadow-lg">
      <div class="max-w-xl">
        <h2 class="text-4xl md:text-5xl font-extrabold mb-4 text-white">
          Special Offers at Kirashop
        </h2>
        <p class="text-lg text-blue-100 mb-6">
          The best products at incredible prices. Buy now!
        </p>
        <router-link
          to="/categoria/sale"
          class="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9" />
          </svg>
          See Offers
        </router-link>
      </div>
      <img
        src="/src/images/promo-remove.png"
        alt="Banner promoção"
        class="w-80 md:w-[400px]"
      />
    </section>

    <!-- Seção de Produtos -->
    <section>
      <h1 class="text-3xl font-bold text-center mb-6">
        Featured Products
      </h1>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <produtoCard
          v-for="p in produtos"
          :key="p.id"
          :produto="p"
        />
      </div>

      <!-- Paginação -->
      <div class="flex justify-center gap-4 mt-8">
        <button
          @click="previousPage"
          class="inline-flex items-center gap-2 bg-blue-800 text-yellow-400 font-semibold px-5 py-2 rounded hover:bg-blue-900 disabled:opacity-50"
          :disabled="offset === 0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          @click="nextPage"
          class="inline-flex items-center gap-2 bg-blue-800 text-yellow-400 font-semibold px-5 py-2 rounded hover:bg-blue-900"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import produtoCard from '../components/ProdutoCardComponent.vue'

const offset = ref(0)
const limit = 10

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

