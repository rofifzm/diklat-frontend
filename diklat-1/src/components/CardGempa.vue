<script setup>

const props = defineProps(['gempa'])

</script>
<template>
  <div class="d-flex flex-column">
    <div class="card m-2 p-3 shadow">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <div class="border rounded-circle p-3 bg-light text-info">
            <h3>{{gempa['Magnitude']}}</h3>
          </div>
        </div>
        <div class="col-6">
          <div class="d-flex flex-column text-end align-items-end">
            <p class="fw-bold">
              {{gempa['Tanggal']}} <br>
              {{ gempa['Jam'] }}
            </p>
            <p>{{gempa["Wilayah"]}}</p>

            <p>{{gempa['Lintang']}} {{gempa['Bujur']}}</p>
            <p>Kedalaman : {{gempa['Kedalaman']}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
