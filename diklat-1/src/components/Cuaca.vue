<script setup>
import {ref, reactive, onMounted} from 'vue';

const lokasi = ref('Pilih Provinsi');

const inputCuaca = reactive({data: null});

const inputOptions = reactive({data: {
    provinsi: null, 
    kabupaten: null,
    kecamatan: null, 
    selectInput: [],
}});

async function fetchData(url){
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

async function submitLokasi(){
    if (inputOptions.data['provinsi'] == null) {
        inputOptions.data['provinsi'] = lokasi
        inputOptions.data['selectInput'] = await fetchData('/kabupaten.json');
        lokasi.value = 'Pilih Kab'
    }
    else if (inputOptions.data['kabupaten'] == null) {
        inputOptions.data['kabupaten'] = lokasi
        inputOptions.data['selectInput'] = await fetchData('/kecamatan.json');
        lokasi.value = 'Pilih Kec'
    }
    else if (inputOptions.data['kecamatan'] == null) {
        inputOptions.data['kecamatan'] = lokasi
        //getCuaca
        console.log(inputOptions)
    }
    else {
        inputOptions.data['provinsi'] == null 
        inputOptions.data['kabupaten'] == null 
        inputOptions.data['kecamatan'] == null
        inputOptions.data['selectInput'] = await fetchData('/lokasi.json');
    }

}

onMounted(async ()=>{
    inputOptions.data['selectInput'] = await fetchData('/lokasi.json');
    console.log(lokasi.value)
})

</script>
<template>
    <div class="container">
        <div class="mb-3 d-flex flex-row">
            <select class="form-control me-2" name="" id="" placeholder="">
                <option disabled selected value="">{{lokasi}}</option>
                <option v-if="!inputOptions.data['provinsi']" v-for="(prov, item) in inputOptions.data['selectInput']" :value="prov['prov']">{{prov['prov']}}</option>
                <option v-else-if="!inputOptions.data['kabupaten']" v-for="(prov, item) in inputOptions.data['selectInput']" :value="prov['prov']">{{prov['prov']}}</option>
            </select>
            <button type="button"  @click="submitLokasi" class="btn btn-primary">Submit</button>
        </div>
        
        <div
        class="card p-2 d-flex flex-col text-center shadow rounded "
        >
            <div class="fw-bold">Kemayoran</div>
            <div>13:00</div>
            <img
                class=" mx-auto d-block img-cuaca"
                src="https://bmkg.go.id/asset/img/icon-cuaca/cerah%20berawan-am.png"
                alt="icon-cuaca"
            />
            <div class="m-2">Cerah Berawan</div>
            <div>27<span>&#176;</span>C 100%</div>
        </div>
    </div>
</template>
