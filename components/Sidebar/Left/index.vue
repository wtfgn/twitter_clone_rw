<template>
  <div class="flex-col flex h-screen">
    <!-- Logo -->
    <div
      class="p-2 my-2 rounded-full hover:bg-blue-50 w-min
      dark:hover:bg-white/20" :class="defaultTransition"
    >
      <NuxtLink to="/">
        <div class="w-8 h-8">
          <LogoTwitter :class="defaultTransition" />
        </div>
      </NuxtLink>
    </div>

    <!-- Tabs -->
    <div class="mt-2 space-y-3">
      <SidebarLeftTab active>
        <template #icon>
          <HomeIcon />
        </template>

        <template #name>
          <span>Home</span>
        </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <HashtagIcon />
        </template>

        <template #name>
          <span>Explore</span>
        </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <BellIcon />
        </template>

        <template #name>
          <span>Notifications</span>
        </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <InboxIcon />
        </template>

        <template #name>
          <span>Messages</span>
        </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <BookmarkIcon />
        </template>

        <template #name>
          <span>Bookmarks</span>
        </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <DocumentTextIcon />
        </template>

        <template #name>
          <span>Lists</span>
        </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <UserIcon />
        </template>

        <template #name>
          <span>Profile</span>
        </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <BookmarkIcon />
        </template>

        <template #name>
          <span>Bookmarks</span>
        </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <EllipsisHorizontalCircleIcon />
        </template>

        <template #name>
          <span>More</span>
        </template>
      </SidebarLeftTab>

      <!-- Tweet Button (show only if large screen) -->
      <div class="hidden xl:block" @click="$emit('tweet')">
        <UIButton liquid size="lg">
          <span class="font-bold">Tweet</span>
        </UIButton>
      </div>

      <!-- Pencil Icon (show only if smaller screen) -->
      <div class="block xl:hidden" @click="$emit('tweet')">
        <UIButton>
          <div class="w-6 h-6 font-bold">
            <PencilIcon />
          </div>
        </UIButton>
      </div>
    </div>

    <div
      class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full
      cursor-pointer w-14 xl:w-full hover:b-gray-100 dark:hover:bg-dim-800"
      :class="defaultTransition"
      @click="$emit('logout')"
    >
      <div class="flex flex-row">
        <img :src="$props.user?.profileImage ?? ''" alt="" class="w-10 h-10 rounded-full">
        <div class="flex-col hidden ml-2 xl:block">
          <h1 class="text-sm font-bold text-gray-800 dark:text-white">
            {{ $props.user?.name }}
          </h1>

          <p class="text-sm text-gray-400">
            {{ $props.user?.handle }}
          </p>
        </div>
      </div>

      <!-- Icon -->
      <div class="hidden ml-auto xl:block">
        <div class="w-6 h-6">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BellIcon,
  BookmarkIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  EllipsisHorizontalCircleIcon,
  HashtagIcon,
  InboxIcon,
  PencilIcon,
  UserIcon,
} from '@heroicons/vue/24/outline';
import { HomeIcon } from '@heroicons/vue/20/solid';
import type { TransformedUserData } from '~/server/transformers/user';

defineProps({
  user: {
    type: Object as PropType<TransformedUserData | null>,
    required: true,
  },
});

defineEmits(['tweet', 'logout']);

const { defaultTransition } = useTailwindConfig();
</script>
