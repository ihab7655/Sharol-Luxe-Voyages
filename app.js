// app.js
// استيراد الدوال المطلوبة من Firebase Firestore
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
// استيراد التطبيق من ملف إعدادات Firebase الخارجي (firebase-config.js)
import { app } from "./firebase-config.js";

// تهيئة Firestore
const db = getFirestore(app);

// متغير لتخزين معرّف التسجيل بعد إنشاء السجل
let registrationId = null;
// متغير لتحديد ما إذا قام المستخدم بحجز رقم بالفعل
let hasReserved = false;

// الحصول على عناصر DOM الأساسية
const registrationSection = document.getElementById("registrationSection");
const rouletteSection = document.getElementById("rouletteSection");
const registerBtn = document.getElementById("registerBtn");
const messageEl = document.getElementById("message");

// دالة لتسجيل المستخدم (بدون بريد إلكتروني أو كلمة مرور)
async function registerUser() {
  try {
    // إضافة سجل في مجموعة "registrations" مع حفظ توقيت التسجيل
    const docRef = await addDoc(collection(db, "registrations"), {
      registeredAt: new Date().toISOString()
    });
    registrationId = docRef.id;
    messageEl.style.color = "green";
    messageEl.textContent = "تم التسجيل بنجاح! رقم التسجيل: " + registrationId;
    // بعد التسجيل، إخفاء قسم التسجيل وعرض قسم الروليت
    registrationSection.style.display = "none";
    rouletteSection.style.display = "block";
  } catch (error) {
    messageEl.style.color = "red";
    messageEl.textContent = "حدث خطأ في التسجيل: " + error.message;
    console.error("Registration error:", error);
  }
}

// ربط دالة التسجيل بزر التسجيل
if (registerBtn) {
  registerBtn.addEventListener("click", registerUser);
}

// دالة لمعالجة نقر المستخدم على رقم من أرقام الروليت
function handleNumberClick(event) {
  if (hasReserved) {
    alert("لقد قمت بحجز رقم بالفعل.");
    return;
  }
  const cell = event.currentTarget;
  // قراءة الرقم المختار (يمكن تعديل الطريقة حسب تنسيق الرقم داخل العنصر)
  const chosenNumber = cell.textContent.trim();
  
  // إضافة سجل في مجموعة "reservations" لتسجيل حجز الرقم مع معرّف التسجيل
  addDoc(collection(db, "reservations"), {
    registrationId: registrationId,
    reservedNumber: chosenNumber,
    reservedAt: new Date().toISOString()
  })
  .then(docRef => {
    hasReserved = true;
    cell.classList.add("reserved"); // إضافة نمط CSS للتأكيد على الحجز
    alert("تم حجز الرقم " + chosenNumber);
  })
  .catch(error => {
    alert("حدث خطأ أثناء حجز الرقم: " + error.message);
    console.error("Reservation error:", error);
  });
}

// بعد تحميل الصفحة، إضافة مستمعي النقر لجميع الخلايا (أرقام الروليت)
window.addEventListener("DOMContentLoaded", () => {
  // التأكد من وجود خلايا (يفترض أن كل رقم داخل العنصر له الفئة "cell")
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.addEventListener("click", handleNumberClick);
  });
});
