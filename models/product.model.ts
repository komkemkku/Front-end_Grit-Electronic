export interface Product {
    id: number;
    name: string;
    detail: string;
    price: number;
    amount: number;
    img: string;
    categoryId: number;
}

export interface Category {
    id: number;
    name: string;
    img: string;
}

export interface paymentInfo {
    qrCodeUrl: string, // URL ของ QR Code
    bankName: string,
    accountNumber: string,
    accountName: string,
    totalAmount: number,
}

export interface Address {
    title: string;        // ชื่อสถานที่ (บ้าน, หอพัก ฯลฯ)
    name: string;         // ชื่อผู้รับ
    houseNo: string;      // บ้านเลขที่
    village: string;      // หมู่บ้าน/อาคาร
    subDistrict: string;  // ตำบล/แขวง
    district: string;     // อำเภอ/เขต
    province: string;     // จังหวัด
    postalCode: string;   // รหัสไปรษณีย์
    phone: string;        
  }
  

export interface Order {
    id: string;
    date: string;
    total: number;
    deliveryDate: string;
    products: Product[];
    shippingStatus: ShippingStatus[];
    namerecipe: string;
    address: string;
  }

export interface ShippingStatus {
    text: string;
    date: string;
    isCurrent: boolean;
  }