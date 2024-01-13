<template>
  <div class="flex items-center text-gray-400 cursor-pointer group" @click.stop.prevent="$emit('click')">
    <div
      :class="`p-2 group-hover:bg-${$props.color}-100 group-hover:text-${$props.color}-400 rounded-full
      dark:group-hover:bg-opacity-20 ${defaultTransition}`"
    >
      <slot name="icon" :classes="`w-${$props.size} h-${$props.size}`" />
    </div>

    <span :class="`ml-1 group-hover:text-${$props.color}-400`">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { useTailwindConfig } from '@/composables/useTailwindConfig';

defineProps({
  color: {
    type: String,
    default: 'gray',
  },
  size: {
    type: Number,
    default: 5,
  },
});

defineEmits(['click']);

const { defaultTransition } = useTailwindConfig();
</script>
