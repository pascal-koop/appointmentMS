<script setup lang="ts">
// This page demonstrates the monorepo setup with frontend-backend integration
</script>

<template>
  <div class="container">
    <h1>Appointment Management System</h1>
    <p class="subtitle">Full-stack monorepo with Nuxt.js + NestJS</p>

    <div class="content">
      <div class="section">
        <h2>Frontend (Nuxt.js)</h2>
        <p>✅ Running on http://localhost:3000</p>
        <NuxtLink to="/login" class="btn">Go to Login</NuxtLink>
      </div>

      <div class="section">
        <BackendStatus />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #1e293b;
  text-align: center;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #64748b;
  margin-bottom: 3rem;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.section {
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
}

.section h2 {
  margin: 0 0 1rem 0;
  color: #1e293b;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 0.25rem;
  margin-top: 1rem;
}

.btn:hover {
  background-color: #2563eb;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
