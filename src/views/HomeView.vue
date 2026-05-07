<template>
  <div class="home-wrapper">
    <!-- 1. 顶部粘性导航（首屏置顶 + 下滑持续显示） -->
    <NavBar />

    <main class="home-main">
      <!-- 首屏主图：image1 -->
      <HeroSection />

      <!-- Services（下拉菜单会跳到对应 anchor） -->
      <div id="services">
        <FeatureSection sectionId="orthopedic" background="grey" :reverse="true"
          title="Find Out More About Musculoskeletal Medicine, P.C."
          body="When you choose us for treatment of your pain problem, you're getting benefit of choosing an independent physician that has been serving the local area loyally since 2001."
          buttonText="Learn More" imageSrc="/images/section1.png" imageAlt="Musculoskeletal care" buttonAlign="left"
          @button-click="navigateTo('/about')" />
      </div>

      <!-- About（导航里的 About） -->
      <FeatureSection sectionId="about" background="white" :reverse="false"
        title="Find Out More About Dr. Y. Michael Li, M.D., Ph.D."
        body="Dr. Yan Michael Li is an award-winning, fellowship-trained spine and tumor neurosurgeon specializing in complex spine disease and brain &amp; spine tumors. His clinical focus includes minimally invasive spine surgery, computer-assisted navigation, and robotic-assisted techniques when appropriate for patient anatomy and goals."
        buttonText="Learn More" imageSrc="/images/section2.png" imageAlt="Dr. Y. Michael Li" buttonAlign="center"
        @button-click="navigateTo('/about')" />

      <!-- Services（下拉菜单会跳到对应 anchor） -->
      <div id="services">
        <FeatureSection sectionId="therapy" background="grey" :reverse="true" title="Come to Us for Prolotherapy"
          body="The purpose of this nonsurgical injection procedure is to strengthen and heal injured connective tissue to reduce pain and improve stability."
          buttonText="Learn More" imageSrc="/images/section3.png" imageAlt="Prolotherapy" buttonAlign="left"
          @button-click="navigateTo('/service/prolotherapy')" />
      </div>

      <!-- Services（下拉菜单会跳到对应 anchor） -->
      <div id="services">
        <FeatureSection sectionId="sports" background="white" :reverse="false"
          title="Non-Steroidal Platelet Rich Plasma Treatments"
          body="This more advanced regenerative injection treatment utilizes growth factors in the patients own platelets to promote healing of the injured musculoskeletal structure."
          buttonText="Learn More" imageSrc="/images/section4.png" imageAlt="PRP treatment" buttonAlign="center"
          @button-click="navigateTo('/service/prp')" />
      </div>

      <!-- 联系/预约呼叫条 -->
      <RedCalloutSection phone="(929) 399-3134" />

      <!-- 首页视频弹窗 -->
      <VideoModalSection sectionId="home-video" videoSrc="/videos/musculoskeletal-medicine-gbjxb8zma-a03tk3.mp4" />

      <!-- 底部页脚（Contact anchor） -->
      <SiteFooter sectionId="contact" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import SiteFooter from '../components/sections/SiteFooter.vue'
import RedCalloutSection from '../components/sections/RedCalloutSection.vue'
import VideoModalSection from '../components/sections/VideoModalSection.vue'
import HeroSection from './home/HeroSection.vue'
import FeatureSection from './home/FeatureSection.vue'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.home-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  overflow-x: hidden;
}

.home-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* 确保在小屏幕上内容不会溢出 */
@media (max-width: 1240px) {
  .home-wrapper {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .home-wrapper {
    min-height: auto;
  }
}
</style>
