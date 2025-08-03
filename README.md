# Pet Hotel (Web Programming Project)

โปรเจ็ควิชา Web Programming ปี 2 โดยผมได้เลือกทำโปรเจ็ค ปี 2 เป็น “Pet Hotel” เขียนด้วย Next.js กับ React

---

## Scope งานสามารถทำอะไรได้บ้าง

- **จองห้องพักสัตว์เลี้ยง**  
  - เพิ่ม–ลบ–แก้ไข ข้อมูลการจอง  
  - กำหนดวันเช็คอิน–เช็คเอาต์  
- **จัดการข้อมูลสัตว์เลี้ยง & เจ้าของ**  
  - ฟอร์มกรอกข้อมูล ชื่อ ประเภท อายุ ฯลฯ  
- **ดูสถานะห้องว่าง/เต็ม**  
  - แยกตามประเภทห้อง (Standard / Deluxe / Suite)  
- **ระบบ Authentication เบื้องต้น**  
  - Login / Logout (mock user)  
- **Responsive Design**  
  - ปรับหน้าเว็บให้สวยงามบนมือถือและเดสก์ท็อป

---

## Library ที่ใช้

- **Next.js** (React framework)  
- **TypeScript** (optional แต่แนะนำ)  
- **Tailwind CSS** (จัดการสไตลิ่ง)  
- **React Hook Form** (จัดการฟอร์ม)  
- **SWR** (ดึง–แคชข้อมูลจาก API)  
- **Mock API** (ใช้ไฟล์ JSON / Next.js API routes)

---

## ติดตั้งและใช้งาน

1. โคลนโปรเจ็ค
   ```bash
   git clone https://github.com/Kasidetx/pet_hotel.git
   cd pet_hotel
   ```

2. ติดตั้ง dependencies
   ```bash
   npm install
   # หรือ
   yarn install
   ```

3. รันในโหมดพัฒนา
   ```bash
   npm run dev
   # หรือ
   yarn dev
   ```
   แล้วเปิดเบราว์เซอร์ที่ `http://localhost:3000`

4. ถ้าจะ build แล้วรันจริง
   ```bash
   npm run build
   npm start
   # หรือ
   yarn build
   yarn start
   ```

---

## โครงสร้างโปรเจ็คคร่าว ๆ

```
/pages
  ├ index.tsx            – หน้า Home & Dashboard
  ├ bookings/            – หน้า จัดการการจอง
  ├ pets/                – หน้า จัดการข้อมูลสัตว์เลี้ยง
  ├ api/                 – Mock API routes
/components
  ├ Layout.tsx           – คอมโพเนนต์ Layout หลัก
  ├ BookingForm.tsx      – ฟอร์มจองห้อง
  ├ PetForm.tsx          – ฟอร์มข้อมูลสัตว์เลี้ยง
  └ ...                  – ส่วนประกอบย่อยอื่น ๆ
/styles
  └ globals.css          – สไตล์ทั่วทั้งแอป (Tailwind)
/data
  └ mock.json            – ข้อมูลตัวอย่างสำหรับ API
```

---

## หมายเหตุและข้อจำกัด

**Disclaimer:** โปรเจ็คนี้สร้างขึ้นเพื่อการเรียนรู้ในวิชา Web Programming เท่านั้น ไม่ได้เชื่อมต่อกับฐานข้อมูลจริง และห้ามนำโปรเจ็คนี้ไปใช้ในเชิงพาณิชย์
