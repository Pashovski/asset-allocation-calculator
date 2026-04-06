<script setup>
import { ref, computed } from 'vue'
import AssetInput from './components/AssetInput.vue'
import AllocationResult from './components/AllocationResult.vue'
import { useExchangeRates } from './composables/useExchangeRates'

const { btcRate, ethRate, loading, error, initialLoad, fetchRates } = useExchangeRates()
const usdAmount = ref(null)

const allocations = computed(() => {
  // Return empty array if usdAmount is invalid
  if (!usdAmount.value || usdAmount.value <= 0) {
    return []
  }

  // Return empty array if rates aren't loaded yet
  if (!btcRate.value || !ethRate.value) {
    return []
  }

  const btcUsdValue = usdAmount.value * 0.7
  const ethUsdValue = usdAmount.value * 0.3

  return [
    {
      symbol: 'BTC',
      percentage: 70,
      usdValue: btcUsdValue,
      amount: btcUsdValue * btcRate.value
    },
    {
      symbol: 'ETH',
      percentage: 30,
      usdValue: ethUsdValue,
      amount: ethUsdValue * ethRate.value
    }
  ]
})
</script>

<template>
  <div class="app">
    <div class="header">
      <h1>Asset allocation calculator</h1>
      <button class="refresh-button" @click="fetchRates" :disabled="loading" aria-label="Refresh exchange rates">{{ loading ? (initialLoad ? 'Loading...' : 'Refreshing...') : 'Refresh rates' }}</button>
    </div>

    <!-- Error state -->
    <div v-if="error" class="status error" role="alert">
      <span>{{ error }}</span>
      <button class="retry-button" @click="fetchRates" aria-label="Retry fetching exchange rates">Retry</button>
    </div>

    <div class="container">
      <!-- Input section (left) -->
      <div class="input-section">
        <AssetInput @update:amount="usdAmount = $event" />
      </div>

      <!-- Results section (right) -->
      <div class="results-section" aria-live="polite">
        <div v-if="allocations.length" class="results">
          <AllocationResult
            v-for="allocation in allocations"
            :key="allocation.symbol"
            :amount="allocation.amount"
            :symbol="allocation.symbol"
            :percentage="allocation.percentage"
            :usd-value="allocation.usdValue"
            :max-decimals="allocation.symbol === 'BTC' ? 8 : 6"
          />
        </div>

        <div v-else class="placeholder">
          Enter an amount to see your allocation breakdown
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  text-align: left;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

h1 {
  font-size: 1.75rem;
  margin-top: 0;
  margin-bottom: 0;
}

.refresh-button {
  padding: 0.4em 0.8em;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  background-color: #ffffff;
  color: #213547;
  font-size: 0.9em;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
}

.refresh-button:hover:not(:disabled) {
  border-color: #999;
}

.refresh-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.input-section {
  display: flex;
  flex-direction: column;
}

.results-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.status {
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  background-color: #e8f5e9;
  color: #2e7d32;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status.error {
  background-color: #ffebee;
  color: #c62828;
}

.retry-button {
  padding: 0.4em 0.8em;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  background-color: #ffffff;
  color: #213547;
  font-size: 0.9em;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
}

.retry-button:hover {
  border-color: #999;
}

.placeholder {
  color: #999;
  margin: 2rem 0;
  padding: 2rem;
  text-align: center;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
