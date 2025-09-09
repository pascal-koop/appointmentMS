<template>
  <div class="backend-status">
    <h3>Backend Status</h3>

    <div v-if="loading" class="status-loading">
      <p>Checking backend status...</p>
    </div>

    <div v-else-if="error" class="status-error">
      <p>❌ Backend Error: {{ error }}</p>
      <button @click="checkHealth" class="retry-btn">
        Retry
      </button>
    </div>

    <div v-else class="status-success">
      <p>✅ Backend is running!</p>
      <div class="status-details">
        <p><strong>Status:</strong> {{ healthData?.status }}</p>
        <p><strong>Last Check:</strong> {{ formatTimestamp(healthData?.timestamp) }}</p>
      </div>
      <button @click="checkHealth" class="refresh-btn">
        Refresh
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ApiService, type HealthResponse } from '~/utils/api'

// Reactive data
const loading = ref(true)
const error = ref<string | null>(null)
const healthData = ref<HealthResponse | null>(null)

// Methods
const checkHealth = async () => {
  loading.value = true
  error.value = null

  try {
    healthData.value = await ApiService.getHealth()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

const formatTimestamp = (timestamp?: string) => {
  if (!timestamp) return 'N/A'
  return new Date(timestamp).toLocaleString()
}

// Lifecycle
onMounted(() => {
  checkHealth()
})
</script>

<style scoped>
.backend-status {
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: #f8fafc;
  max-width: 400px;
}

.backend-status h3 {
  margin: 0 0 1rem 0;
  color: #1e293b;
}

.status-loading {
  color: #64748b;
}

.status-error {
  color: #dc2626;
}

.status-success {
  color: #059669;
}

.status-details {
  margin: 0.5rem 0;
  font-size: 0.875rem;
}

.status-details p {
  margin: 0.25rem 0;
}

.retry-btn, .refresh-btn {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.retry-btn {
  background-color: #dc2626;
  color: white;
}

.retry-btn:hover {
  background-color: #b91c1c;
}

.refresh-btn {
  background-color: #059669;
  color: white;
}

.refresh-btn:hover {
  background-color: #047857;
}
</style>