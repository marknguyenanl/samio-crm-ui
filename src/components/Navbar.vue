<template>
  <nav class="flex justify-between mb-2 p-2 px-4 bg-gray-800 text-white">
    <ul class="flex-row flex gap-4">
      <li><router-link to="/">Homepage</router-link></li>
      <li><router-link to="docs">Docs</router-link></li>
      <li><router-link to="pricing">Pricing</router-link></li>
    </ul>
    <ul class="flex-row flex gap-4">
      <li><router-link to="login">Login</router-link></li>
      <li><router-link to="register">Register</router-link></li>
    </ul>
  </nav>
</template>
