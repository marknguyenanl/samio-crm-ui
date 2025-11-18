<script setup>
const logout = () => {
  localStorage.removeItem('access_token')
  router.push({ name: 'login' })
}
</script>

<template>
  <div>New Dashboard here</div>
  <button class="px-4 py-1 bg-green-400 cursor-pointer" @click="logout">Log out</button>
</template>
