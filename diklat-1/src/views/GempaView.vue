<script setup>
  import CardGempa from "../components/CardGempa.vue";
  import {reactive, onMounted} from 'vue'

  const listGempa = reactive({data: {}})
  
  async function fetchData(url){
    const resp = await fetch(url)
    const json = await resp.json()
    return json;
  }

  onMounted(async () => {
    listGempa.data = await fetchData("https://data1.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json") //Fetch daftar 15 gempa yang diraskaan 
    listGempa.data = listGempa.data['Infogempa']['gempa']
  })
  
</script>

<template>
  <main>
    <CardGempa
    v-for="(gempa, index) in listGempa.data"
    :key="index"
    :gempa="gempa" 
    />
  </main>
</template>
