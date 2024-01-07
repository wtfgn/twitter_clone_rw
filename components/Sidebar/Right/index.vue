<template>
  <div class="flex flex-col">
    <!-- Preview Card: What's happening -->
    <SidebarRightPreviewCard title="What's happening">
      <SidebarRightPreviewCardItem v-for="item in whatsHappeningItems" :key="item.id">
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">
            {{ item.title }}
          </h2>
          <p class="text-xs text-gray-400">
            {{ item.count }}
          </p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <!-- Preview Card: Who to follow -->
    <div>
      <SidebarRightPreviewCard title="Who to follow">
        <SidebarRightPreviewCardItem v-for="item in whoToFollowItems" :key="item.id">
          <div class="flex flex-row items-center justify-between p-2">
            <div class="flex items-center space-x-4">
              <!-- Avatar -->
              <div class="shrink-0">
                <img
                  class="object-cover w-10 h-10 rounded-full"
                  :src="item.image"
                  :alt="item.name"
                >
              </div>

              <!-- Name -->
              <div class="flex flex-col">
                <h2 class="font-bold text-gray-800 text-md dark:text-white">
                  {{ item.name }}
                </h2>
                <p class="text-xs text-gray-400">
                  {{ item.username }}
                </p>
              </div>
            </div>
            <!-- Follow Button -->
            <div class="flex flex-row h-full">
              <button
                class="px-4 py-2 text-xs font-bold text-white bg-black
               dark:text-black dark:bg-white rounded-full"
              >
                Follow
              </button>
            </div>
          </div>
        </SidebarRightPreviewCardItem>
      </SidebarRightPreviewCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const whatsHappeningItems = ref([
  {
    title: 'Trending in Canada',
    count: '1,234 Tweets',
    id: 1,
  },
  {
    title: 'SpaceX',
    count: '1,234 Tweets',
    id: 2,
  },
  {
    title: 'Trending in US',
    count: '1,234 Tweets',
    id: 3,
  },
]);

const whoToFollowItems = ref([
  {
    name: 'Elon Musk',
    username: '@elonmusk',
    image: 'https://picsum.photos/200/200',
    id: 1,
  },
  {
    name: 'Elon Musk',
    username: '@elonmusk',
    image: 'https://picsum.photos/200/200',
    id: 2,
  },
  {
    name: 'Elon Musk',
    username: '@elonmusk',
    image: 'https://picsum.photos/200/200',
    id: 3,
  },
]);
</script>
