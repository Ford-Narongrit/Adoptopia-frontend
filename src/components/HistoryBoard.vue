<template>
  <div>
    <table class="w-4/5 max-h-96">
      <thead>
        <tr class="">
          <th v-for="(heading, index) in keys" :key="index" class="p-2 my-text-content">{{ heading }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in data" :key="index" :class="{'bg-shark-400 text-white border-shark-400 border-2': index%2 === 0}">
          <td
            v-for="(heading, index2) in keys"
            :key="index2"
            :class="{
              left: heading === 'Adop' || heading === 'Description',
              right: heading === 'Amount',
              'text-white': heading ==='Type' && index%2 === 0,
              'bg-green-400': data[heading] === 'earn' || data[heading] === 'deposit',
              'bg-red-400': data[heading] === 'spend' || data[heading] === 'withdraw',
            }"
            class="h-12 max-w-sm my-text-base font-semibold"
          >
            {{ data[heading] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },
  data() {
    return {
      keys: Object.keys(this.data[0]) ,
    };
  },
};
</script>

<style lang="scss" scoped>
$bg-clr: #e5e5e5;

table {
  margin: 1em auto;
  background-color: $bg-clr;
  
  border-collapse: collapse;
  th {
    height: 40px;
    border-right: solid black;
    border-width: 1px;
    &:last-child {
      border: transparent;
    }
  }
  td {
    padding: 0.2em 1em;
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
}</style
>>
