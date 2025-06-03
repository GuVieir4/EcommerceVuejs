<template>
    <nav class="bg-blue-700 text-white py-4 px-8 flex justify-between items-center">
      <h1 class="text-lg font-bold text-gray-100">Kirashop</h1>
      <ul class="flex gap-6">
        <li><router-link to="/" href="#" class="hover:underline text-gray-gray-100">Início</router-link></li>
        <li><router-link to="/about" href="#" class="hover:underline text-gray-gray-100">Sobre</router-link></li>
        <li><router-link to="/contact" href="#" class="hover:underline text-gray-gray-100">Contato</router-link></li>
      </ul>
    </nav>
</template>