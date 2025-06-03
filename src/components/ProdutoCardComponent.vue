<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const { produto } = defineProps({
  produto: Object
})

const irParaDetalhes = () => {
  router.push(`/produto/${produto.id}`)
}
</script>

<template>
  <section class="products flex flex-col items-start selft-stretch gap-[32px]">
    <div class="cards-produtos flex gap-[16px] flex-wrap self-strech content-start items-start">
      <div class="card-produto bg-[#f6f6f6] flex min-w-[200px] flex-col items-center gap-[16px] rounded-[9px] py-[24px] px-[16px]">
        <i class="fa-regular fa-heart flex justify-end items-center gap-[8px] selft-stretch"></i>
        <img :src="produto.image" :alt="produto.title" class="w-[160px] h-[160px]">
        <h2 class="text-center text-[16px] font-medium leading-[24px] text-[#000]">{{ produto.name }}</h2>
        <h1 class="text-[#000] selft-strech text-center text-[24px] font-semibold leading-[24px]">${{ produto.price }}</h1>
        <button @click="irParaDetalhes" class="bg-[#000] rounded-[8px] gap-[8px] flex justify-center items-center py-[12px] px-[64px] text-gray-100">Buy Now</button>
      </div>
    </div>
  </section>
</template>