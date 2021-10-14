<template>
  <div>
    <div class="flex items-center justify-end space-x-3">
      <!-- add Adop -->
      <router-link
        to="/adop/add"
        class="bg-shark-400 px-5 py-2 rounded-lg m-1 hover:bg-gray-700"
      >
        <font-awesome-icon icon="plus-square" class="my-text-base text-white" />
        <span class="my-text-base text-white ">
          Add Adop
        </span>
      </router-link>

      <!-- Sort By -->
      <div>
        <select
          name="sorting"
          v-model="selected"
          class="w-full h-11 px-3 my-text-base rounded-lg my-block-focus text-gray-700"
        >
          <option value="search">Search</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="alphaAZ">Alphabetical (A-Z)</option>
          <option value="alphaZA">Alphabetical (Z-A)</option>
        </select>
      </div>

      <!-- searchKeyword -->
      <div v-if="selected === 'search'">
        <input
          type="text"
          placeholder="search"
          class="my-text-content rounded-lg w-full h-11 px-3 py-1 my-block-focus"
          v-model="searchKeyword"
        />
      </div>
    </div>

    <div class="grid grid-cols-4 gap-3">
      <vue-flex-waterfall :col="4" :col-spacing="15" :break-by-container="true">
        <div
          v-for="adopt in sorted_adopts"
          :key="adopt.id"
          class="my-2 relative border-4 border-shark-400 rounded-lg bg-black"
        >
          <pop-up-adopt :adopt="adopt" />
        </div>
      </vue-flex-waterfall>
    </div>
  </div>
</template>

<script>
import AdoptStore from "@/store/Adopt";
import VueFlexWaterfall from "vue-flex-waterfall";
import PopUpAdopt from "@/components/PopUpAdopt.vue";

export default {
  data() {
    return {
      adopts: [],
      selected: "newest",
      searchKeyword: "",
    };
  },
  components: {
    PopUpAdopt,
    VueFlexWaterfall,
  },
  mounted() {
    this.fetch();
  },
  computed: {
    sorted_adopts: function() {
      switch (this.selected) {
        case "newest":
          this.adopts.sort((a, b) => {
            return new Date(b.updated_at) - new Date(a.updated_at);
          });
          return this.adopts;
          break;
        case "oldest":
          this.adopts.sort((a, b) => {
            return new Date(a.updated_at) - new Date(b.updated_at);
          });
          return this.adopts;
          break;
        case "alphaAZ":
          this.adopts.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
          });
          return this.adopts;
          break;
        case "alphaZA":
          this.adopts.sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
          });
          return this.adopts;
          break;
        case "search":
          let res = this.adopts.filter((element) => {
            return element.name.includes(this.searchKeyword);
          });
          return res;
          break;
        default:
          this.adopts.sort((a, b) => {
            return new Date(b.updated_at) - new Date(a.updated_at);
          });
          return this.adopts;
          break;
      }
    },
  },
  methods: {
    async fetch() {
      try {
        let res = await AdoptStore.dispatch("getAdopts_list");
        this.adopts = AdoptStore.getters.adopts_list;
      } catch (error) {
        console.error(error.response);
      }
    },
  },
};
</script>

<style></style>
