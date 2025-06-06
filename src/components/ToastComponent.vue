<template>
<div v-if="visible" class="fixed top-4 z-50 right-4 w-[330px] h-[80px] rounded-lg p-3 bg-gray-300 shadow-lg overflow-hidden flex items-center justify-around gap-4" :class="{ 'opacity-0': !visible, 'opacity-100': visible }">
  <div class="absolute w-20 text-green-200">
  </div>

  <div class="w-9 h-9 flex justify-center items-center bg-green-200 rounded-full">
    <i class="fas fa-check-circle text-green-600 text-sm"></i>
  </div>

  <div class="flex flex-col justify-center items-start flex-grow">
    <p class="text-green-600 text-base font-bold m-0 cursor-default">Success</p>
    <p class="text-gray-600 text-sm m-0 cursor-default">{{ message }}</p>
  </div>

  <button class="text-gray-600 hover:text-red-500 text-base w-5 h-5 flex items-center justify-center">
    <i class="fas fa-times"></i>
  </button>
</div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: Boolean,
    message: String
})

const visible = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
    visible.value = newVal
    if (newVal) {
        setTimeout(() => {
            visible.value = false
        }, 3000)
    }
})
</script>
