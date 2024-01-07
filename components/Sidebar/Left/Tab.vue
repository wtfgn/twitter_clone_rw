<template>
  <div>
    <NuxtLink
      to="#" class="flex items-center p-3 w-min space-x-4
      hover:bg-gray-200 rounded-full text-black
     dark:hover:bg-dim-200 dark:text-white" :class="defaultTransition"
    >
      <!-- Icon -->
      <div class="w-6 h-6 text-dark">
        <slot name="icon" />
      </div>

      <!-- Name -->
      <div class="text-xl hidden xl:block" :class="textClasses">
        <slot name="name" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const { defaultTransition } = useTailwindConfig();

const textClasses = computed(() => props.active ? 'font-semibold' : ' font-normal');
</script>
