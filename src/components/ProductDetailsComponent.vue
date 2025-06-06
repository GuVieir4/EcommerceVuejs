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

    <body class="flex flex-col items-end">
        <section
            class="flex items-center self-stretch gap-[48px] py-[112px] px-[160px] justify-center md:justify-normal"
            v-if="produto">
            <img :src="produto.images[0]" :alt="produto.title" class="w-[410px] h-[510px] object-contain">
            <aside class="flex flex-col items-start gap-[32px]">
                <div class="name">
                    <h1 class="text-gray-900 text-[40px] font-bold leading-[40px]">{{ produto.title }}</h1>
                </div>
                <div class="preco flex items-center gap-2">
                    <h1 class="text-gray-900 text-[40px] font-bold">{{ produto.price }}</h1>
                    <span v-if="produto.discountPercentage > 0"
                        class="ml-2 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">
                        {{ Math.floor(produto.discountPercentage) }}% OFF
                    </span>
                </div>
                <div class="tags flex items-center gap-[16px] self-stretch md:gap-[8px]">
                    <span
                        class="tag gap-[8px] flex justify-center items-center rounded-[8px] border border-solid border-black py-4 px-6 capitalize">{{
                        produto.tags[0] }}</span>
                    <span
                        class="tag gap-[8px] flex justify-center items-center rounded-[8px] border border-solid border-black py-4 px-6 capitalize">{{
                        produto.tags[1] }}</span>
                </div>
                <div class="infos flex gap-[16px] self-stretch flex-wrap content-start md:gap-[8px]">
                    <div
                        class="info bg-[#f4f4f4] flex min-w-[168px] gap-[8px] items-center justify-center rounded-[8px] px-2 h-[80px]">
                        <i class="fa-solid fa-expand text-[24px]"></i>
                        <div class="info flex flex-col">
                            <span class="text-[#a7a7a7] text-sm leading-[16px]">Width</span>
                            <span class="leading-[16px] text-[#4e4e4e] text-sm font-bold">{{ produto.dimensions.width
                                }}</span>
                        </div>
                    </div>
                    <div
                        class="info bg-[#f4f4f4] flex min-w-[168px] gap-[8px] items-center justify-center rounded-[8px] px-2 h-[80px]">
                        <i class="fa-solid fa-expand text-[24px]"></i>
                        <div class="info flex flex-col">
                            <span class="text-[#a7a7a7] text-sm leading-[16px]">Height</span>
                            <span class="leading-[16px] text-[#4e4e4e] text-sm font-bold">{{ produto.dimensions.height
                                }}</span>
                        </div>
                    </div>
                    <div
                        class="info bg-[#f4f4f4] flex min-w-[168px] gap-[8px] items-center justify-center rounded-[8px] px-2 h-[80px]">
                        <i class="fa-solid fa-expand text-[24px]"></i>
                        <div class="info flex flex-col">
                            <span class="text-[#a7a7a7] text-sm leading-[16px]">Depth</span>
                            <span class="leading-[16px] text-[#4e4e4e] text-sm font-bold">{{ produto.dimensions.depth
                                }}</span>
                        </div>
                    </div>
                </div>
                <div class="description">
                    <p class="self-stretch text-[#6c6c6c] text-sm leading-[24px]">{{ produto.description }}</p>
                </div>
                <div class="buttons flex items-start content-start gap-[16px] self-stretch flex-wrap">
                    <button
                        class="flex py-[16px] px-[56px] bg-transparent justify-center items-center rounded-[6px] border border-solid border-black hover:scale-105">Back
                        to Home</button>
                    <button
                        class="flex items-center justify-center rounded-[6px] bg-[#000] py-[16px] px-[56px] text-base text-[#fff] hover:scale-105">
                        Add to Cart
                    </button>
                </div>
            </aside>
        </section>
    </body>
</template>