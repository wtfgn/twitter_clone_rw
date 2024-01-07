<template>
  <div
    class="p-3 cursor-pointer border-b hover:bg-gray-100
   dark:hover:bg-dim-300
  " :class="wrapperClass"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const { defaultTransition, twitterBorderColor } = useTailwindConfig();

const wrapperClass = computed(() => `${defaultTransition} ${twitterBorderColor}`);
</script>
