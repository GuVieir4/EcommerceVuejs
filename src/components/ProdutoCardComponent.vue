<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Toast from './ToastComponent.vue'

const router = useRouter()

const { produto } = defineProps({
  produto: Object
})

const isFavorite = ref(false)
const showToast = ref(false)
const toastMessage = ref("")

const botaoFavorito = () => {
  isFavorite.value = !isFavorite.value
  toastMessage.value = isFavorite.value
    ? `Produto "${produto.name}" adicionado aos favoritos!`
    : `Produto "${produto.name}" removido dos favoritos.`
  showToast.value = true
}

const irParaDetalhes = () => {
  router.push(`/produto/${produto.id}`)
}
</script>

<template>
  <section>
    <Toast :model-value="showToast" :message="toastMessage" />
    <div
      class="card-produto group bg-[#f6f6f6] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden cursor-pointer flex flex-col h-full relative">

      <button @click.stop="botaoFavorito"
        class="absolute top-1 right-2 z-10 text-[20px] text-gray-400 hover:text-red-500 transition-colors p-3 rounded-full bg-transparent">
        <i :class="isFavorite ? 'fas fa-heart text-red-500' : 'far fa-heart'"></i>
      </button>

      <div class="p-4 pt-10 relative">
        <img :src="produto.image" :alt="produto.title"
          class="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out mb-4">
      </div>

      <div class="p-4 flex flex-col flex-grow">
        <h2 class="text-lg font-semibold text-gray-800 mb-1 truncate text-center">{{ produto.name }}</h2>
        <p class="text-xl font-bold mb-4 mt-auto">${{ produto.price }}</p>
        <p class="text-[12px] text-gray-400">{{ produto.stock }} em estoque</p>
        <button @click="irParaDetalhes"
          class="bg-[#000] rounded-[8px] gap-[8px] flex justify-center items-center py-2 px-4 mt-2 text-gray-100">
          Buy Now
        </button>
      </div>
    </div>
  </section>
</template>
