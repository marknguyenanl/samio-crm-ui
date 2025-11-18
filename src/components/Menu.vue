<template>
  <nav class="flex justify-between mb-2 p-2 px-4 bg-gray-800 text-white">
    <ul class="flex-row flex gap-4">
      <li><RouterLink :to="{ name: 'dashboard' }">CRM</RouterLink></li>
      <li><RouterLink :to="{ name: 'leads' }">Leads</RouterLink></li>
      <li><RouterLink :to="{ name: 'contacts' }">Contacts</RouterLink></li>
    </ul>
    <ul class="flex-row flex gap-4">
      <!-- todo: use modal popup for this -->
      <li>SearchIcon</li>
      <li>NotifyIcon</li>
    </ul>
  </nav>
</template>
