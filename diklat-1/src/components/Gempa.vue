<script setup>
import { watch } from "vue";

const props = defineProps(["infoGempa"]); //Definisikan props yang diterima dari parent komponen sebelumnya
var map; //Definisi variable map untuk menampung map milik leaflet

watch(
  () => props.infoGempa, //Variabel yang dilihat oleh fungsi
  (newVar, oldVar) => {
    let coord = props.infoGempa["coordinates"].split(",");
    map = L.map("map").setView([coord[1], coord[0]], 4);
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution: "&copy; BMKG",
      }
    ).addTo(map);
    var marker = L.marker([coord[1], coord[0]]).addTo(map);
  }
);
// Fungsi watch akan dijalankan argumen pertama fungsi "()=>props.infoGempa" berubah.
// Jadi fungsi watch adalah sebuah fungsi yang akan tertrigger ketika variabel yang dilihat berubah
</script>
<template lang="">
  <div class="gempa p-3 mb-4">
    <div class="card p-2 rounded shadow">
      <div class="text-center fw-bold">Gempabumi Dirasakan</div>
      <div class="mb-2 text-center">
        {{ infoGempa["date"] }}
        <!--Untuk mengakses data infoGempa-->
      </div>
      <div id="map"></div>
      <div class="d-flex flex-row justify-content-around p-2">
        <div>
          <img
            src="https://warning.bmkg.go.id/img/magnitude.png"
            alt="Magnitudo"
            width="26"
            height="26"
          />
          <strong class="ms-2">{{ infoGempa["magnitude"] }}</strong
          ><br /><span> Magnitudo</span>
        </div>
        <div>
          <img
            src="https://warning.bmkg.go.id/img/kedalaman.png"
            alt="Kedalaman"
            width="26"
            height="26"
          />
          <strong class="ms-2">{{ infoGempa["depth"] }}</strong>
          <br /><span> Kedalaman</span>
        </div>
        <div>
          <img
            src="https://warning.bmkg.go.id/img/koordinat.png"
            alt="Koordinat"
            width="26"
            height="26"
          />
          <strong>{{ infoGempa["latitude"] }}<br />{{infoGempa["longitude"]}}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
