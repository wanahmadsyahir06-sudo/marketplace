<template>
  <div class="q-pa-none">
    <router-link to="/page1" class="thrift-link">
      <q-parallax :height="600" :speed="0.7">
        <template v-slot:media>
          <img src="/icons/services.jpg" />
        </template>

        <div class="thrift-cta">
          <h1 class="text-white">Services</h1>
          <q-btn
            unelevated
            label="Explore Services"
            class="thrift-button"
            color="white"
            text-color="black"
          />
        </div>
      </q-parallax>
    </router-link>
  </div>
  <div class="q-pa-none">
    <router-link to="/page2" class="thrift-link">
      <q-parallax :height="600" :speed="0.7">
        <template v-slot:media>
          <img src="/icons/f&b.jpg" />
        </template>

        <div class="thrift-cta">
          <h1 class="text-white">Food & Beverage</h1>
          <q-btn
            unelevated
            label="View Menu"
            class="thrift-button"
            color="white"
            text-color="black"
          />
        </div>
      </q-parallax>
    </router-link>
  </div>
  <div class="q-pa-none">
    <router-link to="/page3" class="thrift-link">
      <q-parallax :height="600" :speed="0.7">
        <template v-slot:media>
          <img src="/icons/thrift.jpg" />
        </template>

        <div class="thrift-cta">
          <h1 class="text-white">Thrift Shop</h1>
          <q-btn
            unelevated
            label="Shop Thrift"
            class="thrift-button"
            color="white"
            text-color="black"
          />
        </div>
      </q-parallax>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      slide: ref('style'),
      lorem:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?',
    }
  },
}
</script>

<style scoped>
.thrift-link {
  display: block;
  text-decoration: none;
}

.thrift-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  text-align: center;
}

.thrift-button {
  border-radius: 999px;
  min-width: 180px;
}
</style>
