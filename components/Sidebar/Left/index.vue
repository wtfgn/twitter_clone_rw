<template>
  <div>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BellIcon,
  BookmarkIcon,
  DocumentTextIcon,
  EllipsisHorizontalCircleIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from '@heroicons/vue/24/outline';
import { HomeIcon } from '@heroicons/vue/20/solid';

const { defaultTransition } = useTailwindConfig();
</script>
