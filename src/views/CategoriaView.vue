<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
  <h1 class="text-2xl font-bold mb-10">Results for: {{ categoria }}</h1>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
    <produtoCard v-for="p in produtos" :key="p.id" :produto="p" />
  </div>
  </div>
</template>



<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import produtoCard from '../components/ProdutoCardComponent.vue'

const route = useRoute();
const categoria = route.params.name;
const produtos = ref([]);

onMounted(async () => {
  const response = await axios.get(`https://dummyjson.com/products/category/${categoria}`);
  const results = response.data.products;
  produtos.value = results.map(p => ({
    id: p.id,
    name: p.title,
    description: p.description,
    price: p.price,
    rating: p.rating,
    stock: p.stock,
    tags: p.tags?.[0] || '',
    image: p.images?.[0] || ''
  }));
});


</script>
