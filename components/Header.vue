<template>
  <div>
    <div class="h-[80px] pt-[5px] border border-b-black grid items-center">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="pl-[30px]">
          <img
            class="w-[150px]"
            src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png"
            alt="Logo"
          />
        </NuxtLink>

        <!-- Nav and Icons -->
        <div class="flex items-center justify-between w-full">
          <!-- Nav Menu -->
          <div class="flex items-center fonsubtheader">
            <div class="mx-4">
              <NuxtLink
                to="/product"
                class="hover:underline hover:text-[#EE973C]"
                >สินค้าทั้งหมด</NuxtLink
              >
            </div>

            <!-- Dropdown  -->
            <DropdownCategory />
          </div>

          <!-- Icons (Visible in Desktop) -->
          <div class="hidden md:flex items-center gap-4 md:gap-6 mx-3 md:mx-5">
            <!-- cart -->
            <svg
              class="w-[30px] h-[30px] text-gray-800 dark:text-white cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              @click="store.cartAction = !store.cartAction"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.3"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>

            <!-- fav -->
            <svg
              class="w-[30px] h-[30px] text-gray-800 dark:text-white cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              @click="store.favouriteAction = !store.favouriteAction"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.3"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>

            <!-- Noti -->
            <!-- <svg
              class="w-[30px] h-[30px] text-gray-800 dark:text-white cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              @click="store.notificationAction = !store.notificationAction"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.3"
                d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
              />
            </svg> -->

            <div>
              <DropdownProfile />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Popup -->
    <div
      v-if="store.cartAction"
      @click="store.cartAction = !store.cartAction"
      class="fixed inset-0 bg-black/50 flex justify-end z-50"
    >
      <div @click.stop>
        <PopupCart />
      </div>
    </div>

    <!-- Fav Popup -->
    <div
      v-if="store.favouriteAction"
      @click="store.favouriteAction = !store.favouriteAction"
      class="fixed inset-0 bg-black/50 flex justify-end z-50"
    >
      <div @click.stop>
        <PopupFavorite />
      </div>
    </div>

    <!-- Noti Popup -->
    <div
      v-if="store.notificationAction"
      @click="store.notificationAction = !store.notificationAction"
      class="fixed inset-0 bg-black/50 flex justify-end z-50"
    >
      <div @click.stop>
        <PopupNotification />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
</script>

<style scoped></style>
