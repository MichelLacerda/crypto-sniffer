<template>
  <div
    class="row blue-grey darken-3 white-text"
    style="margin-bottom: 4px"
  >
    <form style="padding-top: 1rem">
      <div class="input-field col s12" v-show="!loading">
        <select v-model="tickerSelected">
          <option
            v-for="option in tickers"
            v-bind:value="option"
            v-bind:key="option"
          >{{ option }}</option>
        </select>
        <label>Pairs</label>
      </div>
      <div class="col s12" v-show="loading">
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
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
      loading: false
    };
  },
  watch: {
    highlights(newValue) {
      chrome.storage.sync.set({ highlights: newValue }, () => {});
    },
    tickerSelected(newValue) {
      if (newValue === "") return;
      this.loading = true;
      this.highlights = [...this.highlights, newValue];
      this.tickerSelected = "";
      // setTimeout(() => {this.loading = false}, 2500)    
    },
  },
  mounted() {
    chrome.storage.sync.get(["highlights"], (storage) => {
      this.highlights = storage.highlights;
    });
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === "sync") {
        if (changes.tickers) {
          this.loading = false;
        }
      }
    });
  },
};
</script>

<style>
</style>