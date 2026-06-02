<template>
  <q-page class="market-home">
    <section class="hero-section">
      <q-img src="/icons/f&b_3.jpg" class="hero-bg" fit="cover">
        <div class="hero-overlay">
          <div class="hero-copy">
            <q-badge class="hero-badge" unelevated>UPNM campus marketplace</q-badge>
            <h1>Find food, services, and thrift deals before your next class.</h1>
            <p>
              Browse student-run stalls, quick services, and pre-loved finds around campus in one
              clean place.
            </p>

            <div class="hero-actions">
              <q-btn unelevated color="white" text-color="primary" icon="storefront" label="Explore stalls" to="/page2" />
              <q-btn outline color="white" icon="person_add" label="Become a seller" to="/page4" />
            </div>
          </div>

          <div class="market-pulse">
            <div v-for="stat in stats" :key="stat.label" class="pulse-item">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </q-img>
    </section>

    <section class="content-band">
      <div class="section-head">
        <div>
          <q-badge color="blue-1" text-color="primary">Today on campus</q-badge>
          <h2>{{ searchQuery ? `Results for "${searchQuery}"` : 'Start with a category' }}</h2>
        </div>
        <q-btn flat color="primary" icon="search" label="Use the top search bar" />
      </div>

      <div v-if="searchQuery" class="search-summary">
        {{ filteredListings.length }} listing{{ filteredListings.length === 1 ? '' : 's' }} matched your search.
        <q-btn flat dense color="primary" label="Clear" @click="clearSearch" />
      </div>

      <div class="category-grid">
        <router-link v-for="category in categories" :key="category.title" :to="category.to" class="category-tile">
          <q-img :src="category.image" class="category-image" fit="cover" />
          <div class="category-info">
            <q-icon :name="category.icon" size="28px" />
            <div>
              <h3>{{ category.title }}</h3>
              <p>{{ category.description }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <section class="content-band listings-band">
      <div class="section-head">
        <div>
          <q-badge color="green-1" text-color="green-9">Featured picks</q-badge>
          <h2>{{ searchQuery ? 'Matching listings' : 'Popular right now' }}</h2>
        </div>
      </div>

      <div v-if="filteredListings.length" class="listing-grid">
        <q-card v-for="item in filteredListings" :key="item.title" class="listing-card" flat>
          <q-img :src="item.image" class="listing-image" fit="cover" />
          <q-card-section>
            <div class="listing-top">
              <q-badge :color="item.badgeColor" text-color="white">{{ item.category }}</q-badge>
              <span>{{ item.price }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <q-btn
              flat
              dense
              color="primary"
              icon-right="arrow_forward"
              :label="item.action"
              :to="item.to"
            />
          </q-card-section>
        </q-card>
      </div>

      <q-card v-else class="empty-state" flat>
        <q-icon name="manage_search" size="42px" color="primary" />
        <h3>No exact match yet</h3>
        <p>Try searching for food, runner, printing, hoodie, takoyaki, or thrift.</p>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const categories = [
  {
    title: 'Services',
    description: 'Printing, laminate, runners, and quick campus help.',
    image: '/icons/services.jpg',
    icon: 'design_services',
    to: '/page1',
  },
  {
    title: 'Food & Beverage',
    description: 'Meals, snacks, drinks, and promos from student sellers.',
    image: '/icons/f&b.jpg',
    icon: 'restaurant',
    to: '/page2',
  },
  {
    title: 'Thrift Shop',
    description: 'Streetwear, basics, and pre-loved finds with student prices.',
    image: '/icons/thrift.jpg',
    icon: 'checkroom',
    to: '/page3',
  },
]

const stats = [
  { value: '3', label: 'main zones' },
  { value: '8+', label: 'food promos' },
  { value: '24h', label: 'seller posting' },
]

const listings = [
  {
    title: 'Nasi Goreng Ayam Kunyit',
    description: 'RM7 with room-to-room delivery included.',
    category: 'Food',
    price: 'RM7',
    image: '/icons/f&b_1.jpg',
    badgeColor: 'orange-8',
    action: 'View menu',
    to: '/page2',
    keywords: 'food beverage nasi goreng ayam kunyit lunch dinner delivery',
  },
  {
    title: 'Takoyaki Promo',
    description: '6 pcs for RM5, or 13 pcs for RM10 with bonus pieces.',
    category: 'Food',
    price: 'From RM5',
    image: '/icons/f&b_2.jpg',
    badgeColor: 'orange-8',
    action: 'View menu',
    to: '/page2',
    keywords: 'food beverage takoyaki promo snack japanese',
  },
  {
    title: 'Printing & Laminate',
    description: 'Fast document support for assignments, notes, and forms.',
    category: 'Service',
    price: 'See rates',
    image: '/icons/services_2.jpg',
    badgeColor: 'blue-8',
    action: 'Book service',
    to: '/page1',
    keywords: 'services printing laminate assignment document notes',
  },
  {
    title: 'Personal Runner',
    description: 'Small item runner service around campus from RM3.',
    category: 'Service',
    price: 'RM3',
    image: '/icons/services_3.jpg',
    badgeColor: 'blue-8',
    action: 'Book runner',
    to: '/page1',
    keywords: 'services runner delivery campus small items',
  },
  {
    title: 'Rebelutions Tour Shirt',
    description: 'Pre-loved statement tee for casual campus fits.',
    category: 'Thrift',
    price: 'Deal',
    image: '/icons/item_1.jpg',
    badgeColor: 'green-8',
    action: 'Shop thrift',
    to: '/page3',
    keywords: 'thrift shirt tee clothing streetwear rebelutions',
  },
  {
    title: 'Hoodie',
    description: 'Cozy thrift hoodie for lecture halls and late-night study.',
    category: 'Thrift',
    price: 'Deal',
    image: '/icons/thrift_5.jpg',
    badgeColor: 'green-8',
    action: 'Shop thrift',
    to: '/page3',
    keywords: 'thrift hoodie clothing streetwear jacket',
  },
]

const searchQuery = computed(() => String(route.query.q || '').trim())

const filteredListings = computed(() => {
  const query = searchQuery.value.toLowerCase()

  if (!query) {
    return listings
  }

  return listings.filter((item) =>
    `${item.title} ${item.description} ${item.category} ${item.keywords}`.toLowerCase().includes(query),
  )
})

function clearSearch() {
  router.push({ path: '/', query: {} })
}
</script>

<style scoped>
.market-home {
  background: #f6f8fb;
  color: #182235;
}

.hero-section {
  min-height: 640px;
}

.hero-bg {
  min-height: 640px;
}

.hero-overlay {
  min-height: 640px;
  width: 100%;
  padding: 210px 7vw 72px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  background:
    linear-gradient(90deg, rgba(7, 20, 46, 0.86) 0%, rgba(7, 20, 46, 0.54) 48%, rgba(7, 20, 46, 0.2) 100%),
    linear-gradient(0deg, rgba(7, 20, 46, 0.72) 0%, rgba(7, 20, 46, 0) 44%);
}

.hero-copy {
  max-width: 760px;
  color: white;
}

.hero-badge {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  color: white;
  backdrop-filter: blur(8px);
}

.hero-copy h1 {
  margin: 18px 0 14px;
  font-size: clamp(2.4rem, 6vw, 5.6rem);
  line-height: 0.96;
  font-weight: 900;
  letter-spacing: 0;
}

.hero-copy p {
  max-width: 620px;
  font-size: 1.15rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.86);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.market-pulse {
  width: min(360px, 100%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.pulse-item {
  min-height: 104px;
  padding: 18px 12px;
  display: grid;
  place-items: center;
  text-align: center;
  color: white;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 8px;
  backdrop-filter: blur(14px);
}

.pulse-item strong {
  display: block;
  font-size: 1.8rem;
  line-height: 1;
}

.pulse-item span {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.content-band {
  padding: 46px 7vw 18px;
}

.listings-band {
  padding-top: 24px;
  padding-bottom: 22px;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
}

.section-head h2 {
  margin: 10px 0 0;
  font-size: clamp(1.7rem, 3vw, 2.6rem);
  font-weight: 850;
  letter-spacing: 0;
}

.search-summary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  padding: 8px 12px 8px 16px;
  border-radius: 999px;
  background: white;
  color: #526072;
  box-shadow: 0 10px 28px rgba(18, 39, 107, 0.08);
}

.category-grid,
.listing-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.category-tile {
  position: relative;
  min-height: 300px;
  overflow: hidden;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  background: #182235;
  box-shadow: 0 16px 38px rgba(18, 39, 107, 0.16);
}

.category-image {
  height: 100%;
  min-height: 300px;
  transition: transform 0.35s ease;
}

.category-tile:hover .category-image {
  transform: scale(1.05);
}

.category-info {
  position: absolute;
  inset: auto 0 0;
  padding: 24px;
  display: flex;
  align-items: flex-end;
  gap: 14px;
  background: linear-gradient(0deg, rgba(4, 12, 28, 0.88) 0%, rgba(4, 12, 28, 0) 100%);
}

.category-info h3,
.listing-card h3,
.empty-state h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 850;
}

.category-info p,
.listing-card p,
.empty-state p {
  margin: 6px 0 0;
  line-height: 1.5;
}

.listing-card,
.empty-state {
  border: 1px solid #dfe6f0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 14px 34px rgba(18, 39, 107, 0.08);
}

.listing-image {
  height: 210px;
}

.listing-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
  color: #1565c0;
  font-weight: 800;
}

.listing-card p {
  min-height: 48px;
  color: #526072;
}

.empty-state {
  min-height: 240px;
  display: grid;
  place-items: center;
  align-content: center;
  padding: 28px;
  text-align: center;
}

@media (max-width: 900px) {
  .hero-overlay {
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-end;
  }

  .market-pulse,
  .category-grid,
  .listing-grid {
    grid-template-columns: 1fr;
  }

  .market-pulse {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .hero-section,
  .hero-bg,
  .hero-overlay {
    min-height: 720px;
  }

  .hero-overlay {
    padding: 200px 18px 34px;
  }

  .hero-copy p {
    font-size: 1rem;
  }

  .hero-actions .q-btn {
    width: 100%;
  }

  .market-pulse {
    grid-template-columns: 1fr;
  }

  .pulse-item {
    min-height: 74px;
  }

  .content-band {
    padding: 32px 18px 8px;
  }

  .section-head {
    display: block;
  }

  .section-head .q-btn {
    margin-top: 10px;
    padding-left: 0;
  }
}
</style>
