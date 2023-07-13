<script setup>
import CardCuaca from "../components/CardCuaca.vue";
import { cuacaStore } from "../store";
console.log(cuacaStore.data);
</script>

<template>
  <main>
    <CardCuaca
      v-for="(cuaca, index) in cuacaStore.data"
      :key="index"
      :cuaca="cuaca"
    />
  </main>
</template>
