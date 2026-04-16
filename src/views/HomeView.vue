<template>
  <div class="home-wrapper">
    <!-- 1. 顶部粘性导航（首屏置顶 + 下滑持续显示） -->
    <NavBar />

    <main class="home-main">
      <!-- 首屏主图：image1 -->
      <HeroSection />

      <!-- Services（下拉菜单会跳到对应 anchor） -->
      <div id="services">
        <FeatureSection
          sectionId="orthopedic"
          background="grey"
          :reverse="true"
          title="Find Out More About Musculoskeletal Medicine, P.C."
          body="When you choose us for treatment of your pain problem, you're getting benefit of choosing an independent physician that has been serving the local area loyally since 2001."
          buttonText="Learn More"
          imageSrc="/images/section1.png"
          imageAlt="Musculoskeletal care"
          buttonAlign="left"
        />
      </div>

      <!-- About（导航里的 About） -->
      <FeatureSection
        sectionId="about"
        background="white"
        :reverse="false"
        title="Find Out More About Dr. John F Finkenstadt"
        body="Dr. John F Finkenstadt has an experience of more than 30 years in treating musculoskeletal disorders. He was a former President of American Association of Orthopedic Medical Mis? and is a board-certified family physician with CAQ in Sports Medicine. His family practice residency is at St. Joseph's Hospital Health Center. He has also served as a Major in the United States Air Force."
        buttonText="Learn More"
        imageSrc="/images/section2.png"
        imageAlt="Dr. John F Finkenstadt"
        buttonAlign="center"
      />

      <!-- Services（下拉菜单会跳到对应 anchor） -->
      <div id="services">
        <FeatureSection
          sectionId="therapy"
          background="grey"
          :reverse="true"
          title="Come to Us for Prolotherapy"
          body="The purpose of this nonsurgical injection procedure is to strengthen and heal injured connective tissue to reduce pain and improve stability."
          buttonText="Learn More"
          imageSrc="/images/section3.png"
          imageAlt="Prolotherapy"
          buttonAlign="left"
        />
      </div>

      <!-- Services（下拉菜单会跳到对应 anchor） -->
      <div id="services">
        <FeatureSection
          sectionId="sports"
          background="white"
          :reverse="false"
          title="Non-Steroidal Platelet Rich Plasma Treatments"
          body="This more advanced regenerative injection treatment utilizes growth factors in the patients own platelets to promote healing of the injured musculoskeletal structure."
          buttonText="Learn More"
          imageSrc="/images/section4.png"
          imageAlt="PRP treatment"
          buttonAlign="center"
        />
      </div>

      <!-- 联系/预约呼叫条 -->
      <RedCalloutSection phone="315-478-9710" />

      <!-- 首页视频弹窗 -->
      <VideoModalSection
        sectionId="home-video"
        videoSrc="/videos/musculoskeletal-medicine-gbjxb8zma-a03tk3.mp4"
      />

      <!-- 底部页脚（Contact anchor） -->
      <SiteFooter sectionId="contact" />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import SiteFooter from '../components/sections/SiteFooter.vue'
import RedCalloutSection from '../components/sections/RedCalloutSection.vue'
import VideoModalSection from '../components/sections/VideoModalSection.vue'
import HeroSection from './home/HeroSection.vue'
import FeatureSection from './home/FeatureSection.vue'
</script>

<style scoped>
.home-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
}

.home-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
</style>
