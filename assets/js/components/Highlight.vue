<template>
  <div class="highlights">
    <div
      class="row blue-grey darken-3 white-text highlight"
      v-for="(highlight, index) in highlights"
      v-bind:key="index"
    >
      <div class="col s2" style="padding-left: 10px">
        <i
          class="cf"
          v-bind:class="iconClass(highlight.symbol)"
          style="font-size: 48px; margin-top: 2px"
        ></i>
      </div>
      <div class="col s5 center-align">
        <div
          class="row"
          style="margin-bottom: unset"
        >
          <div class="col s12">
            <strong style="font-size: 16px">{{ highlight.symbol }}</strong>
          </div>
          <div class="col s12">
            <span class="blue-grey-text text-lighten-2">VOL</span>
            {{ highlight.volume | toLocale }}
          </div>
          <div class="col s12">
            <span class="blue-grey-text text-lighten-2">LOW</span>
            {{ highlight.low | toLocale }}
          </div>
        </div>
      </div>
      <div class="col s5 center-align">
        <div
          class="row"
          style="margin-bottom: unset"
        >
          <div class="col s12">
            <strong style="font-size: 16px">{{ highlight.last | toLocale
                    }}<span class="blue-grey-text text-lighten-2"></span></strong>
          </div>
          <div
            class="col s12"
            v-bind:class="{
                    'red-text': highlight.variation < 0,
                    'green-text': highlight.variation >= 0,
                  }"
          >
            {{ highlight.priceChange }}
            <span v-text="upperOrDown(highlight.variation)"></span> ({{
                    highlight.variation | toFixed(2)
                  }}%)
          </div>
          <div class="col s12">
            <span class="blue-grey-text text-lighten-2">HIGH</span>
            {{ highlight.high | toLocale }}
          </div>
        </div>
      </div>
      <i
        class="material-icons remove-highlight"
        v-on:click="handleRemoveHighlights(highlight.symbol)"
      >close</i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    highlights: Array,
  },
  methods: {
    iconClass: function (value) {
      let iconStr = (ticker) => `cf-${ticker}`;
      let tickerSplited = value.split("USDT");
      if (tickerSplited.length === 2) {
        return iconStr(tickerSplited[0]).toLowerCase();
      }
      return "cf-" + value.substr(0, 3).toLowerCase();
    },
    upperOrDown: function (value) {
      return value >= 0 ? "▲" : "▼";
    },
    handleRemoveHighlights: function (symbol) {
      let newHighlights =
        this.highlights &&
        this.highlights.filter((x) => x.symbol !== symbol).map((y) => y.symbol);
      chrome.storage.sync.set({ highlights: newHighlights }, () => {});
    },
  },
  filters: {
    toLocale: function (value) {
      return (
        value &&
        value.toLocaleString("en", {
          maximumFractionDigits: 8,
        })
      );
    },
    toFixed: function (value, fixed = 2) {
      return value && value.toFixed(fixed);
    },
  },
};
</script>

<style>
</style>