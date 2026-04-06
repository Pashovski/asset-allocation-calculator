import { ref, onMounted } from 'vue'

export function useExchangeRates() {
  const btcRate = ref(null)
  const ethRate = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const initialLoad = ref(true)

  const fetchRates = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(
        'https://api.coinbase.com/v2/exchange-rates?currency=USD'
      )

      if (!response.ok) {
        error.value = `Failed to fetch rates (HTTP ${response.status})`
        return
      }

      const data = await response.json()

      if (!data.data || !data.data.rates || !data.data.rates.BTC || !data.data.rates.ETH) {
        error.value = 'BTC or ETH rate not available'
        return
      }

      btcRate.value = parseFloat(data.data.rates.BTC)
      ethRate.value = parseFloat(data.data.rates.ETH)
    } catch (err) {
      btcRate.value = null
      ethRate.value = null
      error.value = 'Unable to load exchange rates. Please try again.'
      console.error(err)
    } finally {
      loading.value = false
      initialLoad.value = false
    }
  }

  // Fetch rates on component mount
  onMounted(() => {
    fetchRates()
  })

  return {
    btcRate,
    ethRate,
    loading,
    error,
    initialLoad,
    fetchRates
  }
}
