<template>
  <div class="about-wrapper">
    <NavBar />

    <main class="about-main">
      <!-- 顶部：关于诊所介绍 -->
      <section id="about" class="about-intro">
        <div class="container">
          <h1 class="about-title">About Musculoskeletal Medicine PC</h1>
          <p class="about-paragraph">
            Musculoskeletal Medicine, P.C. is an independent physician practice that has been serving the local area since 2001.
          </p>
          <p class="about-paragraph">
            Our team of dedicated professionals provides personalized service at out office near downtown Syracuse, N.Y. Contact us today to schedule your appointment.
          </p>
          <p class="about-paragraph">
            Musculoskeletal Medicine PC specializes in physician directed quality comprehensive and compassionate care for acute and chronic musculoskeletal pain.
          </p>
        </div>
      </section>

      <!-- Dr. John F Finkenstadt 介绍（灰底） -->
      <section class="doctor-section doctor-section-gray">
        <div class="container">
          <div class="doctor-grid">
            <div class="doctor-photo-wrap">
              <img
                class="doctor-photo"
                src="https://le-cdn.hibuwebsites.com/4f7ab16b56fa4b438d877a564ca53166/dms3rep/multi/opt/dr-finkenstadt-320w.jpg"
                alt="Dr. John F Finkenstadt, M.D."
              />
            </div>
            <div class="doctor-info">
              <h2 class="doctor-title">Learn More About Dr. John F Finkenstadt, M.D.</h2>
              <p class="doctor-paragraph">
                I have devoted my medical career to treating disorders of the musculoskeletal system. Originally Board Certified as a Family Physician, I subsequently went on to obtain a Certificate of Added Qualification (CAQ) in Sports Medicine.
              </p>
              <p class="doctor-paragraph">
                In the 1980's, with the support of the medical group of Prepaid Health Plan (PHP), I was able to establish a Department of Musculoskeletal Medicine. My private practice was opened in 2001 at the Madison-Irving Medical Center in Syracuse, New York.
              </p>
              <p class="doctor-paragraph">
                Early in my training, I was introduced to Orthopaedic Medicine (non-surgical orthopedics) as developed by Dr. James Cyriax which started my journey into a better understanding of the diagnosis and treatment of musculoskeletal conditions.
              </p>
              <p class="doctor-paragraph">
                Over the years I have expanded my knowledge and skill set by studying under many of the leaders in the field of Musculoskeletal Medicine, including training in Prolotherapy, Prolozone, Platelet Rich Plasma (PRP), Perineural Injection Therapy, Osteopathic Manipulation, and Diagnostic Musculoskeletal Ultrasound.
              </p>
              <p class="doctor-paragraph">
                I am honored to provide this level of care to the patients that are seen by my office.
              </p>
              <p class="doctor-paragraph">
                Before closing, I would like to personally thank all the patients that have trusted me with caring for them and appreciate the confidence they have placed in me over the years.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Dr. Kenneth A. Iles 介绍（白底） -->
      <section class="doctor-section doctor-section-white">
        <div class="container">
          <div class="doctor-grid">
            <div class="doctor-photo-wrap">
              <img
                class="doctor-photo"
                src="https://le-cdn.hibuwebsites.com/4f7ab16b56fa4b438d877a564ca53166/dms3rep/multi/opt/dr-iles-320w.jpg"
                alt="Dr. Kenneth A. Iles, M.D."
              />
            </div>
            <div class="doctor-info">
              <h2 class="doctor-title">Learn More About Dr. Kenneth A. Iles, M.D.</h2>
              <p class="doctor-paragraph">
                Dr. Kenneth A. Iles is a 1996 graduate of New York Chiropractic College in Seneca Falls, NY, where he graduated as a member of the Phi Chi Omega Society, the honors society in Chiropractic colleges. After graduation he worked as an associate doctor in a multidisciplinary practice in Greensburg, PA. In that capacity he was the clinic director and managed an office where Medical Doctors, Chiropractors, Physical Therapists, and massage therapists worked together in a team approach in the treatment of multiple musculoskeletal conditions that presented to the office.
              </p>
              <p class="doctor-paragraph">
                After three and a half years of practice in PA, Dr. Iles moved back to upstate New York to be closer to his family. He opened a private practice in Cicero, NY. He is currently practicing full-time in Clinton, NY and part-time at Musculsoskeletal Medicine P.C.
              </p>
              <p class="doctor-paragraph">
                Dr. Iles is a certified Advanced Biostructural Correction (ABC) practioner; focusing on treating the complete biomechanical system in a comprehensive approach.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter sectionId="about-footer" />
  </div>
</template>

<script setup lang="ts">
import NavBar from '../../components/NavBar.vue'
import SiteFooter from '../../components/sections/SiteFooter.vue'
</script>

<style scoped>
.about-wrapper {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
}

.about-main {
  width: 100%;
  padding-top: 120px;
}

/* 顶部介绍区 */
.about-intro {
  background: #ffffff;
  padding: 40px 0 56px;
  scroll-margin-top: 120px;
}

.about-title {
  margin: 0 0 24px;
  color: var(--brand-red);
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 44px;
  line-height: 1.15;
  font-weight: 800;
}

.about-paragraph {
  margin: 0 0 18px;
  color: #4a4a4a;
  font-size: 15px;
  line-height: 1.7;
}

/* 医生介绍区 */
.doctor-section {
  width: 100%;
  padding: 56px 0;
}

.doctor-section-gray {
  background: #eeeeee;
}

.doctor-section-white {
  background: #ffffff;
}

.doctor-grid {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 48px;
  align-items: start;
}

.doctor-photo-wrap {
  width: 100%;
}

.doctor-photo {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 2px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.doctor-info {
  min-width: 0;
}

.doctor-title {
  margin: 0 0 22px;
  color: var(--brand-red);
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 800;
}

.doctor-paragraph {
  margin: 0 0 18px;
  color: #4a4a4a;
  font-size: 15px;
  line-height: 1.7;
}

@media (max-width: 900px) {
  .about-title {
    font-size: 32px;
  }

  .doctor-title {
    font-size: 24px;
  }

  .doctor-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .doctor-photo-wrap {
    max-width: 260px;
  }
}

@media (max-width: 600px) {
  .about-main {
    padding-top: 90px;
  }

  .about-title {
    font-size: 26px;
  }

  .doctor-section {
    padding: 36px 0;
  }
}
</style>
