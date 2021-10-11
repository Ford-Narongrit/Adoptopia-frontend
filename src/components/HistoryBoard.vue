<template>
  <div>
    <table class="w-3/5 max-h-96">
      <thead>
        <tr>
          <th v-for="(heading, index) in keys" :key="index">{{ heading }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in data" :key="index">
          <td
            v-for="(heading, index) in keys"
            :key="index"
            :class="{
              left: heading === 'Name' || heading === 'User' || heading === 'Description',
              right: heading === 'Amount',
            }"
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
