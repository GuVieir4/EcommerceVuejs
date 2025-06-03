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
    <section class="reviews" v-if="produto">
        <div class="cards-reviews flex flex-wrap gap-[24px] justify-center">
            <div class="card-review flex w-[30%] h-auto flex-col gap-[24px] items-start justify-center py-[32px] px-[42px]
            rounded-[16px] bg-[#191919]">
                <div class="info-reviewer flex flex-col items-center gap-[16px]">
                    <h1 class="self-stretch text-[20px] font-bold text-gray-100">{{ produto.reviews[0].reviewerName }}
                    </h1>
                    <span class="self-stretch text-[20px] gap-[12px] text-gray-100 font-bold">⭐ {{
                        produto.reviews[0].rating }}</span>
                </div>
                <p class="comment text-[20px] leading-[28px] self-stretch text-gray-100">{{ produto.reviews[0].comment
                }}</p>
            </div>
            <div class="card-review flex w-[30%] h-auto flex-col gap-[24px] items-start justify-center py-[32px] px-[42px]
            rounded-[16px] bg-[#191919]">
                <div class="info-reviewer flex flex-col items-center gap-[16px]">
                    <h1 class="self-stretch text-[20px] font-bold text-gray-100">{{ produto.reviews[1].reviewerName }}
                    </h1>
                    <span class="self-stretch text-[20px] gap-[12px] text-gray-100 font-bold">⭐ {{
                        produto.reviews[1].rating }}</span>
                </div>
                <p class="comment text-[20px] leading-[282x] self-stretch text-gray-100">{{ produto.reviews[1].comment
                }}</p>
            </div>
            <div class="card-review flex w-[30%] h-auto flex-col gap-[24px] items-start justify-center py-[32px] px-[42px]
            rounded-[16px] bg-[#191919]">
                <div class="info-reviewer flex flex-col items-center gap-[16px]">
                    <h1 class="self-stretch text-[20px] font-bold text-gray-100">{{ produto.reviews[2].reviewerName }}
                    </h1>
                    <span class="self-stretch text-[20px] gap-[12px] text-gray-100 font-bold">⭐ {{
                        produto.reviews[2].rating }}</span>
                </div>
                <p class="comment text-[20px] leading-[28px] self-stretch text-gray-100">{{ produto.reviews[2].comment
                }}</p>
            </div>
        </div>
    </section>
</template>