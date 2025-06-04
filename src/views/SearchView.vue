<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Resultado da busca por "{{ termo }}"</h1>
    <div v-if="produtos.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="produto in produtos" :key="produto.id" class="border p-4 rounded">
        <img :src="produto.thumbnail" :alt="produto.title" class="w-full h-40 object-cover mb-2" />
        <h2 class="font-semibold">{{ produto.title }}</h2>
        <p class="text-sm text-gray-600">{{ produto.description }}</p>
        <p class="text-lg font-bold">R$ {{ produto.price }}</p>
        <router-link :to="`/produto/${produto.id}`" class="text-blue-600 underline">Ver detalhes</router-link>
      </div>
    </div>
    <div v-else>
      <p>Nenhum produto encontrado para "{{ termo }}"</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const termo = ref(route.query.q || '');
const produtos = ref([]);

const buscarProdutos = async () => {
  if (termo.value) {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${termo.value}`);
    produtos.value = response.data.products;
  }
};

onMounted(() => {
  buscarProdutos();
});

// Atualiza a busca se mudar a query na URL
watch(() => route.query.q, (novo) => {
  termo.value = novo;
  buscarProdutos();
});
</script>
