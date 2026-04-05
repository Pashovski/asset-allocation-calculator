<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update:amount'])

const amount = ref('')

const handleInput = () => {
  const parsedAmount = parseFloat(amount.value)
  if (isNaN(parsedAmount) || parsedAmount === 0) {
    amount.value = ''
    emit('update:amount', null)
  } else {
    emit('update:amount', parsedAmount)
  }
}

const preventInvalidKeys = (e) => {
  if (['e', 'E', '+', '-'].includes(e.key)) {
    e.preventDefault()
  }
}
</script>

<template>
  <div class="asset-input">
    <label for="usd-amount">Investable assets</label>
    <div class="input-group">
      <span class="currency">$</span>
      <input
        id="usd-amount"
        v-model="amount"
        type="number"
        placeholder="0.00"
        min="0"
        step="0.01"
        aria-describedby="usd-amount-hint"
        @input="handleInput"
        @keydown="preventInvalidKeys"
      />
    </div>
    <span id="usd-amount-hint" class="sr-only">Enter a USD amount to calculate your BTC and ETH allocation</span>
  </div>
</template>

<style scoped>
.asset-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  font-size: 0.95em;
  color: #213547;
}

.input-group {
  display: flex;
  align-items: center;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  background-color: #ffffff;
  overflow: hidden;
}

.currency {
  padding: 0.75em;
  color: #666;
  font-weight: 500;
}

input {
  flex: 1;
  padding: 0.75em;
  border: none;
  font-size: 1em;
  background-color: #ffffff;
  color: #213547;
}

input:focus {
  outline: none;
}

.input-group:focus-within {
  border-color: #999;
}

/* Remove number input spinner arrows */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
