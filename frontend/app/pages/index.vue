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
  <div class="min-h-screen bg-yellow-300 relative overflow-hidden">
    <!-- Neo-Brutalism Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Geometric shapes -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-red-500 transform rotate-45"></div>
      <div class="absolute top-40 right-20 w-16 h-16 bg-blue-600"></div>
      <div
        class="absolute bottom-40 left-1/4 w-12 h-12 bg-green-500 transform rotate-12"
      ></div>
      <div
        class="absolute top-1/2 right-1/3 w-24 h-24 bg-purple-600 transform -rotate-45"
      ></div>

      <!-- Bold stripes -->
      <div class="absolute top-0 left-0 w-full h-4 bg-black transform -skew-y-2"></div>
      <div class="absolute bottom-0 left-0 w-full h-4 bg-black transform skew-y-2"></div>

      <!-- Random rectangles -->
      <div
        class="absolute top-1/3 left-1/4 w-8 h-32 bg-pink-500 transform rotate-90"
      ></div>
      <div class="absolute bottom-1/4 right-1/4 w-16 h-8 bg-orange-500"></div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-10 px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div
            class="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            A
          </div>
          <span class="text-2xl font-black text-black uppercase tracking-wider"
            >AppointMate</span
          >
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-6">
          <button
            @click="scrollToSection('features')"
            class="text-black hover:text-white bg-white hover:bg-black px-6 py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            Features
          </button>
          <button
            @click="scrollToSection('pricing')"
            class="text-black hover:text-white bg-white hover:bg-black px-6 py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            Pricing
          </button>
          <button
            @click="scrollToSection('testimonials')"
            class="text-black hover:text-white bg-white hover:bg-black px-6 py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            Testimonials
          </button>
          <NuxtLink
            to="/login"
            class="bg-red-500 text-white px-8 py-3 font-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
          >
            Login
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="lg:hidden text-black bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="isMenuOpen"
        class="md:hidden mt-4 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6"
      >
        <div class="flex flex-col space-y-4">
          <button
            @click="scrollToSection('features')"
            class="text-black bg-yellow-300 px-6 py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            Features
          </button>
          <button
            @click="scrollToSection('pricing')"
            class="text-black bg-yellow-300 px-6 py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            Pricing
          </button>
          <button
            @click="scrollToSection('testimonials')"
            class="text-black bg-yellow-300 px-6 py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            Testimonials
          </button>
          <NuxtLink
            to="/login"
            class="bg-red-500 text-white px-6 py-3 font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 text-center"
          >
            Login
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative z-10 px-6 py-20">
      <div class="max-w-7xl mx-auto text-center">
        <h1
          class="text-6xl md:text-8xl font-black text-black mb-8 uppercase tracking-tight leading-none"
        >
          Never miss an
          <span class="text-red-500">appointment</span>
          again
        </h1>

        <p class="text-2xl text-black mb-12 max-w-4xl mx-auto font-bold leading-relaxed">
          Stay organized and on time with smart appointment reminders, calendar sync, and
          intelligent scheduling that adapts to your busy lifestyle.
        </p>

        <!-- Call to Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <NuxtLink
            to="/register"
            class="bg-green-500 text-white px-12 py-6 font-black text-xl border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 transition-all duration-200 flex items-center space-x-3 group"
          >
            <span>Get Started</span>
            <svg
              class="w-8 h-8 group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </NuxtLink>

          <NuxtLink
            to="/login"
            class="bg-blue-500 text-white px-12 py-6 font-black text-xl border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 transition-all duration-200 flex items-center space-x-3 group"
          >
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
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
        <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="w-24 h-24 bg-orange-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-6"
            >
              <svg
                class="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-black font-black text-2xl mb-4 uppercase">Smart Reminders</h3>
            <p class="text-black font-bold text-lg">
              Get notified at the perfect time with intelligent reminder scheduling
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-24 h-24 bg-purple-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-6"
            >
              <svg
                class="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 class="text-black font-black text-2xl mb-4 uppercase">Calendar Sync</h3>
            <p class="text-black font-bold text-lg">
              Seamlessly integrate with your existing calendar applications
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-24 h-24 bg-pink-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-6"
            >
              <svg
                class="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h3 class="text-black font-black text-2xl mb-4 uppercase">AI Insights</h3>
            <p class="text-black font-bold text-lg">
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
          <h2
            class="text-5xl md:text-6xl font-black text-black mb-6 uppercase tracking-tight"
          >
            Loved by thousands of
            <span class="text-red-500">busy professionals</span>
          </h2>
          <p class="text-2xl text-black max-w-3xl mx-auto font-bold">
            See how AppointMate has transformed the way people manage their schedules and
            never miss important meetings.
          </p>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div
            class="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 transition-all duration-200"
          >
            <div class="flex items-center mb-6">
              <div
                class="w-16 h-16 bg-red-500 border-4 border-black text-white font-black text-2xl flex items-center justify-center mr-4"
              >
                S
              </div>
              <div>
                <h4 class="text-black font-black text-xl">Sarah Johnson</h4>
                <p class="text-black font-bold">Marketing Director</p>
              </div>
            </div>
            <p class="text-black font-bold text-lg mb-4 leading-relaxed">
              "AppointMate has been a game-changer for my busy schedule. The smart
              reminders are incredibly accurate, and I love how it syncs with all my
              calendars. No more missed meetings!"
            </p>
            <div class="flex text-yellow-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div
            class="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 transition-all duration-200"
          >
            <div class="flex items-center mb-6">
              <div
                class="w-16 h-16 bg-blue-500 border-4 border-black text-white font-black text-2xl flex items-center justify-center mr-4"
              >
                M
              </div>
              <div>
                <h4 class="text-black font-black text-xl">Michael Chen</h4>
                <p class="text-black font-bold">Software Engineer</p>
              </div>
            </div>
            <p class="text-black font-bold text-lg mb-4 leading-relaxed">
              "As a developer with back-to-back meetings, AppointMate's AI insights have
              been incredible. It knows exactly when to remind me and even suggests better
              meeting times!"
            </p>
            <div class="flex text-yellow-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div
            class="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 transition-all duration-200"
          >
            <div class="flex items-center mb-6">
              <div
                class="w-16 h-16 bg-green-500 border-4 border-black text-white font-black text-2xl flex items-center justify-center mr-4"
              >
                E
              </div>
              <div>
                <h4 class="text-black font-black text-xl">Emma Rodriguez</h4>
                <p class="text-black font-bold">Healthcare Professional</p>
              </div>
            </div>
            <p class="text-black font-bold text-lg mb-4 leading-relaxed">
              "Working in healthcare means my schedule is unpredictable. AppointMate's
              flexibility and reliable reminders have been essential for managing patient
              appointments."
            </p>
            <div class="flex text-yellow-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div
            class="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6"
          >
            <div class="text-4xl md:text-5xl font-black text-black mb-2">50K+</div>
            <div class="text-black font-bold text-lg">Active Users</div>
          </div>
          <div
            class="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6"
          >
            <div class="text-4xl md:text-5xl font-black text-black mb-2">1M+</div>
            <div class="text-black font-bold text-lg">Appointments</div>
          </div>
          <div
            class="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6"
          >
            <div class="text-4xl md:text-5xl font-black text-black mb-2">99.9%</div>
            <div class="text-black font-bold text-lg">Uptime</div>
          </div>
          <div
            class="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6"
          >
            <div class="text-4xl md:text-5xl font-black text-black mb-2">4.9★</div>
            <div class="text-black font-bold text-lg">Rating</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Neo-Brutalism specific styles */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* Custom cursor for interactive elements */
button:hover,
a:hover {
  cursor: pointer;
}

/* Ensure sharp edges and bold typography */
* {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
