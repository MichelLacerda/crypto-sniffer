<template>
  <div
    class="row blue-grey darken-2 white-text"
    id="wallet"
  >
  <div class="input-field col s12">
    <input
      class="col s12"
      type="text"
      name="wallet"
      v-model="wallet"
      v-on:click="handleCopy"
    >
    <label>{{getLabelText}}</label>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wallet: "0x99C574698465384c4E70A36dEdEb6Aa7963Bacb0",
      copied: false,
    };
  },
  methods: {
    handleCopy: function () {
      let inputToCopy = document.querySelector("#wallet input");
      inputToCopy.select();
      document.execCommand("copy");
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2500);
    },
  },
  computed: {
      getLabelText: function() {
          return this.copied ? 'Copied' : 'Donate'
      }
  }
};
</script>

<style>
</style>