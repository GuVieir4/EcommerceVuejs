<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import produtoCard from '../components/ProdutoCardComponent.vue'

const route = useRoute()
const termo = ref(route.query.q || '')
const produtos = ref([])
const filtro = ref('relevancia')

const buscarProdutos = async () => {
  if (termo.value) {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${termo.value}`)
    produtos.value = response.data.products.map(p => ({
      ...p,
      image: p.images[0] || '', 
      name: p.title,
      stock: p.stock,
      description: p.description,
    }))
    ordenarProdutos()
  }
}

const ordenarProdutos = () => {
  if (filtro.value === 'preco_asc') {
    produtos.value.sort((a, b) => a.price - b.price)
  } else if (filtro.value === 'preco_desc') {
    produtos.value.sort((a, b) => b.price - a.price)
  } else if (filtro.value === 'nome_asc') {
    produtos.value.sort((a, b) => a.title.localeCompare(b.title))
  } else if (filtro.value === 'nome_desc') {
    produtos.value.sort((a, b) => b.title.localeCompare(a.title))
  }
}

onMounted(() => {
  buscarProdutos()
})

watch(() => route.query.q, (novo) => {
  termo.value = novo
  buscarProdutos()
})

</script>

<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Results for: "{{ termo }}"</h1>

      <select
        v-model="filtro"
        @change="ordenarProdutos"
        class="ml-4 border border-gray-300 px-3 py-2 rounded bg-white text-black"
      >
        <option value="relevancia">Relevância</option>
        <option value="preco_asc">Preço: Menor ao Maior</option>
        <option value="preco_desc">Preço: Maior ao Menor</option>
        <option value="nome_asc">Nome: A - Z</option>
        <option value="nome_desc">Nome: Z - A</option>
      </select>
    </div>

    <div v-if="produtos.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <produtoCard v-for="produto in produtos" :key="produto.id" :produto="produto" />
    </div>

    <div v-else>
      <p>Nenhum produto encontrado para "{{ termo }}"</p>
    </div>
  </div>
</template>