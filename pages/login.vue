<template>
  <div
    class="min-h-screen bg-[url('https://static.vecteezy.com/system/resources/thumbnails/042/345/355/small/pastel-gradient-blur-background-vector.jpg')] bg-cover bg-center flex justify-center items-center p-4 sm:p-6"
  >
    <form
    @submit.prevent="login"
      class="rounded-2xl drop-shadow-2xl bg-white w-full max-w-[500px] p-6 sm:p-8 m-6 sm:m-10"
    >
      <!-- Logo -->
      <div class="flex justify-center">
        <img src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png" class="w-[150px] sm:w-[190px] md:w-[230px] lg:w-[260px]" />
      </div>
      <div class="flex justify-center font-normal text-lg sm:text-xl mt-4 sm:mt-6">
        <h1>เข้าสู่ระบบ</h1>
      </div>

      <!-- Email Input -->
      <div class="text-base mt-8 sm:mt-10">
        <label for="email"> อีเมล </label>
        <input
          type="text"
          id="email"
          v-model="logins.email"
          class="inputbox inputboxform w-full"
          required
          placeholder="กรุณาใส่อีเมล"
          @keyup.enter="login"
        />
      </div>

      <!-- Password Input -->
      <div class="text-base mt-6 sm:mt-8 relative">
        <label for="password"> รหัสผ่าน </label>
        <input
          :type="passwordVisible ? 'text' : 'password'"
          id="password"
          v-model="logins.password"
          class="inputbox inputboxform w-full"
          required
          placeholder="กรุณาใส่รหัสผ่าน"
          @keyup.enter="login"
        />
        <span
          class="absolute right-4 top-[38px] sm:top-[42px] cursor-pointer"
          @click="togglePasswordVisibility"
        >
          <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>

      <!-- Forget Password -->
      <div class="flex justify-end mt-4 sm:mt-5 text-base">
        <NuxtLink
          to="/forgetpassword"
          class="hover:text-[#FD8C35] font-normal hover:underline"
        >
          ลืมรหัสผ่าน?
        </NuxtLink>
      </div>

      <!-- Login Button -->
      <div class="mt-10 sm:mt-12 flex justify-center">
        <button
          type="submit"
          class="w-full max-w-[250px] sm:max-w-[300px] h-[40px] sm:h-[45px] bg-[#EE973C] hover:bg-[#FD8C35]/70 rounded-xl text-white text-base sm:text-lg"
        >
          เข้าสู่ระบบ
        </button>
      </div>

      <!-- Divider -->
      <hr class="border-black/50 my-5 sm:my-6" />

      <!-- Register Now -->
      <div class="flex justify-center text-base">
        <p>ไม่มีบัญชีผู้ใช้ ?</p>
        <NuxtLink
          to="/register"
          class="hover:text-[#FD8C35] ml-2 font-normal hover:underline"
        >
          ลงทะเบียน
        </NuxtLink>
      </div>
    </form>
    <Loading :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { ref } from "vue";
import type { Login } from "~/models/page.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

definePageMeta({
  layout: "auth",
});


const passwordVisible = ref(false);
const router = useRouter();
const store = useIndexStore();
const loading = ref(false); 

const logins = ref<Login>({
  email: "",
  password: "",
});

const login = async () => {
  loading.value = true;
  await service.auth.login(logins.value)
    .then(async(resp: any) => {

      
      const refToken = useStatefulCookie("token");
      refToken.value = resp.data.token;
      console.log(resp.data);
      store.$state.token = resp.data.token;
      // เรียกใช้ getinfo เพื่อดึงข้อมูลผู้ใช้หลังได้ token
      await getuserinfo()



      if (store.$state.token != null) {
        router.push("/");
      }
    })
    .catch((error: any) => {
      console.error(error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง.",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

const getuserinfo = async () => {
  await service.product.getUserInfo()
  .then((resp: any) => {
    const data = resp.data.data;
    console.log(data);

    store.$state.userId = data.id;
  })
  .catch((error: any) => {
     console.error(error);
   })
   .finally(() => {});
}




const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};


</script>

<style scoped>
</style>
