<template>
  <div class="auth-callback">
    <p>로그인 중입니다...</p>
  </div>
</template>

<script>
export default {
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      this.$router.push({ name: 'my' });
    } else {
      this.$router.push({ name: 'home' });
    }
  },
};
</script>
