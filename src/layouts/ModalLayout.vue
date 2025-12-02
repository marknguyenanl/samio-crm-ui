<script setup></script>

<template>
  <div class="fixed top-0 left-0 inset-0">
    <div class="absolute top-0 left-0 transition-all ease-in-out opacity-70 inset-0 bg-black"></div>
    <div
      class="transition-all ease-in-out duration-1000 min-w-md min-h-md absolute bg-gray-200 w-fit h-fit inset-0 shadow-lg rounded-lg top-[50%] left-[50%] translate-x-[-50%] py-8 px-4 translate-y-[-50%]"
    >
      <slot />
    </div>
  </div>
</template>
