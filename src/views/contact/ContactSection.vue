<template>
  <div class="contact-wrapper">
    <NavBar />

    <main class="contact-main">
      <section id="contact" class="contact-section">
        <div class="contact-map-wrap" aria-label="Map">
          <iframe
            class="contact-map"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :src="mapEmbedUrl"
          />
        </div>

        <div class="container contact-body">
          <h2 class="contact-title">Contact Us at Musculoskeletal Medicine, P.C. Today</h2>

          <div class="contact-grid">
            <div class="contact-col contact-address">
              <div class="address-line">Musculoskeletal Medicine, P.C.</div>
              <div class="address-line">475 Irving Avenue</div>
              <div class="address-line">Suite 402</div>
              <div class="address-line">Syracuse, NY 13210</div>
              <div class="address-line">
                <a class="phone-link" href="tel:3154789710">315-478-9710</a>
              </div>
              <div class="address-line">315-479-9145 (Fax)</div>
            </div>

            <div class="contact-col contact-hours">
              <h3 class="col-heading">Business Hours</h3>
              <div class="hours-row">
                <span class="hours-day">Mon - Fri</span>
                <span class="hours-time">8:00 am - 5:00 pm</span>
              </div>
              <div class="hours-row">
                <span class="hours-day">Sat - Sun</span>
                <span class="hours-time">Closed</span>
              </div>
            </div>

            <div class="contact-col contact-action">
              <a
                class="directions-button"
                :href="directionsUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter sectionId="contact-footer" />
  </div>
</template>

<script setup lang="ts">
import NavBar from '../../components/NavBar.vue'
import SiteFooter from '../../components/sections/SiteFooter.vue'

const address = '475 Irving Ave, Syracuse, NY 13210'
const addressEncoded = encodeURIComponent(address)

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${addressEncoded}`
const mapEmbedUrl = `https://www.google.com/maps?q=${addressEncoded}&output=embed`
</script>

<style scoped>
.contact-wrapper {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
}

.contact-main {
  width: 100%;
  padding-top: 80px;
}

.contact-section {
  width: 100%;
  background: #ffffff;
  scroll-margin-top: 90px;
}

.contact-map-wrap {
  width: 100%;
  background: #e9e9e9;
  border-bottom: 1px solid #dddddd;
}

.contact-map {
  display: block;
  width: 100%;
  height: 380px;
  border: 0;
}

.contact-body {
  padding: 34px 24px 48px;
}

.contact-title {
  margin: 0 0 26px;
  color: var(--brand-red);
  font-size: 34px;
  line-height: 1.15;
  font-weight: 800;
  font-family: Georgia, 'Times New Roman', Times, serif;
  text-align: center;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 28px;
  align-items: start;
}

.contact-col {
  min-width: 0;
}

.contact-address {
  color: #4a4a4a;
  font-size: 14px;
  line-height: 1.65;
  font-weight: 600;
}

.address-line {
  margin: 0;
}

.phone-link {
  color: var(--brand-red);
  text-decoration: none;
  font-weight: 700;
}

.phone-link:hover {
  text-decoration: underline;
}

.col-heading {
  margin: 0 0 12px;
  color: #2b2b2b;
  font-size: 18px;
  font-weight: 800;
}

.hours-row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  color: #4a4a4a;
  font-size: 14px;
  line-height: 1.65;
  font-weight: 600;
  max-width: 260px;
}

.hours-day {
  font-weight: 600;
}

.hours-time {
  font-weight: 600;
}

.contact-action {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.directions-button {
  display: inline-block;
  padding: 14px 28px;
  background: var(--brand-red);
  color: #ffffff;
  font-weight: 800;
  font-size: 15px;
  text-decoration: none;
  border-radius: 3px;
  text-align: center;
  min-width: 220px;
  letter-spacing: 0.3px;
}

.directions-button:hover {
  filter: brightness(1.06);
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .contact-title {
    font-size: 26px;
    text-align: left;
  }

  .hours-row {
    max-width: 100%;
  }

  .contact-action {
    justify-content: flex-start;
  }

  .directions-button {
    width: 100%;
  }

  .contact-map {
    height: 260px;
  }
}

@media (max-width: 768px) {
  .contact-main {
    padding-top: 72px;
  }
}
</style>
