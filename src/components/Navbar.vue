<template>
  <nav class="flex justify-between mb-2 p-2 px-4 bg-gray-800 text-white">
    <ul class="flex-row flex gap-4">
      <li><RouterLink :to="{ name: 'home' }">Homepage</RouterLink></li>
      <li><RouterLink :to="{ name: 'docs' }">Docs</RouterLink></li>
      <li><RouterLink :to="{ name: 'pricing' }">Pricing</RouterLink></li>
    </ul>
    <ul class="flex-row flex gap-4">
      <li><RouterLink :to="{ name: 'login' }">Login</RouterLink></li>
      <li><RouterLink :to="{ name: 'register' }">Register</RouterLink></li>
    </ul>
  </nav>
</template>
