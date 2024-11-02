<template>


  <div class="scroll-section h-full text-center pt-[5rem]" id="home">
    <img src="https://cdn.lunaiz.com/my_uni_assets/logo-l.svg" alt="my uni" class="w-40 mx-auto mb-2">
    <p class="text-lg text-gray-600 mt-2">내가 지원한 대학과 결과를 공유해보세요</p>

    <!-- 프로필 설정 섹션 -->
    <div class="mt-8 space-y-6">
      <!-- 프로필 사진 등록 -->
      <div class="flex flex-col items-center">
        <label class="text-gray-700 text-sm font-semibold mb-1">프로필 사진 등록</label>
        <input type="file" accept="image/*" class="text-gray-600 border border-gray-300 rounded-lg p-2 w-3/4">
      </div>

      <!-- 사용자 정의 URL 등록 -->
      <div class="flex flex-col items-center">
        <label class="text-gray-700 text-sm font-semibold mb-1">사용자 정의 URL 등록</label>
        <div class="flex items-center w-3/4">
          <input type="text" placeholder="예: my-unique-url" class="border border-gray-300 rounded-lg p-2 flex-grow">
          <button class="ml-2 bg-blue-500 text-white px-2 py-2 rounded-lg text-sm font-semibold">중복 확인</button>
        </div>
      </div>

      <!-- 합격/불합격 표시 여부 토글 -->
      <div class="flex items-center justify-between w-3/4 mx-auto">
        <label class="text-gray-700 text-sm font-semibold">합격/불합격 표시 여부</label>
        <div class="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
          <input type="checkbox" id="pass_fail_display" class="toggle-checkbox absolute opacity-0 w-0 h-0" />
          <label for="pass_fail_display"
            class="toggle-label block w-12 h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ease-in-out">
            <span
              class="toggle-circle absolute left-0 top-0 bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out"></span>
          </label>
        </div>
      </div>

      <!-- 수시 지원 페이지 표시 여부 토글 -->
      <div class="flex items-center justify-between w-3/4 mx-auto">
        <label class="text-gray-700 text-sm font-semibold">수시 지원 페이지 표시 여부</label>
        <div class="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
          <input type="checkbox" id="suji_display" class="toggle-checkbox absolute opacity-0 w-0 h-0" />
          <label for="suji_display"
            class="toggle-label block w-12 h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ease-in-out">
            <span
              class="toggle-circle absolute left-0 top-0 bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out"></span>
          </label>
        </div>
      </div>

      <!-- 정시 지원 페이지 표시 여부 토글 -->
      <div class="flex items-center justify-between w-3/4 mx-auto">
        <label class="text-gray-700 text-sm font-semibold">정시 지원 페이지 표시 여부</label>
        <div class="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
          <input type="checkbox" id="jeongsi_display" class="toggle-checkbox absolute opacity-0 w-0 h-0" />
          <label for="jeongsi_display"
            class="toggle-label block w-12 h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ease-in-out">
            <span
              class="toggle-circle absolute left-0 top-0 bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- 저장 버튼 -->
    <button
      class="mt-[250px] rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 py-2 w-[90%] text-lg text-white font-semibold">
      저장
    </button>
  </div>





  <!-- 수시 지원 섹션 -->
  <div class="scroll-section h-full text-center pt-[5rem]" id="suji">
    <h2 class="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4">수시 지원</h2>
    <div class="grid grid-cols-3 gap-4 mt-8">
      <!-- 기존 수시 지원 카드들 -->
      <Card v-for="(university, index) in sujiUniversities" :key="index" :university="university" />

      <!-- 수시 등록 버튼 카드 -->
      <div @click="openModal('수시')"
        class="bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition duration-150 ease-in-out">
        <span class="text-3xl font-bold text-gray-500">+</span>
      </div>
    </div>
  </div>

  <!-- 정시 지원 섹션 -->
  <div class="scroll-section h-full text-center pt-[5rem]" id="jeongsi">
    <h2 class="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4">정시 지원</h2>
    <div class="grid grid-cols-1 gap-4 mt-8 overflow-x-auto px-4">
      <!-- 기존 정시 지원 HorizontalCard -->
      <HorizontalCard v-for="(university, index) in jeongsiUniversities" :key="index" :university="university" />

      <!-- 정시 등록 버튼 카드 -->
      <div @click="openModal('정시')"
        class="bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition duration-150 ease-in-out p-4 text-left">
        <span class="text-3xl font-bold text-gray-500">+</span>
      </div>
    </div>
  </div>

  <!-- 등록 팝업 -->
  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">{{ modalType }} 지원 등록</h3>

      <!-- 대학 검색 -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">대학 검색</label>
        <input type="text" v-model="searchQuery" @input="searchUniversity" placeholder="대학 이름 입력"
          class="w-full border border-gray-300 rounded-lg p-2">
        <ul class="bg-white border border-gray-300 rounded-lg mt-2 max-h-40 overflow-y-auto"
          v-if="filteredUniversities.length">
          <li v-for="(uni, index) in filteredUniversities" :key="index" @click="selectUniversity(uni)"
            class="p-2 hover:bg-gray-100 cursor-pointer">{{ uni.name }}</li>
        </ul>
      </div>

      <!-- 학과명 입력 -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">학과명</label>
        <input type="text" v-model="department" placeholder="학과명 입력"
          class="w-full border border-gray-300 rounded-lg p-2">
      </div>

      <!-- 전형 입력 -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">전형</label>
        <input type="text" v-model="applicationType" placeholder="전형 입력"
          class="w-full border border-gray-300 rounded-lg p-2">
      </div>

      <!-- 저장 버튼 -->
      <button @click="saveApplication"
        class="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg py-2 px-4 w-full font-semibold">
        저장하기
      </button>
    </div>
  </div>

