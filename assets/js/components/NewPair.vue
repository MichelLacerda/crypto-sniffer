<template>
  <div class="row blue-grey darken-3 white-text">
    <form style="padding-top: 1rem">
      <div class="input-field col s9">
        <select v-model="tickerSelected">
          <option
            v-for="option in tickers"
            v-bind:value="option"
            v-bind:key="option"
          >{{ option }}</option>
        </select>
        <label>Pairs</label>
      </div>
      <div class="input-field col s3">
        <button
          type="button"
          class="btn btn-block waves-effect waves-light"
          @click="handleAddHighlights"
        ><i class="material-icons">add</i></button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    tickers: Array,
  },
  data() {
    return {
      tickerSelected: "",
      highlights: [],
    };
  },
  watch: {
    highlights(newValue, oldValue) {
      chrome.storage.sync.set({ highlights: newValue }, () => {});
    },
  },
  methods: {
    handleAddHighlights: function () {
      if (this.tickerSelected === "") return;
      this.highlights = [...this.highlights, this.tickerSelected];
      this.tickerSelected = "";
    },
  },
  mounted() {
    chrome.storage.sync.get(["highlights"], (storage) => {
      this.highlights = storage.highlights;
    });
  },
};
</script>

<style>
</style>