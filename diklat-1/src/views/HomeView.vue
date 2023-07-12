<script setup>
  import Cuaca from '../components/Cuaca.vue';
  import Gempa from '../components/Gempa.vue';
  import { reactive, onBeforeMount } from 'vue';

  const infoGempa = reactive({data: {}});

  async function fetchGempa() {
    const response = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");
    const gempa = await response.json();
    infoGempa.data = gempa;
    console.log(infoGempa.data)
  }

  onBeforeMount(async () => {
    await fetchGempa();
  });

</script>

<template>
  <main>
    <Cuaca/>
    <Gempa :infoGempa="infoGempa.data"/>
  </main>
</template>
