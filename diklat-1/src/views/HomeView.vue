<script setup>
import Cuaca from "../components/Cuaca.vue";
import Gempa from "../components/Gempa.vue";
import { reactive, onBeforeMount } from "vue";

const infoGempa = reactive({ data: {} });
const apiGempa = "https://training28.devbmkg.my.id/gempa-terbaru";

async function fetchGempa(url) {
  const response = await fetch(url);
  const gempa = await response.json();
  infoGempa.data = gempa;
} //Fungsi fetchGempa melakukan fetch data gempa dari url

onBeforeMount(async () => {
  await fetchGempa(apiGempa);
});

</script>

<template>
  <main>
    <Cuaca />
    <Gempa :infoGempa="infoGempa.data" /> 
    <!--  :infoGempa="infoGempa.data" adalah props yang dikirim ke komponen Gempa.vue
          nama variabelnya adalah infoGempa, variabel yang dikirim adalah infoGempa.data
    -->
  </main>
</template>
