<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-lg q-mx-auto" style="max-width: 600px; width: 100%">
      <q-card-section>
        <div class="text-h5 text-center q-mb-md">🛍️ UniMarket</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input v-model="form.email" label="Email" type="email" outlined />
        <q-input v-model="form.password" label="Password" type="password" outlined />

        <div v-if="isRegister" class="row q-col-gutter-md items-center">
          <div class="col">
            <q-select v-model="form.role" :options="roles" label="Sign up as" outlined />
          </div>
        </div>

        <div v-if="error" class="text-negative text-center">{{ error }}</div>

        <q-btn
          :label="isRegister ? 'Register' : 'Login'"
          color="primary"
          class="full-width"
          :loading="loading"
          @click="isRegister ? handleRegister() : handleLogin()"
        />
      </q-card-section>

      <q-card-section class="text-center">
        <a href="#" @click.prevent="toggleRegister">
          {{ isRegister ? 'Already have an account? Login' : "Don't have an account? Register here" }}
        </a>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from 'src/composables/useAuth'

const { login, register } = useAuth()
const router = useRouter()

const roles = [
  { label: 'Buyer', value: 'buyer' },
  { label: 'Seller', value: 'seller' },
]

const form = ref({ email: '', password: '', role: 'buyer' })
const error = ref('')
const loading = ref(false)
const isRegister = ref(false)

function toggleRegister() {
  isRegister.value = !isRegister.value
  error.value = ''
}

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await login(form.value.email, form.value.password)
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}

async function handleRegister() {
  error.value = ''
  loading.value = true
  try {
    const roleValue = typeof form.value.role === 'object' ? form.value.role.value : form.value.role
    await register(form.value.email, form.value.password, roleValue)
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>
