import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('main', () => {
  const cart = ref([])
  const searchQuery = ref('')
  const categories = ref([])

  const addToCart = (product) => {
    const item = cart.value.find((i) => i.id === product.id)
    if (item) {
      item.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (id) => {
    cart.value = cart.value.filter((item) => item.id !== id)
  }

  const updateQuantity = (id, quantity) => {
    const item = cart.value.find((i) => i.id === id)
    if (item) item.quantity = quantity
  }

  const fetchCategories = async () => {
    const res = await fetch('https://dummyjson.com/products/categories')
    const data = await res.json()
    categories.value = data
  }

  return {
    cart,
    searchQuery,
    categories,
    addToCart,
    removeFromCart,
    updateQuantity,
    fetchCategories,
  }
})
