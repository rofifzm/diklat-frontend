<script setup>
import { ref, reactive, onMounted } from "vue";
import { cuacaStore } from "../store";  // Store merupakan sebuah mekanisme data management pada VUE untuk pertukaran data antar komponen
// Jadi dengan store setiap komponen dapat mengakses data yang sama

const lokasi = ref("Pilih Provinsi"); //Variabel untuk teks yang ditampilkan pada input 
const submitted = ref(false); //Kondisi submit

const inputOptions = reactive({
    provinsi: null,
    kabupaten: null,
    kecamatan: null,
    selectInput: [], //pilihan menu select
}); //Variabel untuk menyimpan lokasi yang telah dipilih oleh user

const cuaca = reactive({ data: null }); //Data cuaca prediksi 

async function fetchData(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
} //Fetch data pada API

onMounted(async () => {
  inputOptions.selectInput = await fetchData("https://training00.devbmkg.my.id/lokasi");
}); //Fungsi yang akan dijalankan ketika HTML telah dirender oleh browser

async function ubahLokasi() {
  if (inputOptions["provinsi"] == null) {
    inputOptions["provinsi"] = lokasi.value;
    inputOptions["selectInput"] = await fetchData("https://training00.devbmkg.my.id/lokasi?prov=" + inputOptions['provinsi']);
    lokasi.value = "Pilih Kab";
  } else if (inputOptions["kabupaten"] == null) {
    inputOptions["kabupaten"] = lokasi.value;
    inputOptions["selectInput"] = await fetchData("https://training00.devbmkg.my.id/lokasi?kabkota=" + inputOptions['kabupaten']);
    lokasi.value = "Pilih Kec";
  } else if (inputOptions["kecamatan"] == null) {
    inputOptions["kecamatan"] = lokasi.value;
    lokasi.value =  inputOptions["kecamatan"][1].trim();
  }
} // Fungsi yang dijalankan ketika pengguna memilih lokasi

const indexCuaca = ref(); //Index array cuaca

async function submitLokasi() {
  submitted.value = true;
  cuaca.data = await fetchData("https://training00.devbmkg.my.id/cuaca-kec/" + inputOptions.kecamatan[0]);
  cuaca.data = cuaca.data['result'][0]
  cuacaStore.data = 
    await fetchData("https://training00.devbmkg.my.id/cuaca-kec-detail/" + inputOptions.kecamatan[0]); // Fetch data cuaca lengkap untuk halaman CuacaView.vue
} //Fungsi yang akan dijalankan ketika tombol submit telah ditekan 

async function aturUlang() {
  inputOptions["selectInput"] = await fetchData("/lokasi.json");
  inputOptions["provinsi"] = null;
  inputOptions["kabupaten"] = null;
  inputOptions["kecamatan"] = null;
  lokasi.value = "Pilih Lokasi";
  cuaca.data = null;
  submitted.value = false;
} // Fungsi yang dijalakan ketika tombol reset ditekan

</script>
<template lang="">
  <div class="container">


    <!-- Tampilan menu input lokasi Cuaca -->
      <div class="card p-2 d-flex flex-col text-center shadow rounded">
        <h5>Pilih Lokasi</h5>
        <div class="mb-3 d-flex flex-row">
          <select
            v-model="lokasi"
            @change="ubahLokasi"
            class="form-control me-2"
            name="select"
            id="lokasi-pengguna"
            aria-label='lokasi-pengguna'
            :disabled="inputOptions['kecamatan']"
          >
          <!-- v-model untuk form binding, @change merupakan sebuah v-directive pada Vue yang akan bekerja jika input select berubah nilainya
          maka akan menjalankan fungsi yang telah di-assign -->
            <option disabled selected hidden>{{ lokasi }}</option>
            <option
              v-if="!inputOptions['provinsi']"
              v-for="(prov, item) in inputOptions['selectInput']"
              :value="prov['prov']"
            >
              {{ prov["prov"] }}
            </option>
            <option
              v-else-if="!inputOptions['kabupaten']"
              v-for="(kab, item) in inputOptions['selectInput']"
              :value="kab['kabkota']"
            >
              {{ kab["kabkota"] }}
            </option>
            <option
              v-else-if="!inputOptions['kecamatan']"
              v-for="(kec, item) in inputOptions['selectInput']"
              :value="[kec['id'], kec['kec']]"
            >
              {{ kec["kec"] }}
            </option>
            <!-- v-if merupakan v directive kondisional yang memiliki cara kerja sperti pada bahasa pemrograman yang lain. 
                Misal v-if="!inputOptions['provinsi']" jika inputOptions['provinsi'] bernilai null, maka elemen akan te-render, sedangkan
                untuk v-else-if dan v-else di bawahnya tidak terender.
                v-for merupakan v directive untuk for loop dengan cara kerja seperti bahasa pemrograman yang lain.
            -->
          </select>
          <button
            v-if="inputOptions['kecamatan'] && submitted == false"
            type="button"
            @click="submitLokasi"
            class="btn btn-primary"
          >
            Submit
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            :class="{ 'w-100': submitted }"
            @click="aturUlang"
          >
            Reset
          </button>
        </div>
      </div>
    <!-- Tampilan menu input lokasi Cuaca -->


    <!-- Tampilan Cuaca setelah Lokasi Berhasil Dipilih -->
      <div
        class="card p-2 d-flex flex-col text-center shadow rounded mt-3"
        v-if="cuaca.data"
      >
        <div class="fw-bold">{{ cuaca.data["kecamatan"] }}</div>
        <div>
          {{ cuaca.data["hari"] }} {{ cuaca.data["jam"] }}
        </div>
        <img
          class="mx-auto d-block img-cuacaStore"
          :src="cuaca.data['img']"
          alt="icon-cuacaStore"
        />
        <div class="m-2">{{ cuaca.data["weatherInfo"] }}</div>
        <div>
          {{ cuaca.data["t"] }}<span>&#176;</span>C
          {{ cuaca.data["hu"] }}%
        </div>
      </div>
    <!-- Tampilan Cuaca setelah Lokasi Berhasil Dipilih -->
  </div>
</template>
