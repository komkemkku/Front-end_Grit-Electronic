<template>
    <div>
      <div>
        <div class="relative group">
          <!-- ปุ่ม User -->
          <button
            class="flex items-center text-black hover:text-indigo-500"
            type="button"
          >
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/268/268441.png"
              alt="User"
            />
          </button>
  
          <!-- Dropdown Menu -->
          <div
            class=" bg-white rounded-lg border shadow  hidden group-hover:block absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y"
          >
            <ul class="py-2 text-sm text-gray-700">
              <li>
                <NuxtLink
                  to="/profile"
                  class="block px-4 py-2 hover:bg-gray-100"
                >
                  บัญชีผู้ใช้
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/profile/address"
                  class="block px-4 py-2 hover:bg-gray-100"
                >
                  ที่อยู่
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/order/checkout"
                  class="block px-4 py-2 hover:bg-gray-100"
                >
                  คำสั่งซื้อ
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/login"
                  class="block px-4 py-2 hover:bg-gray-100"
                >
                  ออกจากระบบ
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts"></script>
  
  <style scoped>
  </style>
  