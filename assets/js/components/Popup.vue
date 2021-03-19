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
        <NewPair
          v-bind:tickers="getValidTickers"
        />
        <Highlight v-bind:highlights="getHighlights" />
        <div class="row" style="margin-bottom: 0">
          <div class="col s12 grey-text lighten-4 center-align">{{ updatedAt }}</div>
        </div>
      </div>
      <!-- SNIFFERS TAB -->
      <div
        id="sniffers"
        class="col s12"
      >
        <div
          class="row blue-grey darken-3 white-text"
          style="padding-top: 0.75rem; padding-bottom: 0.75rem; margin-bottom: 4px"
        >
          <form
            @submit="addSniffer"
            name="addSnifferForm"
            novalidate
          >
            <div class="input-field col s12">
              <select
                v-model="snifferPair"
                name="snifferSymbol"
                required
              >
                <option
                  v-for="option in getHighlights"
                  :value="option.symbol"
                  :key="option.symbol"
                >{{ option.symbol }}</option>
              </select>
              <label>Pairs</label>
            </div>

            <div class="input-field col s6">
              <select v-model="snifferOp">
                <option
                  v-for="(option, index) in opOptions"
                  :key="index"
                  :value="option"
                >{{ option }}</option>
              </select>
              <label>Condition</label>
            </div>
            <div class="input-field col s6">
              <input
                placeholder="57407.43"
                id="value"
                type="number"
                step="0.1"
                v-model="snifferValue"
                class="validate"
                required
              />
              <label for="value">Value</label>
            </div>
            <div class="input-field col s12">
              <button
                type="submit"
                class="btn btn-block waves-effect waves-light"
              >
                add sniffer
              </button>
            </div>
          </form>
        </div>
        <div class="row blue-grey darken-3 white-text">
          <table
            style="padding-top: 0.75rem; margin-bottom: 0px"
            v-show="sniffers.length"
          >
            <thead>
              <tr>
                <th class="left-align">Ticker</th>
                <th class="center-align">Condition</th>
                <th class="right-align">Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(sniffer, index) in getSniffers"
                :key="index"
              >
                <td class="left-align">{{ sniffer.symbol }}</td>
                <td class="center-align">{{ sniffer.op }}</td>
                <td class="right-align">{{ sniffer.value }}</td>
                <td class="right-align"><i
                    class="material-icons red-text"
                    style="font-size: 16px; cursor: pointer"
                    v-on:click="removeSniffer(sniffer.id)"
                  >delete</i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- SETTINGS TAB -->
      <div
        id="settings"
        class="col s12"
      >
        <div
          class="row blue-grey darken-3 white-text"
          style="padding-top: 0.75rem;padding-bottom: 0.75rem; margin-bottom: 4px"
        >
          <div class="input-field col s12">
            <div class="switch">
              Show notifications?
              <label>
                <input
                  type="checkbox"
                  v-model="notifications"
                  :value="notifications"
                  v-on:change="handleShowNotifications"
                >
                <span class="lever"></span>
              </label>
            </div>
          </div>
        </div>
        <div
          class="row blue-grey darken-3 white-text"
          style="padding-top: 0.75rem;padding-bottom: 0.75rem "
        >
          <div class="input-field col s12">
            <select v-model="updateInterval">
              <option
                v-for="option in updateIntervals"
                :value="option.value"
                :key="option.value"
              >{{ option.text }}</option>
            </select>
            <label>Update interval</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Highlight from "./Highlight";
import NewPair from "./NewPair";
const makeId = () =>
    Math.random()
        .toString(36)
        .substring(7);
export default {
  components: {
    Highlight,
    NewPair,
  },
  data() {
    return {
      updatedAt: "",
      notifications: false,
      updateInterval: 15,
      tickers: [],
      monitoring: [],
      sniffers: [],
      monitoringSelected: "",
      highlights: [],
      validTickers: [],
      snifferPair: "",
      snifferOp: "",
      snifferValue: "",
      opOptions: [">=", "<="],
      updateIntervals: [
        {
          text: "15m",
          value: 15,
        },
        {
          text: "30m",
          value: 30,
        },
        {
          text: "45m",
          value: 45,
        },
        {
          text: "1h",
          value: 60,
        },
        {
          text: "2h",
          value: 120,
        },
        {
          text: "4h",
          value: 240,
        },
        {
          text: "8h",
          value: 480,
        },
      ],
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
    getSniffers: function () {
      if (!this.tickers.length || !this.sniffers.length) return [];
      let monitoring = this.tickers.map((e) => e.symbol);
      let sniffers = this.sniffers.filter((e) => monitoring.includes(e.symbol));
      this.sniffers = sniffers;
      return sniffers;
    },
  },
  watch: {
    highlights(newValue, oldValue) {
      chrome.storage.sync.set({ highlights: newValue }, () => {});
    },
    monitoring(newValue, oldValue) {
      chrome.storage.sync.set({ monitoring: newValue }, () => {});
    },
    sniffers(newValue, oldValue) {
      chrome.storage.sync.set({ sniffers: newValue }, () => {});
    },
    notifications(newValue, oldValue) {
      chrome.storage.sync.set({ notifications: newValue }, () => {});
    },
    updateInterval(newValue, oldValue) {
      chrome.storage.sync.set({ updateInterval: newValue }, () => {});
    },
  },
  methods: {
    setupMaterial: function () {
      M.Tabs.init(document.querySelector(".tabs"), { swipeable: false, responsiveThreshold: 500 });
      M.FormSelect.init(document.querySelectorAll("select"), {});

      new SimpleBar(document.getElementById("pairs"));
      new SimpleBar(document.getElementById("sniffers"));
    },
    updateData: function () {
      let fields = [
        "tickers",
        // "monitoring",
        "highlights",
        "validTickers",
        "sniffers",
        "notifications",
        "updateInterval",
        "updatedAt",
      ];
      chrome.storage.sync.get(fields, (storage) => {
        this.tickers = storage.tickers;
        // this.monitoring = storage.monitoring;
        this.highlights = storage.highlights;
        this.validTickers = storage.validTickers;
        this.sniffers = storage.sniffers;
        this.notifications = storage.notifications;
        this.updateInterval = storage.updateInterval;
        this.updatedAt = storage.updatedAt;
      });
    },
    handleShowNotifications: function () {
      console.log(this.notifications);
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
    addMonitoring: function () {
      if (this.monitoringSelected === "" || !this.monitoring) return;
      this.monitoring = [...this.monitoring, this.monitoringSelected];
      this.monitoringSelected = "";
    },
    removeMonitoring: function (symbol) {
      this.monitoring = this.monitoring.filter((e) => e !== symbol);
    },

    addSniffer: function (e) {
      e.preventDefault();

      if (!this.snifferPair || !this.snifferOp || !this.snifferValue) return;

      let newSniffer = {
        id: makeId(),
        symbol: this.snifferPair,
        op: this.snifferOp,
        value: this.snifferValue,
      };
      this.sniffers = [...this.sniffers, newSniffer];
    },
    removeSniffer: function (id) {
      this.sniffers = this.sniffers.filter((e) => e.id !== id);
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