<template>
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
    <Donate />

  </div>
</template>

<script>
import Donate from "./Donate";

export default {
  components: {
      Donate
  },
  data() {
    return {
      notifications: false,
      updateInterval: 15,
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
  watch: {
    notifications(newValue) {
      chrome.storage.sync.set({ notifications: newValue }, () => {});
    },
    updateInterval(newValue) {
      chrome.storage.sync.set({ updateInterval: newValue }, () => {});
    },
  },
  mounted() {
    chrome.storage.sync.get(["notifications", "updateInterval"], (storage) => {
      this.notifications = storage.notifications;
      this.updateInterval = storage.updateInterval;
    });
  },
};
</script>

<style>
</style>