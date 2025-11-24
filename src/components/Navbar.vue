<template>
  <nav class="flex justify-between mb-2 p-2 px-4 text-[#01204E] shadow-lg bg-[#f8fbff]">
    <ul class="flex-row flex gap-4 items-center">
      <li>
        <RouterLink :to="{ name: 'home' }">
          <img class="h-12 object-cover" src="/Logo.svg" alt="Anros logo" />
        </RouterLink>
      </li>
      <!-- <li><RouterLink :to="{ name: 'docs' }">Docs</RouterLink></li> -->
      <!-- <li><RouterLink :to="{ name: 'pricing' }">Pricing</RouterLink></li> -->
    </ul>
    <ul class="flex-row flex items-center gap-4">
      <li><RouterLink :to="{ name: 'login' }">Login</RouterLink></li>
      <li><RouterLink :to="{ name: 'register' }">Register</RouterLink></li>
    </ul>
  </nav>
</template>
