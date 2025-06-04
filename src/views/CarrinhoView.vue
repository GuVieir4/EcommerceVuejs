<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Carrinho de Compras</h1>

    <div v-if="items.length > 0" class="space-y-4">
      <div v-for="item in items" :key="item.id" class="flex items-center justify-between border p-4 rounded">
        <div class="flex items-center gap-4">
          <img :src="item.thumbnail" alt="Imagem" class="w-24 h-24 object-cover rounded" />
          <div>
            <h2 class="font-semibold">{{ item.title }}</h2>
            <p class="text-sm text-gray-600">R$ {{ item.price }} cada</p>
            <p class="text-sm text-gray-600">Subtotal: R$ {{ item.price * item.quantity }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button @click="decrementar(item.id)" class="bg-gray-300 px-2 rounded">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="incrementar(item.id)" class="bg-gray-300 px-2 rounded">+</button>
          <button @click="remover(item.id)" class="text-red-500">Remover</button>
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <div class="text-right">
          <p class="text-lg font-bold">Total: R$ {{ total }}</p>
          <button class="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700">Finalizar Compra</button>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Seu carrinho está vazio.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCarrinhoStore } from '../stores/cart';

const carrinho = useCarrinhoStore();

const items = computed(() => carrinho.items);

const total = computed(() =>
  carrinho.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

const incrementar = (id) => {
  carrinho.incrementar(id);
};

const decrementar = (id) => {
  carrinho.decrementar(id);
};

const remover = (id) => {
  carrinho.remover(id);
};
</script>
