<script setup>
import { ref, reactive, onMounted } from "vue";

const lokasi = ref("Pilih Lokasi"); //Placeholder untuk select
const ulangButton = ref(false); //Kondisi tombol ulang

const cuaca = reactive({ data: null }); //Menyimpan data Cuaca
const indexCuaca = ref(); //Index array cuaca

const inputOptions = reactive({
  data: {
    provinsi: null,
    kabupaten: null,
    kecamatan: null, //[id, nama]
    selectInput: [],
  },
}); //Menyimpan nama provinsi, kabupaten, dan kecamatan yang dipilih user

async function fetchData(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
} //fungsi untuk melakukan fetch data ke API

function pilihWaktu() {
  const now = new Date();
  const index = Math.floor(now.getHours() - 1, 3) - 1;
  return index;
}

async function submitLokasi() {
  ulangButton.value = true;
  cuaca.data = await fetchData("/cuaca.json");
  cuaca.data = cuaca.data["result"].filter(
    (cuaca) => cuaca["idKec"] == inputOptions.data.kecamatan[0]
  );
  indexCuaca.value = pilihWaktu();
  localStorage.setItem("dataStorage", JSON.stringify(inputOptions));
}

async function aturUlang() {
  inputOptions.data["provinsi"] = null;
  inputOptions.data["kabupaten"] = null;
  inputOptions.data["kecamatan"] = null;
  lokasi.value = "Pilih Lokasi";
  cuaca.data = null;
  ulangButton.value = false;
  inputOptions.data["selectInput"] = await fetchData("/lokasi.json");
}

async function ubahLokasi() {
  if (inputOptions.data["provinsi"] == null) {
    inputOptions.data["provinsi"] = lokasi.value;
    inputOptions.data["selectInput"] = await fetchData("/kabupaten.json");
    lokasi.value = "Pilih Kab";
  } else if (inputOptions.data["kabupaten"] == null) {
    inputOptions.data["kabupaten"] = lokasi.value;
    inputOptions.data["selectInput"] = await fetchData("/kecamatan.json");
    lokasi.value = "Pilih Kec";
  } else if (inputOptions.data["kecamatan"] == null) {
    inputOptions.data["kecamatan"] = lokasi.value;
    lokasi.value =
      inputOptions.data["kabupaten"] + ", " + inputOptions.data["kecamatan"][1];
  }
}

onMounted(async () => {
  inputOptions.data["selectInput"] = await fetchData("/lokasi.json");
  const dataStorage = localStorage.getItem("dataStorage");
  if (dataStorage) {
    inputOptions.data = JSON.parse(dataStorage).data;
    ulangButton.value = true;
    cuaca.data = await fetchData("/cuaca.json");
    cuaca.data = cuaca.data["result"].filter(
      (cuaca) => cuaca["idKec"] == inputOptions.data.kecamatan[0]
    );
    indexCuaca.value = pilihWaktu();
  }
});
</script>
<template>
  <div class="container">
    <div class="card p-2 d-flex flex-col text-center shadow rounded">
      <h5>{{ ulangButton ? "Ganti Lokasi" : "Pilih Lokasi" }}</h5>
      <div class="mb-3 d-flex flex-row">
        <select
          v-if="!ulangButton"
          class="form-control me-2"
          name=""
          id=""
          @change="ubahLokasi"
          v-model="lokasi"
        >
          <option disabled>{{ lokasi }}</option>
          <option
            v-if="!inputOptions.data['provinsi']"
            v-for="(prov, item) in inputOptions.data['selectInput']"
            :value="prov['prov']"
          >
            {{ prov["prov"] }}
          </option>
          <option
            v-else-if="!inputOptions.data['kabupaten']"
            v-for="(kab, item) in inputOptions.data['selectInput']"
            :value="kab['kabkota']"
          >
            {{ kab["kabkota"] }}
          </option>
          <option v-else :value="[kec['id'], kec['kec']]">
            {{ kec["kec"] }}
          </option>
        </select>
        <button
          v-if="inputOptions.data['kecamatan'] && ulangButton == false"
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
          :class="{ 'w-100': ulangButton }"
          @click="aturUlang"
        >
          Reset
        </button>
      </div>
    </div>

    <div
      class="card p-2 d-flex flex-col text-center shadow rounded mt-3"
      v-if="cuaca.data"
    >
      <div class="fw-bold">{{ cuaca.data[indexCuaca]["kecamatan"] }}</div>
      <div>
        {{ cuaca.data[indexCuaca]["hari"] }} {{ cuaca.data[indexCuaca]["jam"] }}
      </div>
      <img
        class="mx-auto d-block img-cuaca"
        :src="cuaca.data[indexCuaca]['img']"
        alt="icon-cuaca"
      />
      <div class="m-2">{{ cuaca.data[indexCuaca]["weatherInfo"] }}</div>
      <div>
        {{ cuaca.data[indexCuaca]["t"] }}<span>&#176;</span>C
        {{ cuaca.data[indexCuaca]["hu"] }}%
      </div>
    </div>
  </div>
</template>
