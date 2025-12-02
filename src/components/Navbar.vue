<template>
  <nav class="text-[#01204E] shadow-lg py-2 bg-[#f8fbff]">
    <div class="container flex items-center justify-between mx-auto">
      <ul class="flex-row flex gap-4 items-center">
        <li class="pb-2">
          <RouterLink :to="{ name: 'home' }">
            <img class="h-26 object-cover" src="/logo-only.svg" alt="Samio logo" />
          </RouterLink>
        </li>
        <!-- <li><RouterLink :to="{ name: 'docs' }">Docs</RouterLink></li> -->
        <!-- <li class="pt-3"><RouterLink :to="{ name: 'pricing' }">Pricing</RouterLink></li> -->
      </ul>
      <ul class="text-[#386641] flex-row flex items-center gap-4 pt-3">
        <li><RouterLink :to="{ name: 'login' }">Login</RouterLink></li>
        <li><RouterLink :to="{ name: 'register' }">Register</RouterLink></li>
      </ul>
    </div>
  </nav>
</template>
