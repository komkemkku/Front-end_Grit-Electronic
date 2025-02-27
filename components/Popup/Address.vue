<template>
  <div class="w-full md:w-[500px] border-2 flex flex-col justify-center bg-white drop-shadow-lg rounded-lg">
    <div class="p-4 border-b-2">
      <h1 class="text-xl font-bold mb-4">เพิ่มที่อยู่ใหม่</h1>
      <form @submit.prevent="addShipment">

        <div class="mb-4">
          <label class="block text-sm font-medium">ชื่อผู้รับ</label>
          <input v-model="shipment.firstname" class="w-full p-2 border rounded mt-2" placeholder="ชื่อ" required />
          <input v-model="shipment.lastname" class="w-full p-2 border rounded mt-2" placeholder="นามสกุล" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">บ้านเลขที่</label>
          <input v-model="shipment.address" class="w-full p-2 border rounded h-16" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">ตำบล/แขวง</label>
          <input v-model="shipment.sub_district" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">อำเภอ/เขต</label>
          <input v-model="shipment.district" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">จังหวัด</label>
          <input v-model="shipment.province" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">รหัสไปรษณีย์</label>
          <input v-model="shipment.zip_code" class="w-full p-2 border rounded" required @input="validateZipCode" />
          <p v-if="zipCodeError" class="text-red-500 text-sm mt-1">
              {{ zipCodeError }}
            </p>
        </div>

        <div class="flex justify-between mt-6">
          <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" @click="cancel">
            ยกเลิก
          </button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            บันทึก
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { ref } from "vue";
import type { ShipmentCreate, ShipmentRes } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";
definePageMeta({
  middleware: 'auth'
})

const store = useIndexStore();
const router = useRouter();
const loading = ref(true);

// กำหนดค่า shipment ให้เป็นค่าเริ่มต้น
const shipment = ref<ShipmentCreate>({
  firstname: "",
  lastname: "",
  address: "",
  zip_code: "",
  sub_district: "",
  district: "",
  province: "",
});

const shipmentRes = ref<ShipmentRes>({
  firstname: "",
  lastname: "",
  address: "",
  zip_code: "",
  sub_district: "",
  district: "",
  province: "",
});

// State เก็บ Error ของ Zip Code
const zipCodeError = ref<string | null>(null);

// ✅ ฟังก์ชันตรวจสอบ Zip Code
const validateZipCode = () => {
  const zip = shipment.value.zip_code;
  
  if (!/^\d+$/.test(zip)) {
    zipCodeError.value = "รหัสไปรษณีย์ต้องเป็นตัวเลขเท่านั้น";
  } else if (zip.length !== 5) {
    zipCodeError.value = "รหัสไปรษณีย์ต้องมี 5 หลัก";
  } else {
    zipCodeError.value = null;
  }
};

// เมื่อแอดที่อยู่ใหม่ให้เรียกฟังก์ชันนี้
const addShipment = async () => {
  validateZipCode();
  if (zipCodeError.value) {
    Swal.fire({
      title: "ข้อมูลไม่ถูกต้อง!",
      text: zipCodeError.value,
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }
  loading.value = true;
  await service.product.addShipment(shipment.value)
    .then((resp: any) => {
      const data = resp.data.data;
      if (data) {
        Swal.fire({
          title: "เพิ่มที่อยู่สำเร็จ!",
          text: "ที่อยู่ของคุณได้ถูกเพิ่มแล้ว!",
          icon: "success",
          confirmButtonText: "ตกลง",
        })
        .then(() => {
        store.addressAction = false; // ปิด Popup
        router
            .push({ path: "/profile/address" })
            .then(() => window.location.reload());
      });
      }
      // อัพเดทข้อมูล shipmentRes
      shipmentRes.value = {
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        zip_code: data.zip_code,
        sub_district: data.sub_district,
        district: data.district,
        province: data.province,
      };
    })
    .catch((error: any) => {
      console.error(error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถเพิ่มที่อยู่ได้ กรุณาลองใหม่",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

// ฟังก์ชันยกเลิก
const cancel = () => {
  loading.value = true;
  router.push("/profile/address").then(() => window.location.reload());
  loading.value = false;
};

</script>

<style scoped>
</style>
