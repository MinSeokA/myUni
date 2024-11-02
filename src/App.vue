<script setup>
import { RouterView } from 'vue-router'


// 현재 날짜와 시간을 가져오기
const currentDate = new Date();

// 날짜와 시간을 문자열로 포맷팅
const hour = `${currentDate.getHours()}`;
const minute = `${currentDate.getMinutes()}`;


// 포맷팅된 날짜와 시간을 출력
</script>

<script>
import { useAuth } from '@/composables/useAuth';
import { onMounted } from 'vue';

export default {
  setup() {
    const { checkAuth } = useAuth();

    onMounted(() => {
      checkAuth(); // 앱 로드 시 초기 인증 상태 설정
    });
  },
};
</script>

<template>

  <div class="frame">
    <div class="content scroll-container">
      <div class="sticky top-0 status-bar ">
        <div class="clock text-dark bg-[#f9f9f9] border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div class="hour">{{ hour }}</div>
          :
          <div class="minute">{{ minute }}</div>
        </div>
        <img class="mr-2 bg-[#f9f9f9] border-gray-200 dark:bg-gray-900 dark:border-gray-700"
          src="https://newjeans.kr/imgs/common/status-bar.png" alt="" />
      </div>
      <RouterView />
    </div>

  </div>

</template>
