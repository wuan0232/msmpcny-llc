<template>
  <nav class="site-nav">
    <div class="nav-inner">
      <!-- 左侧品牌图片 -->
      <div class="brand">
        <img src="/images/title.png" alt="MUSCULOSKELETAL MEDICINE, P.C." class="brand-img" />
      </div>

      <!-- 右侧：联系信息 + 导航菜单 -->
      <div class="nav-right">
        <!-- 联系信息 -->
        <div class="contact-info">
          <span class="location">NYC location<br>42-65 Kissena Blvd, Flushing, NY</span>
          <a class="phone" href="tel:9293993134">(929) 399-3134</a>
        </div>

        <!-- 导航菜单 -->
        <ul class="nav-links">
          <li v-for="item in menuItems" :key="item.id" :class="{ 'has-dropdown': item.children }">
            <a :href="item.link" :class="{ active: item.active }">
              {{ item.name }}
              <span v-if="item.children" class="arrow" aria-hidden="true"></span>
            </a>
            <!-- 下拉菜单 -->
            <ul v-if="item.children" class="dropdown">
              <li v-for="child in item.children" :key="child.id">
                <a :href="child.link">{{ child.name }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

interface ChildItem {
  id: number
  name: string
  link: string
}

interface MenuItem {
  id: number
  name: string
  link: string
  active?: boolean
  children?: ChildItem[]
}

const route = useRoute()

const menuItems = ref<MenuItem[]>([
  { id: 1, name: 'Home', link: '/' },
  {
    id: 2,
    name: 'Services',
    link: '/services',
    children: [
      { id: 21, name: 'Procedures', link: '/service/procedures' },
      { id: 22, name: 'Prolotherapy', link: '/service/prolotherapy' },
      { id: 23, name: 'Prolozone', link: '/service/prolozone' },
      { id: 24, name: 'Platelet Rich Plasma', link: '/service/prp' },
      { id: 25, name: 'Sacroiliac Stabilization', link: '/service/sacroiliac-stabilization' },
      { id: 26, name: 'Perineural Injections', link: '/service/perineural-injections' }
    ]
  },
  { id: 3, name: 'Patient Forms', link: '/patient-forms' },
  { id: 4, name: 'About', link: '/about' },
  { id: 5, name: 'Contact', link: '/contact' }
])

// 根据当前路由设置激活状态
const updateActiveState = () => {
  const currentPath = route.path
  const currentHash = route.hash
  
  menuItems.value.forEach(item => {
    if (item.link.startsWith('/')) {
      // 对于路径链接，检查是否匹配当前路径
      // 首页特殊处理：如果当前路径是 /，或者当前路径是 /#home，都视为首页
      if (item.link === '/') {
        item.active = currentPath === '/' || (currentPath === '/' && currentHash === '#home')
      } else {
        item.active = currentPath === item.link
      }
    } else {
      // 对于锚点链接，检查是否匹配当前 hash
      item.active = currentHash === item.link
    }
  })
}

// 初始化时更新激活状态
onMounted(() => {
  updateActiveState()
  window.addEventListener('hashchange', updateActiveState)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('hashchange', updateActiveState)
})
</script>

<style scoped>
.site-nav {
  position: fixed;
  top: 0;
  z-index: 999999;
  background-color: #312c2a;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  /* 下拉菜单需要完整显示，不要裁切 */
  overflow: visible;
  isolation: isolate;
}

.nav-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 100%;
  box-sizing: border-box;
}

.brand {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

.brand-img {
  height: 45px;
  width: auto;
  display: block;
}

.nav-right {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  margin-left: 40px;
}

/* 品牌名称 */
.brand span {
  color: #ffffff;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 1px;
  white-space: nowrap;
  font-family: 'Georgia', serif;
}

/* 平板设备 */
@media (max-width: 900px) {
  .nav-inner {
    height: auto;
    padding: 14px 20px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .brand {
    width: 100%;
    justify-content: center;
  }

  .brand-img {
    height: 38px;
  }

  .nav-right {
    width: 100%;
    align-items: center;
    margin-left: 0;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 16px;
  }

  .dropdown {
    min-width: 260px;
  }
}

/* 移动设备 */
@media (max-width: 600px) {
  .nav-inner {
    padding: 12px 16px;
  }

  .brand-img {
    height: 40px;
  }

  .contact-info {
    flex-direction: column;
    gap: 4px;
  }

  .location {
    font-size: 14px;
  }

  .phone {
    font-size: 18px;
  }

  .nav-links {
    gap: 6px 12px;
  }

  .nav-links > li > a {
    font-size: 14px;
    padding: 4px 8px;
  }
}

/* 联系信息行 */
.contact-info {
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1;
}

.location {
  color: #aaaaaa;
  font-size: 15px;
}

.phone {
  color: #ffffff;
  font-size: 21px;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: 0.4px;
}

.phone:hover {
  color: #cccccc;
}

/* 导航链接 */
.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 10px;
}

.nav-links>li {
  position: relative;
}

.nav-links>li>a {
  position: relative;
  display: block;
  color: #cccccc;
  text-decoration: none;
  font-size: 16px;
  padding: 5px 2px 8px;
  transition: color 0.2s;
  letter-spacing: 0.2px;
}

.nav-links>li>a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #ffffff;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.2s ease;
}

.nav-links>li>a:hover,
.nav-links>li:hover>a,
.nav-links>li>a.active {
  color: #ffffff;
}

.nav-links>li>a:hover::after,
.nav-links>li:hover>a::after,
.nav-links>li>a.active::after {
  transform: scaleX(1);
}

.arrow {
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-left: 7px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: translateY(-1px) rotate(45deg);
  transition: transform 0.2s ease;
}

.has-dropdown:hover .arrow {
  transform: translateY(2px) rotate(225deg);
}

/* 下拉菜单 */
.has-dropdown {
  position: relative;
}

.dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #312c2a;
  list-style: none;
  margin: 0;
  padding: 14px 0;
  min-width: 300px;
  border: 2px solid rgba(255, 255, 255, 0.75);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 1000000;
  overflow-y: auto;
  pointer-events: auto;
}

.has-dropdown:hover .dropdown {
  display: block;
}

.dropdown li a {
  display: block;
  color: #cccccc;
  text-decoration: none;
  padding: 18px 28px;
  font-size: 17px;
  line-height: 1.25;
  letter-spacing: 0.2px;
  white-space: nowrap;
  transition: color 0.2s;
}

.dropdown li a:hover {
  color: #ffffff;
}

@media (max-width: 900px) {
  .nav-inner {
    height: auto;
    padding: 14px 20px;
    align-items: flex-start;
    gap: 12px;
    flex-direction: column;
  }

  .brand-img {
    height: 34px;
  }

  .nav-right {
    width: 100%;
    align-items: flex-start;
  }

  .nav-links {
    flex-wrap: wrap;
    gap: 8px 16px;
  }

  .dropdown {
    min-width: 260px;
  }
}
</style>
