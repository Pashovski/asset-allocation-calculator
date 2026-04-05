<script setup>
defineProps({
  amount: {
    type: Number,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  usdValue: {
    type: Number,
    required: true
  },
  maxDecimals: {
    type: Number,
    default: 8
  }
})
</script>

<template>
  <div class="allocation-item">
    <label class="allocation-label" :for="symbol.toLowerCase() + '-amount'">{{ percentage }}% {{ symbol }} allocation</label>
    <output
      :id="symbol.toLowerCase() + '-amount'"
      class="amount-field"
      :aria-label="`${amount.toFixed(maxDecimals)} ${symbol}`"
    >{{ amount.toFixed(maxDecimals) }}</output>
  </div>
</template>

<style scoped>
.allocation-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.allocation-label {
  font-weight: 600;
  font-size: 0.95em;
  color: #213547;
}

.amount-field {
  padding: 0.75em;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  background-color: #ffffff;
  color: #213547;
  font-family: monospace;
  font-size: 0.95em;
  word-break: break-all;
}
</style>
