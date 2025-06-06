<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const produto = ref(null)

onMounted(async () => {
    const id = route.params.id
    const response = await axios.get(`https://dummyjson.com/products/${id}`)
    produto.value = response.data
})
</script>

<template>
  <body class="text-gray-900">
    <section
      class="grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 md:px-16 lg:px-32 py-20 max-w-[1440px] mx-auto items-center"v-if="produto">
      <div class="relative rounded-2xl overflow-hidden bg-white p-6 flex justify-center items-center border border-gray-200">
        <img :src="produto.images[0]" :alt="produto.title" class="w-full max-w-md h-auto object-contain transition-transform duration-300 hover:scale-105 "/>
      </div>

      <aside class="backdrop-blur-xl bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-8 border border-gray-200">
        <h1 class="text-[32px] md:text-[40px] font-bold tracking-tight leading-tight text-[#1d1d1d]">
          {{ produto.title }}
        </h1>

        <div class="flex items-center gap-4 flex-wrap">
          <span class="text-3xl font-semibold text-gray-900">${{ produto.price }}</span>
          <span
            v-if="produto.discountPercentage > 0"
            class="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-md">
            {{ Math.floor(produto.discountPercentage) }}% OFF
          </span>
        </div>

        <span v-if="produto.stock" class="text-xs font-bold font-medium px-3 py-2 rounded-md w-1/4 text-center"
            :class="produto.stock > 10 ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'">
            {{ produto.stock }} em estoque
        </span>

        <div class="flex gap-3 flex-wrap">
            <span class="uppercase bg-black text-white text-xs px-7 py-5 rounded-md tracking-wide shadow-md hover:scale-105">{{ produto.tags[0] }}</span>
            <span class="uppercase bg-black text-white text-xs px-7 py-5 rounded-md tracking-wide shadow-md hover:scale-105">{{ produto.tags[1] }}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            class="flex items-center gap-4 p-4 bg-[#f9f9f9] rounded-lg border border-gray-300 hover:scale-105">
            <i class="fa-solid fa-ruler-combined text-xl text-[#034559]"></i>
            <div>
              <p class="text-gray-500 text-sm">Width</p>
              <p class="font-semibold">{{ produto.dimensions.width }}</p>
            </div>
          </div>
          <div
            class="flex items-center gap-4 p-4 bg-[#f9f9f9] rounded-lg border border-gray-300 hover:scale-105">
            <i class="fa-solid fa-ruler-vertical text-xl text-[#034559]"></i>
            <div>
              <p class="text-gray-500 text-sm">Height</p>
              <p class="font-semibold">{{ produto.dimensions.height }}</p>
            </div>
          </div>
          <div
            class="flex items-center gap-4 p-4 bg-[#f9f9f9] rounded-lg border border-gray-300 hover:scale-105">
            <i class="fa-solid fa-cube text-xl text-[#034559]"></i>
            <div>
              <p class="text-gray-500 text-sm">Depth</p>
              <p class="font-semibold">{{ produto.dimensions.depth }}</p>
            </div>
          </div>
        </div>

        <p class="text-gray-600 text-sm leading-relaxed border-l-4 border-[#034559] pl-4 italic">
          {{ produto.description }}
        </p>

        <div class="flex gap-4 flex-wrap mt-4 w-full">
        <RouterLink to="/">
          <button class="border border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-900 hover:text-white hover:scale-105 transition-all duration-200">
            Back to Home
          </button>
        </RouterLink>
          <button class="bg-[#034559] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            Add to Cart
          </button>
        </div>
      </aside>
    </section>
  </body>
</template>
