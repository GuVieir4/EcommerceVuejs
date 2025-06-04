import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCarrinhoStore = defineStore('carrinho', () => {
  const items = ref([]);

  const adicionar = (produto) => {
    const existe = items.value.find((p) => p.id === produto.id);
    if (existe) {
      existe.quantity += 1;
    } else {
      items.value.push({ ...produto, quantity: 1 });
    }
  };

  const remover = (id) => {
    items.value = items.value.filter((p) => p.id !== id);
  };

  const incrementar = (id) => {
    const item = items.value.find((p) => p.id === id);
    if (item) item.quantity += 1;
  };

  const decrementar = (id) => {
    const item = items.value.find((p) => p.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    } else {
      remover(id);
    }
  };

  return { items, adicionar, remover, incrementar, decrementar };
});
