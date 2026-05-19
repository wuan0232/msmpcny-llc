<template>
  <footer :id="sectionId" class="site-footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-phone">(929) 399-3134</div>
      </div>
    </div>

    <div class="footer-main">
      <div class="container footer-grid">
        <div class="footer-col">
          <h3 class="footer-heading">Quick Links</h3>
          <ul class="footer-list">
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-heading">Find Us</h3>
          <div class="map-wrap" aria-label="Map">
            <LocationMap class="map-frame" height="170px" :zoom="16" compact />
          </div>
          <a class="directions-button" :href="directionsUrl" target="_blank" rel="noopener noreferrer">
            Get Directions
          </a>
        </div>

        <div class="footer-col footer-col-contact">
          <div class="footer-contact-row">
            <h3 class="footer-heading footer-heading-contact">Contact Us</h3>
            <div class="footer-address footer-address-left">
              <div class="footer-address-title">Musculoskeletal Medicine, P.C.</div>
              <div>475 Irving Avenue</div>
              <div>Suite 402</div>
              <div>Syracuse, NY 13210</div>
              <div>315-478-9710</div>
            </div>
            <div class="footer-address footer-address-right">
              <div class="footer-address-title">New York City Office</div>
              <div>42-65 Kissena Blvd</div>
              <div>Flushing, NY</div>
              <div>(929) 399-3134</div>
            </div>
          </div>

          <img
            class="payment-image"
            src="https://le-cdn.hibuwebsites.com/4f7ab16b56fa4b438d877a564ca53166/dms3rep/multi/opt/credit-card-logos-1920w.jpg"
            alt="Visa, MasterCard, Discover, Cash and Personal Check accepted"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container footer-legal">
          <a href="#">Privacy Policy</a>
          <span class="divider">|</span>
          <a href="#">Manage Consent Preferences</a>
          <span class="divider">|</span>
          <a href="#">Do Not Share My Information</a>
          <span class="divider">|</span>
          <a href="#">Conditions of Use</a>
          <span class="divider">|</span>
          <a href="#">Notice and Take Down Policy</a>
          <span class="divider">|</span>
          <a href="#">Website Accessibility Policy</a>
        </div>
        <div class="container footer-copy">
          © 2026 The content on this website is owned by us and is protected by copyright laws.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import LocationMap from '../LocationMap.vue'
import { googleMapsDirectionsUrl } from '../../config/clinicLocation'

const props = defineProps<{ sectionId?: string }>()

const { sectionId } = props

/** 保留原来的 Google Maps 路线跳转；国内无外网时仅影响按钮，不影响页面内地图显示 */
const directionsUrl = googleMapsDirectionsUrl()
</script>

<style scoped>
.site-footer {
  background: #2f2f2f;
  color: #cccccc;
  padding-bottom: 28px;
  width: 100%;
  overflow-x: hidden;
}

.footer-top {
  background: #7a1f1b;
  padding: 16px 0;
}

.footer-phone {
  color: #ffffff;
  text-align: center;
  font-size: 19px;
  font-weight: 900;
  letter-spacing: 0.5px;
}

.footer-main {
  padding-top: 30px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 0.75fr 0.9fr 1.45fr;
  gap: 28px;
  align-items: start;
  padding: 0 60px;
  box-sizing: border-box;
  width: 100%;
}

.footer-col {
  min-width: 0;
}

.footer-heading {
  margin: 0 0 14px;
  font-size: 20px;
  font-weight: 900;
  color: #ffffff;
}

.footer-list {
  list-style: disc;
  padding-left: 16px;
  margin: 0;
}

.footer-list li {
  margin: 6px 0;
}

.footer-list a {
  color: #cccccc;
  font-size: 15px;
  font-weight: 600;
  text-decoration: underline;
}

.footer-list a:hover {
  color: #ffffff;
}

.map-wrap {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #ffffff;
  border-radius: 2px;
  overflow: hidden;
  max-width: 255px;
}

.map-frame {
  width: 100%;
  border: 0;
}

.directions-button {
  margin-top: 12px;
  width: 100%;
  max-width: 255px;
  padding: 12px 14px;
  background: var(--brand-red);
  border: 1px solid rgba(255, 255, 255, 0.7);
  display: inline-block;
  text-align: center;
  color: #ffffff;
  font-weight: 800;
  border-radius: 2px;
  cursor: pointer;
}

.footer-col-contact {
  min-width: 0;
}

.footer-contact-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 20px;
  align-items: start;
  margin-bottom: 16px;
}

.footer-address {
  font-size: 15px;
  line-height: 1.6;
  font-weight: 500;
}

.footer-address-left {
  text-align: left;
}

.footer-address-right {
  text-align: right;
}

.footer-address-title {
  color: #ffffff;
  font-weight: 800;
  margin-bottom: 4px;
}

.footer-heading-contact {
  grid-column: 1 / -1;
  margin: 0;
  padding: 0;
  font-size: 26px;
  line-height: 1.15;
  text-align: center;
}

.payment-image {
  display: block;
  width: 100%;
  max-width: 220px;
  height: auto;
  background: #ffffff;
}

.footer-bottom {
  padding-top: 12px;
}

.footer-legal {
  text-align: center;
  font-size: 14px;
  color: #aaaaaa;
  line-height: 1.45;
}

.footer-legal a {
  color: #aaaaaa;
}

.footer-legal a:hover {
  color: #ffffff;
}

.divider {
  margin: 0 8px;
}

.footer-copy {
  margin-top: 8px;
  text-align: center;
  font-size: 13px;
  color: #777777;
}

@media (max-width: 980px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .map-wrap,
  .directions-button,
  .payment-image {
    max-width: 100%;
  }

  .footer-contact-row {
    grid-template-columns: 1fr;
    gap: 16px;
    align-items: start;
  }

  .footer-heading-contact {
    width: 100%;
    font-size: 24px;
    text-align: center;
  }

  .footer-address-right {
    text-align: left;
  }
}
</style>
