/**
 * Strategic Vision Data Module
 * Contains all business hierarchy data for the application
 */

export const strategicVisionData = {
  finans: {
    areaTitle: "Finans",
    pluralTitle: "Finansal Amaçlar",
    singularHedefTitle: "Finansal Hedef",
    pluralHedefTitle: "Finansal Hedefler",
    pillarColor: '#D9534F',
    pillarColorLight: '#F8D7DA',
    useDarkText: true,
    amacs: Array.from({ length: 5 }, (_, i) => ({
      id: `A${i + 1}`,
      title: `Karlılığı artırmak ve finansal sürdürülebilirliği sağlamak ana hedefimizdir. Bu amaç altında çeşitli stratejiler izlenecektir. Pazar payını genişletme ve maliyet optimizasyonu önceliklidir.`,
      icon: '⭐',
      hedefler: Array.from({ length: Math.floor(Math.random() * 3) + 5 }, (__, j) => ({
        id: `H${j + 1}`,
        title: `Net kar marjını %${(j + 1) * 2}'ye çıkarmak ve operasyonel giderleri %${j + 3} azaltmak.`,
        aksiyons: Array.from({ length: Math.floor(Math.random() * 3) + 3 }, (___, k) => ({
          id: `.${k + 1}`,
          title: `Aksiyon ${k + 1}: Detaylı bütçe takibi ve raporlama sistemi kurmak.`,
          subText: [
            `KPI ${k + 1}.1: Aylık bütçe sapma oranı < %2`,
            `KPI ${k + 1}.2: Raporlama frekansı: Haftalık`,
            k % 2 === 0 ? `KPI ${k + 1}.3: Ek maliyet tasarruf potansiyeli tespiti` : null
          ].filter(Boolean)
        }))
      }))
    }))
  },
  
  musteri: {
    areaTitle: "Müşteri",
    pluralTitle: "Müşteri Amaçları",
    singularHedefTitle: "Müşteri Hedefi",
    pluralHedefTitle: "Müşteri Hedefleri",
    pillarColor: '#5CB85C',
    pillarColorLight: '#DFF0D8',
    useDarkText: true,
    amacs: Array.from({ length: 4 }, (_, i) => ({
      id: `A${i + 6}`,
      title: `Müşteri memnuniyetini ve bağlılığını en üst düzeye çıkarmak. Marka bilinirliğini global pazarda artırmak.`,
      icon: '⭐',
      hedefler: Array.from({ length: Math.floor(Math.random() * 3) + 5 }, (__, j) => ({
        id: `H${j + 1}`,
        title: `Müşteri memnuniyet skorunu (NPS) +50 üzerine çıkarmak. Sadık müşteri oranını %${60 + j} seviyesine getirmek.`,
        aksiyons: Array.from({ length: Math.floor(Math.random() * 3) + 3 }, (___, k) => ({
          id: `.${k + 1}`,
          title: `Aksiyon ${k + 1}: Kişiselleştirilmiş pazarlama kampanyaları yürütmek.`,
          subText: [
            `KPI ${k + 1}.1: Kampanya dönüşüm oranı > %${k + 2}`,
            `KPI ${k + 1}.2: Yeni abone sayısı artışı`
          ]
        }))
      }))
    }))
  },
  
  dahiliSurecler: {
    areaTitle: "Dahili Süreçler",
    pluralTitle: "Dahili Süreçler İçin Amaçlar",
    singularHedefTitle: "Dahili Süreçler İçin Hedef",
    pluralHedefTitle: "Dahili Süreç Hedefleri",
    pillarColor: '#428BCA',
    pillarColorLight: '#D9EDF7',
    useDarkText: false,
    amacs: Array.from({ length: 7 }, (_, i) => ({
      id: `A${i + 10}`,
      title: `Operasyonel verimliliği optimize etmek ve süreçleri dijitalleştirmek. Kaynak kullanımını en aza indirmek.`,
      icon: '⭐',
      hedefler: Array.from({ length: Math.floor(Math.random() * 3) + 5 }, (__, j) => ({
        id: `H${j + 1}`,
        title: `Ana süreçlerde otomasyon oranını %${40 + j * 5}'e yükseltmek. Proje teslim sürelerini %${10 + j} kısaltmak.`,
        aksiyons: Array.from({ length: Math.floor(Math.random() * 3) + 3 }, (___, k) => ({
          id: `.${k + 1}`,
          title: `Aksiyon ${k + 1}: Yeni ERP sistemi entegrasyonunu tamamlamak.`,
          subText: [
            `KPI ${k + 1}.1: Sistem geçiş süresi < ${6 - k} ay`,
            `KPI ${k + 1}.2: Kullanıcı adaptasyon oranı > %80`
          ]
        }))
      }))
    }))
  },
  
  ogrenmeGelisim: {
    areaTitle: "Öğrenme ve Gelişim",
    pluralTitle: "Öğrenme ve Gelişim Amaçları",
    singularHedefTitle: "Öğrenme ve Gelişim Hedefi",
    pluralHedefTitle: "Öğrenme ve Gelişim Hedefleri",
    pillarColor: '#F0AD4E',
    pillarColorLight: '#FCF8E3',
    useDarkText: true,
    amacs: Array.from({ length: 6 }, (_, i) => ({
      id: `A${i + 17}`,
      title: `Çalışan yetkinliklerini ve motivasyonunu artırmak. İnovasyon kültürünü teşvik etmek ve liderlik gelişimini desteklemek.`,
      icon: '⭐',
      hedefler: Array.from({ length: Math.floor(Math.random() * 3) + 5 }, (__, j) => ({
        id: `H${j + 1}`,
        title: `Çalışan başına yıllık eğitim saatini ${30 + j * 2} saate çıkarmak. İç terfi oranını %${20 + j} yapmak.`,
        aksiyons: Array.from({ length: Math.floor(Math.random() * 3) + 3 }, (___, k) => ({
          id: `.${k + 1}`,
          title: `Aksiyon ${k + 1}: Mentorluk programı başlatmak ve yaygınlaştırmak.`,
          subText: [
            `KPI ${k + 1}.1: Programa katılım oranı > %50`,
            `KPI ${k + 1}.2: Mentor-menti memnuniyet oranı > 4/5`
          ]
        }))
      }))
    }))
  }
};

/**
 * Get strategic area data by key
 * @param {string} areaKey - The strategic area key
 * @returns {Object} Strategic area data
 */
export const getStrategicAreaData = (areaKey) => {
  return strategicVisionData[areaKey] || null;
};

/**
 * Get all strategic area keys
 * @returns {Array} Array of strategic area keys
 */
export const getStrategicAreaKeys = () => {
  return Object.keys(strategicVisionData);
};