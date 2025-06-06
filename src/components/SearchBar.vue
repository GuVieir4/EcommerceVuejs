<template>
  <div class="relative w-full max-w-md">
    <input
      type="text"
      v-model="query"
      @input="buscar"
      @keydown.enter="buscarEnter"
      class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white pr-10"
      placeholder="Buscar produtos..."
      autocomplete="off"
    />

    <button
      @click="buscarEnter"
      class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
    >
      <Search class="w-5 h-5" />
    </button>

    <ul
      v-if="sugestoes.length"
      class="absolute bg-white border border-gray-300 w-full mt-1 z-10 rounded shadow-md max-h-64 overflow-y-auto text-black"
    >
      <li
        v-for="s in sugestoes"
        :key="s.id"
        class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
        @click="selecionarSugestao(s)"
      >
        <img :src="s.thumbnail" alt="img" class="w-10 h-10 object-cover rounded" />
        <div class="flex flex-col">
          <span class="font-medium">{{ s.title }}</span>
          <span class="text-sm text-gray-500">${{ s.price }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { Search } from 'lucide-vue-next'

const query = ref('')
const sugestoes = ref([])
const router = useRouter()

const buscar = async () => {
  if (query.value.length > 1) {
    const res = await axios.get(`https://dummyjson.com/products/search?q=${query.value}`)
    sugestoes.value = res.data.products.slice(0, 5)
  } else {
    sugestoes.value = []
  }
}

const buscarEnter = () => {
  const termo = query.value.trim()
  if (termo.length > 0) {
    router.push({ path: '/search', query: { q: termo } })
    sugestoes.value = []
    query.value = ''
  }
}

const selecionarSugestao = (produto) => {
  router.push(`/produto/${produto.id}`)
  query.value = ''
  sugestoes.value = []
}
</script>
