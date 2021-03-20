<template>
  <div
    class="container blue-grey darken-4"
    id="app"
  >
    <div
      class="row nm"
      style="margin-bottom: 0"
    >
      <ul class="tabs">
        <li class="tab col s4"><a
            class="active"
            href="#pairs"
          >pairs</a></li>
        <li class="tab col s4"><a href="#sniffers">sniffers</a></li>
        <li class="tab col s4"><a href="#settings">settings</a></li>
      </ul>
      <!-- PAIRS TAB -->
      <div
        id="pairs"
        class="col s12"
      >
        <NewPair v-bind:tickers="getValidTickers" />
        <Highlight v-bind:highlights="getHighlights" />
        <div
          class="row"
          style="margin-bottom: 0"
        >
          <div class="col s12 grey-text lighten-4 center-align">{{ updatedAt }}</div>
        </div>
      </div>
      <!-- SNIFFERS TAB -->
      <Sniffer v-bind:highlights="getHighlights" />
      <!-- SETTINGS TAB -->
      <Settings />
    </div>
  </div>
</template>

<script>
import Highlight from "./Highlight";
import NewPair from "./NewPair";
import Settings from "./Settings";
import Sniffer from "./Sniffer";

const makeId = () => Math.random().toString(36).substring(7);
export default {
  components: {
    Highlight,
    NewPair,
    Settings,
    Sniffer
  },
  data() {
    return {
      updatedAt: "",
      tickers: [],
      sniffers: [],
      highlights: [],
      validTickers: [],
    };
  },
  mounted() {
    this.updateData();
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === "sync") {
        if (changes.tickers) {
          this.tickers = changes.tickers.newValue;
        }
        if (changes.highlights) {
          this.highlights = changes.highlights.newValue;
        }
      }
    });
    this.$nextTick(function () {
      this.setupMaterial();
    });
  },
  updated() {
    M.FormSelect.init(document.querySelectorAll("select"), {});
  },
  computed: {
    getHighlights: function () {
      if (!this.tickers.length) return [];
      return this.tickers.filter((e) => this.highlights.includes(e.symbol));
    },
    getValidTickers: function () {
      return this.validTickers.filter((e) => !this.highlights.includes(e));
    },
  },
  watch: {
    highlights(newValue) {
      chrome.storage.sync.set({ highlights: newValue }, () => {});
    },
    sniffers(newValue) {
      chrome.storage.sync.set({ sniffers: newValue }, () => {});
    },
  },
  methods: {
    setupMaterial: function () {
      M.Tabs.init(document.querySelector(".tabs"), {
        swipeable: false,
        responsiveThreshold: 500,
      });
      M.FormSelect.init(document.querySelectorAll("select"), {});

      new SimpleBar(document.getElementById("pairs"));
    },
    updateData: function () {
      let fields = [
        "tickers",
        "highlights",
        "validTickers",
        "sniffers",
        "updatedAt",
      ];
      chrome.storage.sync.get(fields, (storage) => {
        this.tickers = storage.tickers;
        this.highlights = storage.highlights;
        this.validTickers = storage.validTickers;
        this.sniffers = storage.sniffers;
        this.updatedAt = storage.updatedAt;
      });
    },
    upperOrDown: function (value) {
      return value >= 0 ? "▲" : "▼";
    },
    iconClass: function (value) {
      let iconStr = (ticker) => `cf-${ticker}`;
      let tickerSplited = value.split("USDT");
      if (tickerSplited.length === 2) {
        return iconStr(tickerSplited[0]).toLowerCase();
      }
      return "cf-" + value.substr(0, 3).toLowerCase();
    },
    highlightsIcon: function (value) {
      return this.highlights.includes(value) ? "star" : "star_border";
    },
    highlightsPair: function (symbol) {
      if (this.highlights.includes(symbol)) {
        this.highlights = this.highlights.filter((e) => e !== symbol);
      } else {
        this.highlights = [...this.highlights, symbol];
      }
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