<template>
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
        novalidate
      >
        <div class="input-field col s12">
          <select
            v-model="snifferPair"
            required
          >
            <option
              v-for="option in highlights"
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
            v-for="(sniffer, index) in sniffers"
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
</template>

<script>
const makeId = () => Math.random().toString(36).substring(7);

export default {
  props: {
    highlights: Array,
  },
  data() {
    return {
      snifferPair: "",
      snifferOp: "",
      snifferValue: "",
      opOptions: [">=", "<="],
      sniffers: [],
    };
  },
  watch: {
    sniffers(newValue) {
      chrome.storage.sync.set({ sniffers: newValue }, () => {});
    },
  },
  mounted() {
    chrome.storage.sync.get(["sniffers"], (storage) => {
      this.sniffers = storage.sniffers;
    });
    this.$nextTick(function () {
      new SimpleBar(document.getElementById("sniffers"));
    });
  },
  methods: {
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
};
</script>

<style>
</style>