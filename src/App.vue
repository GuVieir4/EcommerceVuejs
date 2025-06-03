<script setup>
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  <NavbarComponent/>
    <div class="container mx-auto px-4 py-6">
      <router-view></router-view>
    </div>
  <FooterComponent/>
</template>