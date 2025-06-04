<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Categoria: {{ categoria }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="produto in produtos" :key="produto.id" class="border p-4 rounded">
        <img :src="produto.thumbnail" :alt="produto.title" class="w-full h-40 object-cover mb-2" />
        <h2 class="font-semibold">{{ produto.title }}</h2>
        <p class="text-sm text-gray-600">{{ produto.description }}</p>
        <p class="text-lg font-bold">R$ {{ produto.price }}</p>
        <router-link :to="`/produto/${produto.id}`" class="text-blue-600 underline">Ver detalhes</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const categoria = route.params.name;
const produtos = ref([]);

onMounted(async () => {
  const response = await axios.get(`https://dummyjson.com/products/category/${categoria}`);
  produtos.value = response.data.products;
});
</script>
