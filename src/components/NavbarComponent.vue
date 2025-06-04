<template>
  <nav class="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
    <div class="flex items-center gap-4">
      <button @click="toggleMenu" class="md:hidden">
        <Menu class="w-6 h-6" />
      </button>
      <router-link to="/" class="text-2xl font-bold tracking-wide hover:text-gray-200">
        Kirashop
      </router-link>
    </div>

    <!-- Links Desktop -->
    <ul class="hidden md:flex gap-8 items-center">
      <li><router-link to="/" class="flex items-center gap-1 hover:text-gray-200"><Home class="w-5 h-5" /> Início</router-link></li>
      <li class="relative group">
        <button class="flex items-center gap-1 hover:text-gray-200">
          <LayoutGrid class="w-5 h-5" /> Categorias
        </button>
        <ul class="absolute top-8 left-0 bg-white text-black shadow-md rounded-md p-2 hidden group-hover:block z-50">
          <li v-for="cat in categories" :key="cat" class="hover:bg-gray-200 rounded px-2 py-1">
            <router-link :to="`/categoria/${cat}`" class="capitalize">{{ cat }}</router-link>
          </li>
        </ul>
      </li>
      <li><router-link to="/sobre" class="flex items-center gap-1 hover:text-gray-200"><Info class="w-5 h-5" /> Sobre</router-link></li>
      <li><router-link to="/contato" class="flex items-center gap-1 hover:text-gray-200"><Phone class="w-5 h-5" /> Contato</router-link></li>
    </ul>

    <!-- Busca + Carrinho -->
    <div class="flex items-center gap-6">
      <!-- Busca -->
      <div class="relative">
        <input
          v-model="store.searchQuery"
          @keyup.enter="goToSearch"
          type="text"
          placeholder="Buscar..."
          class="px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button @click="goToSearch" class="absolute right-2 top-1/2 -translate-y-1/2 text-black">
          <Search class="w-5 h-5" />
        </button>
      </div>

      <!-- Carrinho -->
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

  <!-- Mobile Menu -->
  <div v-if="isMenuOpen" class="md:hidden bg-blue-700 text-white px-6 py-4">
    <ul class="flex flex-col gap-4">
      <li><router-link to="/" @click="toggleMenu">Início</router-link></li>
      <li>
        <details class="group">
          <summary class="flex items-center gap-1 cursor-pointer">
            Categorias
            <ChevronDown class="w-4 h-4 group-open:rotate-180 transition-transform" />
          </summary>
          <ul class="mt-2 ml-4 flex flex-col gap-2">
            <li v-for="cat in categories" :key="cat">
              <router-link :to="`/categoria/${cat}`" class="capitalize" @click="toggleMenu">{{ cat }}</router-link>
            </li>
          </ul>
        </details>
      </li>
      <li><router-link to="/sobre" @click="toggleMenu">Sobre</router-link></li>
      <li><router-link to="/contato" @click="toggleMenu">Contato</router-link></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/useStore'

// Ícones
import { Home, LayoutGrid, Info, Phone, Search, ShoppingCart, Menu, ChevronDown } from 'lucide-vue-next'

const store = useStore()
const router = useRouter()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
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

onMounted(() => {
  store.fetchCategories()
})
</script>