</template>

<script>
import Card from '../components/card.vue';
import HorizontalCard from '../components/HorizontalCard.vue';

export default {
  components: {
    Card,
    HorizontalCard
  },
  data() {
    return {
      sujiUniversities: [
        { name: "서울대학교", department: "컴퓨터공학과", logo: "https://path_to_logo/seoul_univ.png" },
        // ...더 많은 데이터
      ],
      jeongsiUniversities: [
        { name: "서울대학교", department: "기계공학과", logo: "https://path_to_logo/seoul_univ.png" },
        // ...더 많은 데이터
      ],
      isModalOpen: false,
      modalType: '',
      searchQuery: '',
      filteredUniversities: [],
      selectedUniversity: null,
      department: '',
      applicationType: ''
    };
  },
  methods: {
    openModal(type) {
      this.modalType = type;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    searchUniversity() {
      // DB에서 대학 목록을 필터링하여 검색어에 맞는 대학들만 표시
      const allUniversities = [...this.sujiUniversities, ...this.jeongsiUniversities];
      this.filteredUniversities = allUniversities.filter(uni =>
        uni.name.includes(this.searchQuery)
      );
    },
    selectUniversity(university) {
      this.selectedUniversity = university;
      this.searchQuery = university.name;
      this.filteredUniversities = [];
    },
    saveApplication() {
      // 데이터를 저장하는 로직을 추가하세요
      const applicationData = {
        type: this.modalType,
        university: this.selectedUniversity,
        department: this.department,
        applicationType: this.applicationType
      };
      console.log('Saved Application:', applicationData);

      // 모달 닫기
      this.closeModal();
    }
  }
};
</script>

<style>
/* Custom Toggle Styles */
.toggle-checkbox:checked+.toggle-label {
  background: linear-gradient(to bottom right, #3b82f6, #8b5cf6);
}

.toggle-checkbox:checked+.toggle-label .toggle-circle {
  transform: translateX(100%);
}

.toggle-label {
  position: relative;
}

.toggle-circle {
  position: absolute;
  top: 0rem;
  left: 0rem;
}
</style>
