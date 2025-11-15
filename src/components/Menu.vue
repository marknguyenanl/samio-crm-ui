<template>
  <nav class="flex justify-between mb-2 p-2 px-4 bg-gray-800 text-white">
    <ul class="flex-row flex gap-4">
      <li><router-link to="dashboard/crm">CRM</router-link></li>
      <li><router-link to="dashboard/leads">Leads</router-link></li>
      <li><router-link to="dashboard/contacts">Contacts</router-link></li>
    </ul>
    <ul class="flex-row flex gap-4">
      <li><router-link to="dashboard/search">Search</router-link></li>
      <li><router-link to="dashboard/notify">Notify</router-link></li>
      <li><router-link to="dashboard/register">Register</router-link></li>
    </ul>
  </nav>
</template>
