<template>
  <div>
    <label
      v-if="$props.label" for=""
      class="block pl-3 ml-px text-sm font-medium text-gray-700"
    > {{ $props.label }}</label>
    <div class="mt-1">
      <input
        v-model="fieldValue" :type="$props.type"
        class="block px-4 w-full border-gray-300 rounded-full shadow-sm
      focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        :placeholder="$props.placeholder"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const fieldValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
});
</script>
