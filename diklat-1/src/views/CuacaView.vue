<script setup>
import CardCuaca from "../components/CardCuaca.vue";
import { cuacaStore } from "../store";
</script>

<template>
  <main>
    <h1 v-if="!cuacaStore.data" class="text-center">
      Silahkan pilih lokasi terlebih dahulu!
    </h1>
    <CardCuaca
      v-else
      v-for="(cuaca, index) in cuacaStore.data['result']"
      :key="index"
      :cuaca="cuaca"
    />
    <!-- CardCuaca di atas akan dirender sebanyak jumlah elemen pada cuacaStore.data.

        :key sebaiknya tetap ditulis karena vue akan menandai komponen tersebut dengan index sehingga ketika data berubah vue dapat mengetahui 
        data apa yang berubah

        :cuaca adalah props yang dikirim ke CardCuaca
    -->
  </main>
</template>
