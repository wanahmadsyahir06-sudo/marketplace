<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <!-- Header biasa: akan hilang bila scroll -->
      <div class="mp-title-header">
        <div class="mp-main-title">
          UPNM Market Place
        </div>
      </div>

      <!-- Floating menu + search: overlay, tak ambik ruang -->
      <div
        class="mp-floating-nav"
        :class="{ 'mp-is-scrolled': isScrolled }"
      >
        <q-tabs
          align="center"
          class="mp-tabs"
          active-color="white"
          indicator-color="white"
          shrink
        >
          <q-route-tab to="/" label="Menu" />
          <q-route-tab to="/page1" label="Services" />
          <q-route-tab to="/page2" label="Food & Beverages" />
          <q-route-tab to="/page3" label="Thrift" />
          <q-route-tab to="/page4" label="Login / Register" />
        </q-tabs>

        <div class="mp-search-row">
          <q-input
            v-model="search"
            outlined
            rounded
            dense
            clearable
            placeholder="Search items, vendors, services..."
            class="mp-search-input"
            @keyup.enter="doSearch"
            @clear="clearSearch"
          >
            <template v-slot:append>
              <q-icon
                name="search"
                class="cursor-pointer"
                @click="doSearch"
              />
            </template>
          </q-input>
        </div>
      </div>

      <router-view />

      <!-- Footer + map bawah page -->
      <div class="mp-site-footer text-white">
        <div class="row items-start justify-around q-pa-md text-center mp-footer-info">
          <div class="col-12 col-md-4 q-mb-md">
            <div class="text-h6">Contact Us</div>
            <div>+60 12-345 6789</div>
          </div>

          <div class="col-12 col-md-4 q-mb-md">
            <div class="text-h6">Location</div>
            <div>
              Universiti Pertahanan Nasional Malaysia (UPNM),<br />
              Kem Perdana Sungai Besi,<br />
              57000 Kuala Lumpur
            </div>
          </div>

          <div class="col-12 col-md-4 q-mb-md">
            <div class="text-h6">Operating Hours</div>
            <div>Mon - Fri: 9:00 AM - 6:00 PM</div>
            <div>Sat: 10:00 AM - 4:00 PM</div>
          </div>
        </div>

        <div class="mp-footer-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.156540531506!2d101.72083667462846!3d3.052733753738503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc357ad56c0001%3A0x3d5c81a579c4ae1d!2sUniversiti%20Pertahanan%20Nasional%20Malaysia!5e0!3m2!1sen!2smy!4v1779377846314!5m2!1sen!2smy"
            width="100%"
            height="250"
            style="border: 0; display: block"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data() {
    return {
      search: '',
      isScrolled: false,
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 1
    },

    doSearch() {
      const q = (this.search || '').trim()

      this.$router.push({
        path: '/',
        query: q ? { q } : {},
      })
    },

    clearSearch() {
      this.search = ''

      this.$router.push({
        path: '/',
        query: {},
      })
    },
  },
}
</script>

<style lang="scss" scoped>
/* HEADER TITLE BIASA */
.mp-title-header {
  height: 82px;
  background: linear-gradient(180deg, #243f95 0%, #1f3b8f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.mp-main-title {
  font-weight: 800;
  letter-spacing: 0.03em;
  font-size: 1.45rem;
  color: white;
}

/* FLOATING NAV + SEARCH, TAK AMBIK RUANG */
.mp-floating-nav {
  position: fixed;
  top: 82px;
  left: 0;
  width: 100%;
  z-index: 9999;

  padding: 18px 42px 22px;

  background: linear-gradient(
    180deg,
    rgba(18, 39, 107, 0.72) 0%,
    rgba(18, 39, 107, 0.38) 62%,
    rgba(18, 39, 107, 0) 100%
  );

  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  transition:
    background 0.28s ease,
    box-shadow 0.28s ease;
}

/* BILA SCROLL, MENU + SEARCH MELEKAT ATAS */
.mp-floating-nav.mp-is-scrolled {
  top: 0;

  background: linear-gradient(
    180deg,
    rgba(18, 39, 107, 0.92) 0%,
    rgba(18, 39, 107, 0.72) 58%,
    rgba(18, 39, 107, 0.18) 100%
  );

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
}

/* MENU BUTTON */
.mp-tabs {
  background: transparent;
  color: white;
  margin-bottom: 14px;
}

.mp-tabs :deep(.q-tab),
.mp-tabs :deep(.q-route-tab) {
  border-radius: 999px !important;
  margin: 0 5px !important;
  padding: 8px 20px !important;
  min-width: unset !important;

  background: rgba(255, 255, 255, 0.22) !important;
  color: white !important;
  font-weight: 800;

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.22),
    0 8px 22px rgba(0, 0, 0, 0.18);

  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.mp-tabs :deep(.q-tab:hover),
.mp-tabs :deep(.q-route-tab:hover) {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: translateY(-1px);
}

.mp-tabs :deep(.q-tab--active),
.mp-tabs :deep(.q-route-tab--active) {
  background: rgba(255, 255, 255, 0.38) !important;
  color: white !important;

  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.4),
    0 10px 26px rgba(0, 0, 0, 0.24);
}

.mp-tabs :deep(.q-tabs__indicator),
.mp-tabs :deep(.q-tab__indicator) {
  display: none !important;
}

/* SEARCH BAR */
.mp-search-row {
  display: flex;
  justify-content: center;
}

.mp-search-input {
  width: 100%;
  max-width: 850px;
}

.mp-search-input :deep(.q-field__control) {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.7);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.22),
    inset 0 0 0 1px rgba(255, 255, 255, 0.3);
}

.mp-search-input :deep(.q-field__append) {
  color: #1976d2;
}

/* FOOTER */
.mp-site-footer {
  background: #1565c0;
  margin-top: 40px;
}

.mp-footer-info {
  line-height: 1.6;
}

.mp-footer-map {
  margin: 0;
  padding: 0;
}

.mp-footer-map iframe {
  display: block;
  width: 100%;
}

/* MOBILE */
@media (max-width: 600px) {
  .mp-title-header {
    height: 68px;
  }

  .mp-main-title {
    font-size: 1.1rem;
  }

  .mp-floating-nav {
    top: 68px;
    padding: 14px 12px 18px;
  }

  .mp-floating-nav.mp-is-scrolled {
    top: 0;
  }

  .mp-tabs :deep(.q-tab),
  .mp-tabs :deep(.q-route-tab) {
    padding: 6px 11px !important;
    margin: 0 2px !important;
    font-size: 0.78rem;
  }

  .mp-search-input {
    max-width: 100%;
  }

  .mp-footer-info {
    font-size: 0.9rem;
  }

  .mp-site-footer {
    margin-top: 24px;
  }
}
</style>
