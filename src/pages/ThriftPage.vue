<template>
  <div class="thrift-page q-pa-lg">
    <h1 class="text-h2 q-mb-md text-center">Thrift Store</h1>
    <p class="text-h5 text-center">Welcome to our thrift section.</p>

    <q-carousel
      v-model="slide"
      animated
      arrows
      navigation
      infinite
      height="400px"
      class="q-mb-lg rounded"
    >
      <q-carousel-slide name="1" img-src="/icons/thrift_1.jpg">
        <template #default>
          <div class="absolute-center text-center q-pa-md">
            <div class="text-h3 text-black text-bold">Premium Thrift Collection</div>
          </div>
        </template>
      </q-carousel-slide>

      <q-carousel-slide name="2" img-src="/icons/thrift_2.jpg">
        <template #default>
          <div class="absolute-center text-center q-pa-md">
            <div class="text-h3 text-blue-9 text-bold">Streetwear Finds</div>
          </div>
        </template>
      </q-carousel-slide>

      <q-carousel-slide name="3" img-src="/icons/thrift_3.jpg">
        <template #default>
          <div class="absolute-center text-center q-pa-md">
            <div class="text-h3 text-yellow-10 text-bold">Sustainable Fashion</div>
          </div>
        </template>
      </q-carousel-slide>

      <q-carousel-slide name="4" img-src="/icons/thrift_4.jpg">
        <template #default>
          <div class="absolute-center text-center q-pa-md">
            <div class="text-h3 text-white text-bold">Thrifted Luxury</div>
          </div>
        </template>
      </q-carousel-slide>
    </q-carousel>

    <!-- Seller create post form -->
    <div v-if="currentUser && currentUser.role === 'seller'" class="q-mb-lg">
      <q-card class="q-pa-md">
        <div class="text-bold q-mb-sm">Create a new post (sellers only)</div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-input v-model="newPost.title" label="Title" outlined />
          </div>
          <div class="col-12 col-md-4">
            <q-input v-model="newPost.image" label="Image URL" outlined />
          </div>
          <div class="col-12 col-md-4">
            <q-input v-model="newPost.price" label="Price" outlined />
          </div>
        </div>
        <q-input v-model="newPost.description" type="textarea" label="Description" class="q-mt-md" outlined />
        <div class="q-mt-sm row items-center">
          <q-btn label="Post Item" color="primary" @click="createPost" />
          <div v-if="postError" class="text-negative q-ml-md">{{ postError }}</div>
        </div>
      </q-card>
    </div>

    <!-- Dynamic posts list -->
    <div class="row q-col-gutter-lg q-mb-lg">
      <div v-for="post in posts" :key="post.id" class="col-12 col-md-6">
        <q-card class="thrift-card">
          <q-img :src="post.image || '/icons/item_1.jpg'" alt="post image" class="rounded" style="height:250px; object-fit:cover" />
          <q-card-section>
            <div class="text-h6">{{ post.title }}</div>
            <div class="text-subtitle2">By: {{ post.seller }}</div>
            <p class="q-mt-sm">{{ post.description }}</p>
            <div class="row items-center q-mt-md">
              <div class="text-primary text-h6">{{ post.price ? ('$' + post.price) : '' }}</div>
              <q-space />
              <q-btn v-if="currentUser && currentUser.email === post.seller" label="Delete" color="negative" size="sm" @click="deletePost(post.id)" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Static sample cards remain for visual fullness -->
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-6">
        <q-card class="thrift-card">
          <q-card-section>
            <div class="text-h6">Rebelutions Tour shirt</div>
            <q-img src="/icons/item_1.jpg" alt="Thrift Item 1" class="q-mt-md rounded" />
            <p class="q-mt-sm">Description of thrift item</p>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="thrift-card">
          <q-card-section>
            <div class="text-h6">Hoodie</div>
            <q-img src="/icons/thrift_5.jpg" alt="Thrift Item 2" class="q-mt-md rounded" />
            <p class="q-mt-sm">Description of thrift item</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from 'src/composables/useAuth'

const { posts, currentUser, addPost, removePost } = useAuth()

const slide = ref('1')

const newPost = ref({ title: '', description: '', image: '', price: '' })
const postError = ref('')

function createPost() {
  postError.value = ''
  try {
    if (!newPost.value.title) throw new Error('Title required')
    addPost({ title: newPost.value.title, description: newPost.value.description, image: newPost.value.image })
    newPost.value = { title: '', description: '', image: '', price: '' }
  } catch (err) {
    postError.value = err.message || 'Post failed'
  }
}

function deletePost(id) {
  removePost(id)
}
</script>

<style scoped>
.thrift-page {
  background-color: #e4d4dc;
  min-height: 100vh;
}

/* Fixed size for all cards */
.thrift-card {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.thrift-card q-img,
.thrift-card .q-img {
  width: 100%;
}

.thrift-card .q-card-section {
  display: flex;
  flex-direction: column;
}

.thrift-card p {
  margin-top: 0.5rem;
}
</style>
