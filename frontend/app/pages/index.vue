<script setup lang="ts">
// Navigation state
const isMenuOpen = ref(false);

// Smooth scroll function for navigation links
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Floating circles -->
      <div
        class="absolute top-20 left-10 w-4 h-4 bg-orange-400 rounded-full animate-bounce opacity-60"
      ></div>
      <div
        class="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full animate-pulse opacity-40"
      ></div>
      <div
        class="absolute bottom-40 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-50"
      ></div>
      <div
        class="absolute top-1/2 right-1/3 w-5 h-5 bg-green-400 rounded-full animate-bounce opacity-30"
      ></div>

      <!-- Curved line decoration -->
      <div
        class="absolute bottom-20 left-10 w-32 h-32 border-2 border-dashed border-white/20 rounded-full transform rotate-45"
      ></div>
      <div class="absolute bottom-16 left-32 w-2 h-2 bg-orange-400 rounded-full"></div>

      <!-- Gradient orbs -->
      <div
        class="absolute top-1/3 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
      ></div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-10 px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div
            class="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center"
          >
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <span class="text-xl font-bold text-white">AppointMate</span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <button
            @click="scrollToSection('features')"
            class="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </button>
          <button
            @click="scrollToSection('pricing')"
            class="text-gray-300 hover:text-white transition-colors"
          >
            Pricing
          </button>
          <button
            @click="scrollToSection('testimonials')"
            class="text-gray-300 hover:text-white transition-colors"
          >
            Testimonials
          </button>
          <NuxtLink
            to="/login"
            class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Login
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="isMenuOpen"
        class="md:hidden mt-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4"
      >
        <div class="flex flex-col space-y-4">
          <button
            @click="scrollToSection('features')"
            class="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </button>
          <button
            @click="scrollToSection('pricing')"
            class="text-gray-300 hover:text-white transition-colors"
          >
            Pricing
          </button>
          <button
            @click="scrollToSection('testimonials')"
            class="text-gray-300 hover:text-white transition-colors"
          >
            Testimonials
          </button>
          <NuxtLink
            to="/login"
            class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors text-center"
          >
            Login
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative z-10 px-6 py-20">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
          Never miss an
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500"
            >appointment</span
          >
          again
        </h1>

        <p class="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Stay organized and on time with smart appointment reminders, calendar sync, and
          intelligent scheduling that adapts to your busy lifestyle.
        </p>

        <!-- Call to Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink
            to="/register"
            class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 group"
          >
            <span>Get Started</span>
            <svg
              class="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </NuxtLink>

          <NuxtLink
            to="/login"
            class="bg-transparent border-2 border-gray-600 hover:border-gray-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 group"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Sign In</span>
          </NuxtLink>
        </div>

        <!-- Feature highlights -->
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-white font-semibold mb-2">Smart Reminders</h3>
            <p class="text-gray-400">
              Get notified at the perfect time with intelligent reminder scheduling
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 class="text-white font-semibold mb-2">Calendar Sync</h3>
            <p class="text-gray-400">
              Seamlessly integrate with your existing calendar applications
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h3 class="text-white font-semibold mb-2">AI Insights</h3>
            <p class="text-gray-400">
              Get personalized scheduling recommendations and insights
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <section id="testimonials" class="relative z-10 px-6 py-20">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Loved by thousands of
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500"
              >busy professionals</span
            >
          </h2>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            See how AppointMate has transformed the way people manage their schedules and
            never miss important meetings.
          </p>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div
            class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div class="flex items-center mb-6">
              <div
                class="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4"
              >
                S
              </div>
              <div>
                <h4 class="text-white font-semibold">Sarah Johnson</h4>
                <p class="text-gray-400 text-sm">Marketing Director</p>
              </div>
            </div>
            <p class="text-gray-300 mb-4">
              "AppointMate has been a game-changer for my busy schedule. The smart
              reminders are incredibly accurate, and I love how it syncs with all my
              calendars. No more missed meetings!"
            </p>
            <div class="flex text-orange-400">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div
            class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div class="flex items-center mb-6">
              <div
                class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4"
              >
                M
              </div>
              <div>
                <h4 class="text-white font-semibold">Michael Chen</h4>
                <p class="text-gray-400 text-sm">Software Engineer</p>
              </div>
            </div>
            <p class="text-gray-300 mb-4">
              "As a developer with back-to-back meetings, AppointMate's AI insights have
              been incredible. It knows exactly when to remind me and even suggests better
              meeting times!"
            </p>
            <div class="flex text-orange-400">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div
            class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div class="flex items-center mb-6">
              <div
                class="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4"
              >
                E
              </div>
              <div>
                <h4 class="text-white font-semibold">Emma Rodriguez</h4>
                <p class="text-gray-400 text-sm">Healthcare Professional</p>
              </div>
            </div>
            <p class="text-gray-300 mb-4">
              "Working in healthcare means my schedule is unpredictable. AppointMate's
              flexibility and reliable reminders have been essential for managing patient
              appointments."
            </p>
            <div class="flex text-orange-400">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
            <div class="text-gray-400">Active Users</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold text-white mb-2">1M+</div>
            <div class="text-gray-400">Appointments</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
            <div class="text-gray-400">Uptime</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold text-white mb-2">4.9★</div>
            <div class="text-gray-400">Rating</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Custom animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Gradient text animation */
@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.bg-gradient-animate {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}
</style>
