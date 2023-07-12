<script setup>
import {onMounted, watch} from 'vue';

const props = defineProps(['infoGempa']);
var map;

onMounted(()=>{
    map = L.map("map").setView([-7.32 , 110.5], 4);
    L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
        maxZoom: 19,
        attribution: "&copy; BMKG",
    }
    ).addTo(map);
});

watch(() => props.infoGempa, (newVar, oldVar) => {
    let coord = props.infoGempa['Infogempa']['gempa']['Coordinates'].split(',')
    var marker = L.marker(coord).addTo(map);
})


</script>
<template lang="">
    <div class="gempa p-3 mb-4">
        <div class="card p-2 rounded shadow">
            <div class="text-center fw-bold">Gempabumi Dirasakan</div>
            <div class="mb-2 text-center" v-if="infoGempa['Infogempa']">{{infoGempa['Infogempa']['gempa']['Tanggal']}} {{infoGempa['Infogempa']['gempa']['Jam']}}</div>
            <div id="map"></div>
            <div class="d-flex flex-row justify-content-around p-2">
                <div>
                    <img
                        src="https://warning.bmkg.go.id/img/magnitude.png"
                        alt="Magnitudo"
                        width="26"
                        height="26"
                    /> 
                    <strong class="ms-2" v-if="infoGempa['Infogempa']">{{infoGempa['Infogempa']['gempa']['Magnitude']}}</strong><br/><span> Magnitudo</span>
                </div>
                <div>
                    <img
                        src="https://warning.bmkg.go.id/img/kedalaman.png"
                        alt="Kedalaman"
                        width="26"
                        height="26"
                    />
                <strong class="ms-2" v-if="infoGempa['Infogempa']">{{infoGempa['Infogempa']['gempa']['Kedalaman']}}</strong> <br/><span> Kedalaman</span>
                </div>
                <div>
                    <img
                        src="https://warning.bmkg.go.id/img/koordinat.png"
                        alt="Koordinat"
                        width="26"
                        height="26"
                    />
                    <strong v-if="infoGempa['Infogempa']">{{infoGempa['Infogempa']['gempa']['Lintang']}}<br/>{{infoGempa['Infogempa']['gempa']['Bujur']}}</strong>
                </div>
            </div>
        </div>
    </div>
</template>

