<template>
  <button
    class="flex justify-center text-white bg-blue-400 rounded-full
  hover:bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
    :disabled="$props.disabled" :class="classes" @click="handleClick"
  >
    <span :class="textFontSize">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md',
  },
  liquid: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const paddingClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-2 py-3';
    case 'lg':
      return 'px-4 py-3';
    default:
      return 'px-3 py-3';
  }
});

const textFontSize = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'text-md';
    default:
      return 'text-sm';
  }
});

const defaultWidth = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-20';
    case 'lg':
      return 'w-40';
    default:
      return 'w-min';
  }
});

const classes = computed(() => {
  return [
    paddingClasses.value,
    props.liquid ? 'w-full' : defaultWidth.value,
  ];
});

function handleClick(event: MouseEvent) {
  emit('click', event);
}
</script>
