<template>
  <div>
    <div
      class="w-[300px] max-lg:w-[170px] max-md:w-[100px] h-[ุ600px] max-lg:h-[300px]  max-md:h-[150px]  border p-5 max-md:p-2 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg hover:bg-[#FCCA81]"
    >
      <div class="flex justify-between h-[30px]">
        <div
          class="flex justify-center items-center rounded-[30px] gap-1 w-[60px] max-md:w-[30px] font-semibold text-[#D78D33] bg-[#FFF1E0]"
        >
          <div class="max-md:flex justify-center">
            <i class="fa-solid fa-star max-md:text-[6px]"></i>
          </div>
          <p class="max-md:text-[6px]"> {{ averageRating }}</p>
        </div>
      </div>

      <div class="flex justify-center items-center h-[300px] max-lg:h-[200px] max-lg:w-[140px] max-md:h-[100px] max-md:w-[70px] w-full overflow-hidden rounded-md">
        <div class="w-full h-full object-cover rounded-md">
          <img
                  :src="product.image || 'https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg'"
                  alt=""
                  class="w-full h-full object-cover"
                />
        </div>

      </div>
      <div class="flex justify-between max-md:flex-col  mt-1 h-[80px] max-md:h-[40px] ">
        <div class=" ">
          <span class="font-bold text-base max-lg:text-[12px]  max-md:text-[6px] hyphens-auto  text-multiline  w-[210px] max-lg:w-[90px] max-md:w-[90px] "> {{ product.name }} </span>
        </div>
        <div class="text-red-600 font-bold text-base max-md:text-[10px]">฿{{ product.price }}</div>
      </div>
      <div class="max-md:hidden">
        <span class=" font-medium text-sm  ">รายละเอียด</span>
        <div
          class="h-[35px] w-full text-xs max-md:text-[6px] text-multiline"
        >
          {{ product.description }}
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import type { Product } from "~/models/product.model";



const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});

const averageRating = computed(() => {
  if (!props.product.Review || props.product.Review.length === 0) return "0";
  const total = props.product.Review.reduce((sum, review) => sum + review.rating, 0);
  return (total / props.product.Review.length).toFixed(1); // ค่าเฉลี่ยทศนิยม 1 ตำแหน่ง
});



</script>

<style scoped>
  .text-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  .text-multiline {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* ตัดข้อความที่เกิน 2 บรรทัด */
    line-clamp: 2;
    overflow: hidden;
  }
</style>
