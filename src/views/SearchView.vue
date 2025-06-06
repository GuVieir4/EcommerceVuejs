<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Search results for "{{ termo }}"</h1>
    
    <div v-if="produtos.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <produtoCard
        v-for="produto in produtos"
        :key="produto.id"
        :produto="produto"
      />
    </div>
    
    <div v-else>
      <p>No products found for "{{ termo }}"</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import produtoCard from '../components/ProdutoCardComponent.vue'

const route = useRoute();
const termo = ref(route.query.q || '');
const produtos = ref([]);

const buscarProdutos = async () => {
  if (termo.value) {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${termo.value}`);
    
    produtos.value = response.data.products.map(produto => ({
      id: produto.id,
      name: produto.title,
      price: produto.price,
      stock: produto.stock,
      image: produto.images[0]
    }));
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
