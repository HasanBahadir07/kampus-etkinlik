import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Yapay Zeka ve Gelecek Semineri",
    category: "Seminer",
    capacity: 100,
    date: "2026-11-15",
    time: "14:00",
    location: "Antalya AKM Mühendislik Amfisi",
    description: "Yapay zeka teknolojilerinin gelecekteki rolü ve iş dünyasına etkileri tartışılacak.",
    image: "/afis.svg"
  },
  {
    id: "event-2",
    title: "React ve TypeScript Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "2026-11-18",
    time: "10:00",
    location: "Mühendislik Lab-2",
    description: "Sıfırdan Vite, React ve TypeScript ile modern web geliştirme pratikleri.",
    image: "/afis.svg"
  },
  {
    id: "event-3",
    title: "Girişimcilik Söyleşileri",
    category: "Söyleşi",
    capacity: 50,
    date: "2026-11-20",
    time: "15:30",
    location: "Öğrenci Yaşam Merkezi",
    description: "Başarılı girişimciler deneyimlerini ve tavsiyelerini gençlerle paylaşıyor.",
    image: "/afis.svg"
  },
  {
    id: "event-4",
    title: "Algoritma ve Kodlama Yarışması",
    category: "Yarışma",
    capacity: 40,
    date: "2026-11-25",
    time: "09:00",
    location: "Merkezi Bilgisayar Lab",
    description: "Verilen problemleri en kısa sürede ve en optimal kodla çözme yarışı.",
    image: "/afis.svg"
  },
  {
    id: "event-5",
    title: "Siber Güvenlik Farkındalığı",
    category: "Seminer",
    capacity: 80,
    date: "2026-12-01",
    time: "13:00",
    location: "Konferans Salonu B",
    description: "Kişisel veri güvenliği ve web uygulamalarındaki temel zafiyetler.",
    image: "/afis.svg"
  },
  {
    id: "event-6",
    title: "UI/UX Tasarım İlkeleri Atölyesi",
    category: "Atölye",
    capacity: 25,
    date: "2026-12-05",
    time: "11:00",
    location: "Tasarım Stüdyosu",
    description: "Kullanıcı deneyimi odaklı arayüz tasarımı ilkeleri ve Figma uygulamaları.",
    image: "/afis.svg"
  }
];