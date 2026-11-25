// Test verisi: `npm run seed` bunları MongoDB'ye yükler (_id'yi MongoDB verir).
// Tarihler "GG-AA-YYYY". En az 2 etkinlik geçmiş tarihli: /events/upcoming onları göstermez.
export const events = [
  {
    title: "Kariyer Günleri 2026",
    category: "Söyleşi",
    capacity: 200,
    date: "01-12-2026",
    time: "10:00",
    location: "Kongre ve Kültür Merkezi",
    description:
      "Sektörden şirketler staj ve iş fırsatlarını öğrencilerle buluşturuyor.",
  },
  {
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "15-10-2026", // geçmiş
    time: "13:30",
    location: "Mühendislik Lab-2",
    description: "Arduino ile basit bir çizgi izleyen robotu adım adım yapıyoruz.",
  },
  {
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    capacity: 80,
    date: "08-12-2026",
    time: "14:00",
    location: "Konferans Salonu B",
    description:
      "Kişisel veri güvenliği ve web uygulamalarındaki temel zafiyetler.",
  },
  {
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    capacity: 25,
    date: "05-11-2026", // geçmiş
    time: "11:00",
    location: "Tasarım Stüdyosu",
    description:
      "Kullanıcı deneyimi odaklı arayüz tasarımı ilkeleri ve Figma uygulamaları.",
  },
  {
    title: "Kodlama Yarışması",
    category: "Yarışma",
    capacity: 40,
    date: "15-12-2026",
    time: "09:00",
    location: "Merkezi Bilgisayar Lab",
    description:
      "Verilen problemleri en kısa sürede ve en optimal kodla çözme yarışı.",
  },
  {
    title: "Yapay Zekâ Semineri",
    category: "Seminer",
    capacity: 100,
    date: "17-12-2026",
    time: "15:00",
    location: "Antalya AKM Mühendislik Amfisi",
    description:
      "Yapay zekâ teknolojilerinin gelecekteki rolü ve iş dünyasına etkileri.",
  },
];
