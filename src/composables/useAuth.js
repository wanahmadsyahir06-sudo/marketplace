import { ref } from 'vue'

const KEY_USERS = 'um_users'
const KEY_USER = 'um_user'
const KEY_POSTS = 'um_posts'

const users = ref(JSON.parse(localStorage.getItem(KEY_USERS) || '[]'))
const currentUser = ref(JSON.parse(localStorage.getItem(KEY_USER) || 'null'))
const posts = ref(JSON.parse(localStorage.getItem(KEY_POSTS) || '[]'))

function saveUsers() {
  localStorage.setItem(KEY_USERS, JSON.stringify(users.value))
}

function saveUser() {
  localStorage.setItem(KEY_USER, JSON.stringify(currentUser.value))
}

function savePosts() {
  localStorage.setItem(KEY_POSTS, JSON.stringify(posts.value))
}

function register(email, password, role = 'buyer') {
  if (!email || !password) throw new Error('Email and password required')
  if (users.value.find((u) => u.email === email)) throw new Error('Email already registered')
  const u = { email, password, role }
  users.value.push(u)
  saveUsers()
  currentUser.value = u
  saveUser()
  return u
}

function login(email, password) {
  const u = users.value.find((x) => x.email === email && x.password === password)
  if (!u) throw new Error('Invalid credentials')
  currentUser.value = u
  saveUser()
  return u
}

function logout() {
  currentUser.value = null
  localStorage.removeItem(KEY_USER)
}

function addPost({ title, description, image }) {
  if (!currentUser.value || currentUser.value.role !== 'seller') throw new Error('Only sellers can post')
  const post = {
    id: Date.now(),
    title: title || 'Untitled',
    description: description || '',
    image: image || '',
    seller: currentUser.value.email,
    created: Date.now(),
  }
  posts.value.unshift(post)
  savePosts()
  return post
}

function removePost(id) {
  const idx = posts.value.findIndex((p) => p.id === id)
  if (idx !== -1) {
    posts.value.splice(idx, 1)
    savePosts()
    return true
  }
  return false
}

export function useAuth() {
  return {
    users,
    currentUser,
    posts,
    register,
    login,
    logout,
    addPost,
    removePost,
  }
}
