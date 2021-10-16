<template>
  <div class="bg-shark-800 border-2 ">
    <!-- if loading -->
    <div v-if="loading">
      <div v-for="number in 5" :key="number" class="px-4 py-6 flex space-x-4">
        <div
          class="object-cover w-20 h-20 rounded-full shadow-lg bg-white animate-pulse border-4 border-gray-900"
        ></div>
        <div class="space-y-1 w-11/12">
          <div class=" bg-gray-100 h-8 rounded-lg w-48 animate-pulse"></div>
          <div class=" bg-gray-100 h-6 rounded-lg w-40 animate-pulse"></div>
          <div class="grid grid-cols-12 gap-3">
            <div
              class="bg-gray-100 col-span-3 h-6 rounded-lg animate-pulse"
            ></div>
            <div
              class="bg-gray-100 col-span-5 h-6 rounded-lg animate-pulse"
            ></div>
            <div
              class="bg-gray-100 col-span-4 h-6 rounded-lg animate-pulse"
            ></div>
            <div
              class="bg-gray-100 col-span-7 h-6 rounded-lg animate-pulse"
            ></div>
            <div
              class="bg-gray-100 col-span-3 h-6 rounded-lg animate-pulse"
            ></div>
            <div
              class="bg-gray-100 col-span-2 h-6 rounded-lg animate-pulse"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="errors && !loading"
      class="text-center h-96 flex justify-center items-center"
    >
      <div>
        <span class="my-text-title text-white">
          Something went wrong.
        </span>
        <div class="my-text-content text-white">
          This is not the page you were looking for.
        </div>
      </div>
    </div>

    <!-- if don't have follow -->
    <div
      v-if="follows.length <= 0 && !loading && !errors"
      class="text-center h-96 flex justify-center items-center"
    >
      <div>
        <span class="my-text-title text-white">
          You don’t have any follows yet {{ errors }}
        </span>
        <div v-if="isFollower" class="my-text-content text-white">
          When someone follows you, you’ll see them here.
        </div>
        <div v-if="!isFollower" class="my-text-content text-white">
          When you follows someone, you’ll see them here.
        </div>
      </div>
    </div>

    <!-- follow -->
    <div v-for="follow in follows" :key="follow.id">
      <router-link
        :to="`/${follow.username}/home`"
        class="px-4 py-6 flex space-x-4 hover:bg-shark-600"
      >
        <img
          :src="getImagePath(follow.profile)"
          alt="profile"
          :title="follow.name"
          class="object-cover w-20 h-20 rounded-full shadow-lg border-4 border-gray-900"
        />
        <div class="space-y-1">
          <div class="my-text-content text-white">{{ follow.name }}</div>
          <div class="my-text-base text-gray-600">@{{ follow.username }}</div>
          <div class="my-text-base text-white">{{ follow.description }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    follows: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
    isFollower: {
      type: Boolean,
      default: true,
    },
    errors: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
  },
};
</script>

<style></style>
