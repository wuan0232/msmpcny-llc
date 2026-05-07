<template>
  <div class="contact-wrapper">
    <NavBar />

    <main class="contact-main">
      <section id="contact" class="contact-section">
        <div class="container contact-body">
          <h2 class="contact-title">Contact Us at Musculoskeletal Medicine, P.C. Today</h2>

          <div class="offices-layout">
            <article class="office-panel">
              <div class="contact-map-wrap" aria-label="Syracuse office map">
                <ContactMap
                  class="contact-map-inner"
                  :address="syracuseOffice.address"
                  :lat="syracuseOffice.lat"
                  :lng="syracuseOffice.lng"
                  :zoom="15"
                />
              </div>

              <div class="office-content">
                <div class="contact-grid">
                  <div class="contact-col contact-address">
                    <div class="address-line address-heading">Musculoskeletal Medicine, P.C.</div>
                    <div class="address-line">475 Irving Avenue</div>
                    <div class="address-line">Suite 402</div>
                    <div class="address-line">Syracuse, NY 13210</div>
                    <div class="address-line">315-478-9710</div>
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
                    <a class="directions-button" :href="syracuseOffice.directionsUrl" target="_blank" rel="noopener noreferrer">
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </article>

            <article class="office-panel">
              <div class="contact-map-wrap" aria-label="New York City office map">
                <ContactMap
                  class="contact-map-inner"
                  :address="nycOffice.address"
                  :lat="nycOffice.lat"
                  :lng="nycOffice.lng"
                  :zoom="16"
                />
              </div>

              <div class="office-content">
                <div class="contact-grid">
                  <div class="contact-col contact-address">
                    <div class="address-line address-heading">New York City Office</div>
                    <div class="address-line">42-65 Kissena Blvd, Flushing, NY</div>
                    <div class="address-line address-spacer">
                      <a class="email-link" href="mailto:NY@spineandneurosurgery.com">NY@spineandneurosurgery.com</a>
                    </div>
                    <div class="address-line">(929) 399-3134</div>
                  </div>

                  <div class="contact-col contact-hours">
                    <h3 class="col-heading">Business Hours</h3>
                    <div class="hours-row">
                      <span class="hours-day">Monday - Friday</span>
                      <span class="hours-time">9:00 AM - 5:00 PM</span>
                    </div>
                    <div class="hours-row">
                      <span class="hours-day">Saturday - Sunday</span>
                      <span class="hours-time">By appointment only</span>
                    </div>
                  </div>

                  <div class="contact-col contact-action">
                    <a class="directions-button" :href="nycOffice.directionsUrl" target="_blank" rel="noopener noreferrer">
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </article>
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
import ContactMap from '../../components/ContactMap.vue'
import {
  NYC_CLINIC_ADDRESS,
  NYC_CLINIC_LAT,
  NYC_CLINIC_LNG,
  SYRACUSE_CLINIC_ADDRESS,
  SYRACUSE_CLINIC_LAT,
  SYRACUSE_CLINIC_LNG,
  googleMapsSearchUrl,
} from '../../config/clinicLocation'

const syracuseOffice = {
  address: SYRACUSE_CLINIC_ADDRESS,
  lat: SYRACUSE_CLINIC_LAT,
  lng: SYRACUSE_CLINIC_LNG,
  directionsUrl: googleMapsSearchUrl(SYRACUSE_CLINIC_ADDRESS),
}

const nycOffice = {
  address: NYC_CLINIC_ADDRESS,
  lat: NYC_CLINIC_LAT,
  lng: NYC_CLINIC_LNG,
  directionsUrl: googleMapsSearchUrl(NYC_CLINIC_ADDRESS),
}
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
  padding-top: 120px;
}

.contact-section {
  width: 100%;
  background: #ffffff;
  scroll-margin-top: 120px;
}

.offices-layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
  align-items: stretch;
}

.office-panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #dddddd;
  background: #ffffff;
}

.contact-map-wrap {
  width: 100%;
  height: 300px;
  background: #e9e9e9;
  border-bottom: 1px solid #dddddd;
}

.contact-map-inner {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.contact-body {
  padding: 34px 24px 48px;
}

.office-content {
  display: flex;
  flex: 1;
  padding: 24px;
}

.contact-title {
  margin: 0 0 26px;
  color: var(--brand-red);
  font-size: 40px;
  line-height: 1.15;
  font-weight: 800;
  font-family: Georgia, 'Times New Roman', Times, serif;
  text-align: left;
}

.contact-grid {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 22px;
  max-width: none;
  margin: 0;
}

.contact-col {
  min-width: 0;
}

.contact-address {
  color: #4a4a4a;
  font-size: 18px;
  line-height: 1.65;
  font-weight: 600;
}

.address-line {
  margin: 0;
}

.address-heading {
  font-weight: 800;
}

.address-spacer {
  margin-top: 10px;
}

.email-link {
  color: var(--brand-red);
  text-decoration: none;
  font-weight: 700;
}

.email-link:hover {
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
  font-size: 18px;
  line-height: 1.65;
  font-weight: 600;
  max-width: 100%;
}

.hours-day {
  font-weight: 600;
}

.hours-time {
  font-weight: 600;
}

.contact-action {
  display: flex;
  margin-top: auto;
  justify-content: flex-start;
  align-items: center;
}

.directions-button {
  display: inline-block;
  padding: 14px 28px;
  background: var(--brand-red);
  color: #ffffff;
  font-weight: 800;
  font-size: 18px;
  text-decoration: none;
  border-radius: 3px;
  text-align: center;
  width: 100%;
  min-width: 0;
  letter-spacing: 0.3px;
  box-sizing: border-box;
}

.directions-button:hover {
  filter: brightness(1.06);
}

@media (max-width: 900px) {
  .offices-layout,
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

  .contact-map-wrap {
    height: 280px;
  }
}

@media (max-width: 768px) {
  .contact-main {
    padding-top: 72px;
  }
}
</style>
