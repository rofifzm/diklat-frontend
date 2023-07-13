<script setup>
import {ref, reactive, onMounted} from 'vue';
import {cuacaStore} from '../store';

const lokasi = ref('Pilih Provinsi')
const submitted = ref(false); //Kondisi submit

const inputOptions = reactive({
    data: {
        provinsi: null,
        kabupaten: null,
        kecamatan: null,
        selectInput:[],
    }
});

const cuaca = reactive({data: null})

async function fetchData(url){
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

onMounted(async ()=>{
    inputOptions.data['selectInput'] = await fetchData('/lokasi.json');

})

async function ubahLokasi(){
    if (inputOptions.data['provinsi'] == null) {
        inputOptions.data['provinsi'] = lokasi.value
        inputOptions.data['selectInput'] = await fetchData('/kabupaten.json');
        lokasi.value = 'Pilih Kab'
    }
    else if (inputOptions.data['kabupaten'] == null) {
        inputOptions.data['kabupaten'] = lokasi.value
        inputOptions.data['selectInput'] = await fetchData('/kecamatan.json');
        lokasi.value = 'Pilih Kec'
    }
    else if (inputOptions.data['kecamatan'] == null) {
        inputOptions.data['kecamatan'] = lokasi.value
        lokasi.value = inputOptions.data['kabupaten'] + ', ' + inputOptions.data['kecamatan'][1]
        console.log(inputOptions.data)
    }
}

const indexCuaca = ref(); //Index array cuaca 

async function submitLokasi(){
    submitted.value = true
    cuaca.data = await fetchData('/cuaca.json')
    cuaca.data = cuaca.data['result'].filter((cuaca) => cuaca['idKec'] == inputOptions.data.kecamatan[0])
    indexCuaca.value = pilihWaktu();
    cuacaStore.data = cuaca.data
}

async function aturUlang(){
    inputOptions.data['provinsi'] = null 
    inputOptions.data['kabupaten'] = null 
    inputOptions.data['kecamatan'] = null
    lokasi.value = 'Pilih Lokasi'
    cuaca.data = null
    submitted.value = false
    inputOptions.data['selectInput'] = await fetchData('/lokasi.json');
    console.log(cuaca.data)
}

function pilihWaktu(){
    const now = new Date();
    const index = Math.floor(now.getHours()-1, 3) - 1
    if (index <= 0) return 0
    return index
}

</script>
<template lang="">
    <div class="container">
        <div class="card p-2 d-flex flex-col text-center shadow rounded ">
            <h5>Pilih Lokasi</h5>
            <div class="mb-3 d-flex flex-row">
<select v-model="lokasi" @change='ubahLokasi' class="form-control me-2" name="" id="">
    <option disabled selected>{{lokasi}}</option>
    <option v-if="!inputOptions.data['provinsi']" v-for="(prov, item) in inputOptions.data['selectInput']" :value="prov['prov']">{{prov['prov']}}</option>
    <option v-else-if="!inputOptions.data['kabupaten']" v-for="(kab, item) in inputOptions.data['selectInput']" :value="kab['kabkota']">{{kab['kabkota']}}</option>
    <option v-else v-for="(kec, item) in inputOptions.data['selectInput']"  :value="[kec['id'], kec['kec']]">{{kec['kec']}}</option>
</select>
                <button v-if="inputOptions.data['kecamatan'] && submitted == false" type="button"  @click="submitLokasi" class="btn btn-primary">Submit</button>
                <button v-else type="button" class="btn btn-primary" :class="{'w-100': submitted}" @click="aturUlang" >Reset</button>
            </div>
        </div>
        
        <div class="card p-2 d-flex flex-col text-center shadow rounded mt-3" v-if="cuaca.data">
            <div class="fw-bold">{{cuaca.data[indexCuaca]['kecamatan']}}</div>
            <div>{{cuaca.data[indexCuaca]['hari']}} {{cuaca.data[indexCuaca]['jam']}}</div>
            <img
                class=" mx-auto d-block img-cuaca"
                :src="cuaca.data[indexCuaca]['img']"
                alt="icon-cuaca"
            />
            <div class="m-2">{{cuaca.data[indexCuaca]['weatherInfo']}}</div>
            <div>{{cuaca.data[indexCuaca]['t']}}<span>&#176;</span>C {{cuaca.data[indexCuaca]['hu']}}%</div>
        </div>
    </div>
</template>
