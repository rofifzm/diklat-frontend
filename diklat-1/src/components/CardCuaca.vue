<script setup>

const props = defineProps(['cuaca'])

</script>
<template lang="">
     <div class="container">
      <section>
        <div class="d-flex flex-column">
          <div class="card m-2 p-3 shadow">
            <div class="row">
              <div class="col-6 ">
                <div class="d-flex flex-column ">
                  <p>{{cuaca['t']}} °C</p>
                  <p>{{cuaca['kecamatan']}}</p>
                  <p>{{cuaca['hari']}} {{cuaca['jam']}}</p>
                </div>
              </div>
              <div class="col-6 ">
                <div class="d-flex flex-column text-end align-items-end ">
                  <img
                  class=" d-block img-cuaca"
                  :src="cuaca['img']"
                  alt="icon-cuaca"
                />
                <p>{{cuaca['weatherInfo']}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </section>
     
    </div>
</template>
