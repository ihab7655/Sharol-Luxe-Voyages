// بيانات الخدمات (الأيقونات والنصوص)
const services = [
    { icon: "fa-passport", text: "استخراج التأشيرة" },
    { icon: "fa-calendar-alt", text: "حجز مواعيد التأشيرة" },
    { icon: "fa-plane", text: "حجز طائرة" },
    { icon: "fa-balance-scale", text: "استشارة قانونية" },
    { icon: "fa-file-alt", text: "تهيئة ملف تأشيرة" },
    { icon: "fa-shield-alt", text: "تأمين سفر" },
    { icon: "fa-hotel", text: "حجز الفندق" },
    { icon: "fa-suitcase-rolling", text: "خدمات السياحة" }
];

// تحديد مكان الإضافة داخل HTML
const serviceGrid = document.getElementById("serviceGrid");

// إنشاء البطاقات وإضافتها إلى القسم ديناميكيًا
services.forEach(service => {
    // إنشاء عنصر بطاقة الخدمة
    const serviceItem = document.createElement("div");
    serviceItem.classList.add("service-item");

    // إنشاء أيقونة الخدمة
    const icon = document.createElement("i");
    icon.classList.add("fas", service.icon);

    // إنشاء النص الوصفي للخدمة
    const text = document.createElement("p");
    text.textContent = service.text;

    // تجميع العناصر في البطاقة
    serviceItem.appendChild(icon);
    serviceItem.appendChild(text);

    // إضافة البطاقة إلى الشبكة
    serviceGrid.appendChild(serviceItem);
});
