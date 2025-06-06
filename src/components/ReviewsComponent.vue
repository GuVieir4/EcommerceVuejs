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
  <section v-if="produto" class="w-full py-[96px] px-[24px] md:px-[160px]">
    <h2 class="text-[32px] md:text-[40px] font-bold text-gray-900 mb-[48px] text-center">
      User Reviews
    </h2>

    <div class="flex flex-wrap justify-center gap-[32px]">
      <div class="bg-[#191919] border border-[#2c2c2c] rounded-[16px] shadow-md w-full max-w-[360px] p-[32px] flex flex-col gap-[24px] transition-all hover:shadow-xl hover:scale-[1.015]">
        <div class="flex items-center gap-[16px]">
          <div class="w-[48px] h-[48px] rounded-full bg-[#2e2e2e] flex items-center justify-center text-white text-[18px] font-semibold">
            {{ produto.reviews[0].reviewerName.charAt(0).toUpperCase() }}
          </div>
          <div class="flex flex-col">
            <span class="text-white text-[18px] font-bold">{{ produto.reviews[0].reviewerName }}</span>
            <span class="text-[#f4f4f4] text-sm">⭐ {{ produto.reviews[0].rating }}/5</span>
          </div>
        </div>
        <p class="text-[#a7a7a7] text-[16px] italic">
          "{{ produto.reviews[0].comment }}"
        </p>
      </div>

      <div class="bg-[#191919] border border-[#2c2c2c] rounded-[16px] shadow-md w-full max-w-[360px] p-[32px] flex flex-col gap-[24px] transition-all hover:shadow-xl hover:scale-[1.015]">
        <div class="flex items-center gap-[16px]">
          <div class="w-[48px] h-[48px] rounded-full bg-[#2e2e2e] flex items-center justify-center text-white text-[18px] font-semibold">
            {{ produto.reviews[1].reviewerName.charAt(0).toUpperCase() }}
          </div>
          <div class="flex flex-col">
            <span class="text-white text-[18px] font-bold">{{ produto.reviews[1].reviewerName }}</span>
            <span class="text-[#f4f4f4] text-sm">⭐ {{ produto.reviews[1].rating }}/5</span>
          </div>
        </div>
        <p class="text-[#a7a7a7] text-[16px] italic">
          "{{ produto.reviews[1].comment }}"
        </p>
      </div>

      <div class="bg-[#191919] border border-[#2c2c2c] rounded-[16px] shadow-md w-full max-w-[360px] p-[32px] flex flex-col gap-[24px] transition-all hover:shadow-xl hover:scale-[1.015]">
        <div class="flex items-center gap-[16px]">
          <div class="w-[48px] h-[48px] rounded-full bg-[#2e2e2e] flex items-center justify-center text-white text-[18px] font-semibold">
            {{ produto.reviews[2].reviewerName.charAt(0).toUpperCase() }}
          </div>
          <div class="flex flex-col">
            <span class="text-white text-[18px] font-bold">{{ produto.reviews[2].reviewerName }}</span>
            <span class="text-[#f4f4f4] text-sm">⭐ {{ produto.reviews[2].rating }}/5</span>
          </div>
        </div>
        <p class="text-[#a7a7a7] text-[16px] italic">
          "{{ produto.reviews[2].comment }}"
        </p>
      </div>
    </div>
  </section>
</template>

