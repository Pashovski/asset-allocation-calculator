## Asset Allocation Calculator

A web app that calculates a 70/30 BTC/ETH allocation based on a USD investment amount, using live exchange rates from Coinbase.

### Running the project

```bash
npm install
npm run dev
```

### Tech choices

- **Vite + Vue 3** with Composition API (`<script setup>`)
- **Scoped styles** in single-file components
- **Composable** (`useExchangeRates`) to encapsulate API logic

### Design decisions

- **Reactive computed allocations** — results update as you type, no manual calculate button
- **`<output>` elements** for allocation results — semantic HTML for calculated values
- **`aria-live` region** so screen readers announce updated allocations
- **Error recovery** with retry capability
- **Responsive two-column layout** that stacks on mobile

### Given more time

- Configurable allocation percentages
- Unit tests with Vitest
- Input formatting (commas)
