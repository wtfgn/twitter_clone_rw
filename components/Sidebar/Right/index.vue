<template>
  <div class="flex flex-col">
    <!-- Search Bar -->
    <div class="relative m-2">
      <div class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
        <div class="w-6 h-6">
          <MagnifyingGlassIcon @click="handleSearch" />
        </div>
      </div>
      <input
        v-model="search"
        type="text"
        class="flex items-center w-full pl-12 text-sm text-black font-normal
        dark:text-gray-100 bg-gray-200 border border-gray-200 rounded-full shadow
        dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900
        focus:outline-none focus:border focus:border-blue-200 h-9"
        placeholder="Search Twitter"
      >
    </div>

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

      <!-- Footer -->
      <footer>
        <ul class="mx-2 my-4 text-xs text-gray-500">
          <li class="inline-block mx-2">
            <a href="#" class="hover:underline" @click.prevent="handleToggleDarkMode">Dark mode</a>
          </li>
          <li class="inline-block mx-2">
            <a href="#" class="hover:underline">Privacy Policy</a>
          </li>
          <li class="inline-block mx-2">
            <a href="#" class="hover:underline">Cookie Policy</a>
          </li>
          <li class="inline-block mx-2">
            <a href="#" class="hover:underline">Accessbility</a>
          </li>
          <li class="inline-block mx-2">
            <a href="#" class="hover:underline">Ads info</a>
          </li>
          <li class="inline-block mx-2">
            <a href="#" class="hover:underline">More</a>
          </li>
          <li class="inline-block mx-2">
            <a href="#" class="hover:underline">© 2024 Twitter, Inc.</a>
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const emitter = useEmitter();

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

const search = ref('');

function handleSearch() {
  useRouter().push({
    path: '/search',
    query: {
      q: search.value,
    },
  });
}

function handleToggleDarkMode() {
  emitter.$emit('toggleDarkMode');
}
</script>
