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
      <div
        id="pairs"
        class="col s12"
      >
        <!-- Highlights -->
        <div class="div">
          <div
            v-for="(item, index) in getHighlights"
            v-bind:key="index"
            class="row blue-grey darken-3 white-text"
            style="padding: 8px 0; margin-bottom: 4px"
          >
            <div class="col s2">
              <i
                class="cf"
                v-bind:class="iconClass(item.symbol)"
                style="font-size: 48px; margin-top: 2px"
              ></i>
            </div>
            <div class="col s5 center-align">
              <div
                class="row"
                style="margin-bottom: unset"
              >
                <div class="col s12">
                  <strong style="font-size: 16px">{{ item.symbol }}</strong>
                </div>
                <div class="col s12">
                  <span class="blue-grey-text text-lighten-2">VOL</span>
                  {{ item.volume | toLocale }}
                </div>
                <div class="col s12">
                  <span class="blue-grey-text text-lighten-2">LOW</span>
                  {{ item.low | toLocale }}
                </div>
              </div>
            </div>
            <div class="col s5 center-align">
              <div
                class="row"
                style="margin-bottom: unset"
              >
                <div class="col s12">
                  <strong style="font-size: 16px">{{ item.last | toLocale
                    }}<span class="blue-grey-text text-lighten-2">LOW</span></strong>
                </div>
                <div
                  class="col s12"
                  v-bind:class="{
                    'red-text': item.variation < 0,
                    'green-text': item.variation >= 0,
                  }"
                >
                  {{ item.priceChange }}
                  <span v-text="upperOrDown(item.variation)"></span> ({{
                    item.variation | toFixed(2)
                  }}%)
                </div>
                <div class="col s12">
                  <span class="blue-grey-text text-lighten-2">HIGH</span>
                  {{ item.high | toLocale }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- pairs -->
        <div class="row blue-grey darken-3 white-text">
          <form style="padding-top: 0.75rem">
            <div class="input-field col s9">
              <select v-model="monitoringSelected">
                <option
                  v-for="option in getValidTickers"
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
                @click="addMonitoring"
              ><i class="material-icons">add</i></button>
            </div>
          </form>
          <table class="">
            <thead>
              <tr>
                <th>NAME</th>
                <th class="right-align">LAST</th>
                <th class="right-align">24H</th>
                <th class="right-align">VOL</th>
                <th class="right-align"></th>
                <th class="right-align"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(pair, index) in getMonitorings"
                :key="index"
              >
                <td>
                  <i
                    class="cf"
                    v-bind:class="iconClass(pair.symbol)"
                  ></i>
                  {{ pair.symbol }}
                </td>
                <td class="right-align">
                  {{ pair.last | toLocale }}
                  <span class="blue-grey-text text-lighten-2">USDT</span>
                </td>
                <td
                  class="right-align"
                  :class="{
                    'red-text': pair.variation < 0,
                    'green-text': pair.variation >= 0,
                  }"
                >
                  {{ pair.variation | toLocale }}%
                </td>
                <td class="right-align">
                  <span>{{ pair.volume | toLocale }}</span>

                </td>
                <td class="right-align"><i
                    class="material-icons yellow-text"
                    style="font-size: 16px; cursor: pointer"
                    v-on:click="highlightsPair(pair.symbol)"
                  >
                    {{ highlightsIcon(pair.symbol) }}
                  </i>
                </td>
                <td class="right-align"><i
                    class="material-icons red-text"
                    style="font-size: 16px; cursor: pointer"
                    v-on:click="removeMonitoring(pair.symbol)"
                  >delete</i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
                  v-for="option in getMonitorings"
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
                <th class="center-align">Cond.</th>
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
                    v-on:click="removeSniffer(sniffer.symbol)"
                  >delete</i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
                <input type="checkbox" v-model="notifications" :value="notifications" v-on:change="handleShowNotifications">
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
export default {
  data() {
    return {
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
          text: '1m',
          value: 1
        },
        {
          text: '15m',
          value: 15
        },
        {
          text: '30m',
          value: 30
        },
        {
          text: '45m',
          value: 45
        },
        {
          text: '1h',
          value: 60
        },
        {
          text: '2h',
          value: 120
        },
        {
          text: '4h',
          value: 240
        },
        {
          text: '8h',
          value: 480
        },
      ]
    };
  },
  created() {
    // this.updateData();
    /* chrome.storage.onChanged.addListener((changes, namespace) => {
      this.updateData();
    }); */
  },
  mounted() {
    this.updateData();
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === "sync") {
        if (changes.tickers) {
          this.tickers = changes.tickers.newValue;
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
    getMonitorings: function () {
      if (!this.tickers.length) return [];
      return this.tickers.filter((e) => this.monitoring.includes(e.symbol));
    },
    getValidTickers: function () {
      return this.validTickers.filter((e) => !this.monitoring.includes(e));
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
      M.Tabs.init(document.querySelector(".tabs"), { swipeable: true });
      M.FormSelect.init(document.querySelectorAll("select"), {});

      new SimpleBar(document.getElementById("pairs"));
      new SimpleBar(document.getElementById("sniffers"));
    },
    updateData: function () {
      chrome.storage.sync.get(
        ["tickers", "monitoring", "highlights", "validTickers", "sniffers", "notifications", "updateInterval"],
        (storage) => {
          this.tickers = storage.tickers;
          this.monitoring = storage.monitoring;
          this.highlights = storage.highlights;
          this.validTickers = storage.validTickers;
          this.sniffers = storage.sniffers;
          this.notifications = storage.notifications;
          this.updateInterval = storage.updateInterval;
        }
      );
    },
    handleShowNotifications:  function () {
      console.log(this.notifications)
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
        symbol: this.snifferPair,
        op: this.snifferOp,
        value: this.snifferValue,
      };
      this.sniffers = [...this.sniffers, newSniffer];
    },
    removeSniffer: function (symbol) {
      this.sniffers = this.sniffers.filter((e) => e.symbol !== symbol);
    },
  },
  filters: {
    toLocale: function (value) {
      return value.toLocaleString("en", {
        maximumFractionDigits: 8,
      });
    },
    toFixed: function (value, fixed) {
      return value.toFixed(fixed);
    },
  },
};
</script>