<template>
  <div class="bg-amber-50 min-h-screen">
    <!-- Banner Section -->
    <section class="bg-[#f97300] text-gray-200">
      <div class="max-w-6xl mx-auto py-32 flex flex-col md:flex-row items-center gap-10">
        <div class="banner-content max-w-xl">
          <h1 class="text-2xl md:text-4xl font-bold leading-20">
            it's Samio kickoff <br /><span class="text-4xl md:text-6xl">YOUR DAY</span>
          </h1>
          <p class="text-lg md:text-xl mb-6">
            Looking for original authentic cake and sourdough breads, you are at the right place!
          </p>
          <div class="flex flex-wrap gap-6">
            <button
              class="cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-md bg-gray-200 text-[#386641] font-semibold shadow hover:scale-105 hover:text-amber-900 transition-all"
            >
              Explore Our Catalog
            </button>
            <button
              class="cursor-pointer transition-all hover:scale-105 inline-flex items-center justify-center px-6 py-3 rounded-md border border-blue-100 font-semibold hover:text-blue-800"
            >
              Learn About Our Mission
            </button>
          </div>
        </div>
        <div class="relative z-1 w-full md:w-1/2 flex justify-center">
          <div
            class="absolute inset-0 z-0 max-w-md translate-x-3 bg-white opacity-30 translate-y-7 rounded-lg"
          ></div>
          <div
            class="absolute inset-0 z-5 max-w-md translate-x-7 bg-gray-300 translate-y-3.5 rounded-lg"
          ></div>
          <img
            src="/breakfast.jpg"
            alt="Global Oneness Publishing banner"
            class="relative z-10 w-auto max-w-md rounded-lg shadow-lg object-cover bg-amber-100"
          />
        </div>
      </div>
    </section>

    <!-- todo: continue fix ui/ux welcome homepage here -->

    <!-- Features Section -->
    <section class="features py-16">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-10">
          Have you tasted a bread at Samio Bakery?
        </h2>
        <div class="feature-grid grid gap-8 md:grid-cols-3">
          <div class="feature-item bg-white rounded-lg shadow-sm p-6 border border-amber-100">
            <h3 class="text-xl font-semibold text-[#f97300] mb-2">Soft</h3>
            <p class="text-[#386641]">
              Handpicked books that foster unity, compassion, and global awareness.
            </p>
          </div>
          <div class="feature-item bg-white rounded-lg shadow-sm p-6 border border-amber-100">
            <h3 class="text-xl font-semibold text-[#f97300] mb-2">Global Voices</h3>
            <p class="text-[#386641]">
              Authors from diverse cultures sharing stories that bridge differences.
            </p>
          </div>
          <div class="feature-item bg-white rounded-lg shadow-sm p-6 border border-amber-100">
            <h3 class="text-xl font-semibold text-[#f97300] mb-2">Ethical Publishing</h3>
            <p class="text-[#386641]">
              Environmentally conscious printing and fair partnerships with creators.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="products py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold text-[#386641] text-center mb-10">
          Featured Publications
        </h2>
        <div class="product-grid grid gap-8 md:grid-cols-3">
          <article
            class="product-card bg-amber-100 rounded-lg shadow-sm overflow-hidden border border-amber-100 flex flex-col"
          >
            <img
              src=""
              alt="Book: Paths to Oneness"
              class="w-full h-48 object-cover bg-amber-100"
            />
            <div class="p-6 flex flex-col flex-1">
              <h3 class="text-xl font-semibold text-blue-800 mb-2">Paths to Oneness</h3>
              <p class="text-slate-700 mb-4 flex-1">
                A collection of essays exploring unity across cultures and traditions.
              </p>
              <button
                class="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                View Details
              </button>
            </div>
          </article>

          <article
            class="product-card bg-amber-100 rounded-lg shadow-sm overflow-hidden border border-amber-100 flex flex-col"
          >
            <img
              src=""
              alt="Book: Voices of the Earth"
              class="w-full h-48 object-cover bg-amber-100"
            />
            <div class="p-6 flex flex-col flex-1">
              <h3 class="text-xl font-semibold text-blue-800 mb-2">Voices of the Earth</h3>
              <p class="text-slate-700 mb-4 flex-1">
                Stories from around the world on our shared responsibility to the planet.
              </p>
              <button
                class="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                View Details
              </button>
            </div>
          </article>

          <article
            class="product-card bg-amber-100 rounded-lg shadow-sm overflow-hidden border border-amber-100 flex flex-col"
          >
            <img
              src=""
              alt="Book: Children of One World"
              class="w-full h-48 object-cover bg-amber-100"
            />
            <div class="p-6 flex col flex-1">
              <h3 class="text-xl font-semibold text-blue-800 mb-2">Children of One World</h3>
              <p class="text-slate-700 mb-4 flex-1">
                Illustrated stories for young readers about kindness and connection.
              </p>
              <button
                class="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                View Details
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Image Gallery Section -->
    <section class="gallery py-16">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold text-blue-900 text-center mb-10">Gallery</h2>
        <div class="gallery-grid grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <img
            src=""
            alt="Author event"
            class="w-full h-40 object-cover rounded-lg shadow-sm bg-amber-100"
          />
          <img
            src=""
            alt="Book signing"
            class="w-full h-40 object-cover rounded-lg shadow-sm bg-amber-100"
          />
          <img
            src=""
            alt="Reading circle"
            class="w-full h-40 object-cover rounded-lg shadow-sm bg-amber-100"
          />
          <img
            src=""
            alt="Publishing workshop"
            class="w-full h-40 object-cover rounded-lg shadow-sm bg-amber-100"
          />
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold text-blue-900 text-center mb-10">
          What Our Readers Say
        </h2>
        <div class="testimonial-list grid gap-8 md:grid-cols-3">
          <blockquote
            class="testimonial-item bg-amber-100 border border-amber-100 rounded-lg p-6 shadow-sm"
          >
            <p class="text-slate-800 mb-4">
              “Global Oneness Publishing has changed the way I see the world. Their books are
              thoughtful, beautifully produced, and deeply moving.”
            </p>
            <footer class="text-sm font-semibold text-blue-700">— Alex R., Educator</footer>
          </blockquote>
          <blockquote
            class="testimonial-item bg-amber-100 border border-amber-100 rounded-lg p-6 shadow-sm"
          >
            <p class="text-slate-800 mb-4">
              “Our community reading group keeps coming back to their titles. They spark meaningful
              conversations every time.”
            </p>
            <footer class="text-sm font-semibold text-blue-700">
              — Priya S., Community Organizer
            </footer>
          </blockquote>
          <blockquote
            class="testimonial-item bg-amber-100 border border-amber-100 rounded-lg p-6 shadow-sm"
          >
            <p class="text-slate-800 mb-4">
              “As a parent, I love their children’s books. They teach empathy and global citizenship
              in a way kids really understand.”
            </p>
            <footer class="text-sm font-semibold text-blue-700">— Daniel M., Parent</footer>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter py-16">
      <div class="max-w-2xl mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-blue-900 mb-4">Join Our Newsletter</h2>
        <p class="text-slate-700 mb-6">
          Receive updates on new releases, events, and special offers.
        </p>
        <form class="newsletter-form flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            class="w-full sm:w-72 px-4 py-2 rounded-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            class="inline-flex items-center justify-center px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>

    <!-- Orders Section -->
    <section class="orders py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold text-blue-900 text-center mb-6">
          Order &amp; Distribution
        </h2>
        <div class="orders-content bg-amber-100 border border-amber-100 rounded-lg p-8 shadow-sm">
          <p class="text-slate-700 mb-4">
            Interested in bulk orders, bookstore partnerships, or educational licensing? Contact our
            distribution team for tailored solutions.
          </p>
          <ul class="list-disc list-inside text-slate-700 space-y-2 mb-6">
            <li>Bulk discounts for schools, libraries, and nonprofits</li>
            <li>Custom collections for reading groups and retreats</li>
            <li>International shipping and digital formats available</li>
          </ul>
          <button
            class="inline-flex items-center justify-center px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
