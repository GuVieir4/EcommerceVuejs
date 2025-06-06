<template>
  <nav class="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
    <div class="flex items-center gap-4">
      <button @click="toggleMenu" class="md:hidden">
        <Menu class="w-6 h-6" />
      </button>
      <router-link to="/" class="hidden lg:block text-2xl font-bold tracking-wide hover:text-gray-200">
        Kirashop
      </router-link>
    </div>
    
    <ul class="hidden md:flex gap-8 items-center">
      <li><router-link to="/" class="flex items-center gap-1 hover:text-gray-200"><Home class="w-5 h-5" /> Home</router-link></li>
      <li><router-link to="/sobre" class="flex items-center gap-1 hover:text-gray-200"><Info class="w-5 h-5" /> About Us</router-link></li>
      <li><router-link to="/contato" class="flex items-center gap-1 hover:text-gray-200"><Phone class="w-5 h-5" /> Contact</router-link></li>
    </ul>

    <div class="flex items-center gap-6">
      <SearchBar />
      <router-link to="/carrinho" class="relative hover:text-gray-200">
        <ShoppingCart class="w-6 h-6" />
        <span
          v-if="store.cart.length > 0"
          class="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2"
        >
          {{ totalItems }}
        </span>
      </router-link>
    </div>
  </nav>
  
  <div class="bg-blue-700 text-white px-6 py-2 hidden md:block shadow-md">
    <ul class="flex gap-4 items-center overflow-x-auto">
      <li v-for="category in categories" :key="category" class="whitespace-nowrap text-white-500 text-xs rounded-md cursor-pointer hover:bg-gray-400 font-bold bg-gray-700 px-3 py-2">
        <router-link :to="`/categoria/${category}`" class="hover:text-gray-200 capitalize">
          {{ formatCategoryName(category) }}
        </router-link>
      </li>
    </ul>
  </div>

  <div v-if="isMenuOpen" class="md:hidden bg-blue-700 text-white px-6 py-4">
    <ul class="flex flex-col gap-4">
      <li><router-link to="/" @click="toggleMenu">Home</router-link></li>
      <li><router-link to="/sobre" @click="toggleMenu">About Us</router-link></li>
      <li><router-link to="/contato" @click="toggleMenu">Contact</router-link></li>
      <li class="mt-4 font-bold">Categories</li>
      <li v-for="category in categories" :key="category">
        <router-link :to="`/categoria/${category}`" @click="toggleMenu" class="capitalize">
          {{ formatCategoryName(category) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/useStore'
import SearchBar from '@/components/SearchBar.vue'
import { Home, LayoutGrid, Info, Phone, Search, ShoppingCart, Menu, ChevronDown } from 'lucide-vue-next'

const store = useStore()
const router = useRouter()

const isMenuOpen = ref(false)
const categories = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/category-list')
    const data = await response.json()
    categories.value = data
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
  }
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const formatCategoryName = (category) => {
  return category.replace(/-/g, ' ')
}

const goToSearch = () => {
  if (store.searchQuery.trim() !== '') {
    router.push({ name: 'search', query: { q: store.searchQuery } })
    isMenuOpen.value = false
  }
}

const totalItems = computed(() =>
  store.cart.reduce((acc, item) => acc + item.quantity, 0)
)
</script>

<style scoped>
.overflow-x-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>

