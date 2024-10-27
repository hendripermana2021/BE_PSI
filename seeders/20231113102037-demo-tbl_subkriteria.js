"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_subkriteria",
      [
        {
          //1
          name_sub: "Sangat dibutuhkan",
          description:
            "Program yang termasuk dalam kategori ini merupakan respon terhadap permasalahan mendesak yang mempengaruhi kesejahteraan masyarakat secara langsung. Implementasi program ini dianggap krusial untuk mengurangi dampak negatif yang mungkin terjadi, serta untuk mencapai hasil yang diinginkan dalam jangka panjang",
          id_kriteria: 1,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //2
          name_sub: "Dibutuhkan",
          description:
            "Program yang termasuk dikaterikan merupakan pembekalan atau pemberian ilmu kepada masyarakat sekitar bukan beradasarkan atas kebutuhan mendesak atau masalah ideologi yang menyimpang.",
          id_kriteria: 1,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //3
          name_sub: "Luas (Banyak penerima manfaat)",
          description:
            "Program yang memiliki luas penerima manfaat mencakup kelompok masyarakat yang besar, misalnya seluruh warga di suatu wilayah atau komunitas. Program dengan kisaran penerima manfaat yang luas cenderung lebih diutamakan karena dampaknya yang signifikan terhadap kesejahteraan masyarakat secara keseluruhan",
          id_kriteria: 2,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //4
          name_sub: "Sedang (Penerima manfaat tertentu)",
          description:
            "Program dengan kisaran penerima manfaat sedang berarti program ini ditujukan untuk kelompok tertentu dalam masyarakat, seperti anak-anak, perempuan, atau kelompok lansia. Meskipun tidak menjangkau semua orang, program ini tetap penting karena memberikan manfaat khusus yang dibutuhkan oleh kelompok yang ditargetkan",
          id_kriteria: 2,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //5
          name_sub: "Terkecil (Penerima manfaat terbatas)",
          description:
            "Program yang memiliki kisaran penerima manfaat terkecil biasanya ditujukan untuk segmen masyarakat yang sangat spesifik atau dengan jumlah penerima yang sangat terbatas. Program ini mungkin bersifat niche atau berfokus pada isu yang kurang umum. Meskipun dapat memberikan manfaat tertentu, urgensi dan dampaknya cenderung lebih rendah dibandingkan dengan program yang menjangkau lebih banyak orang. Contoh program ini bisa berupa dukungan untuk usaha kecil di bidang tertentu yang hanya melibatkan beberapa pelaku usaha.",
          id_kriteria: 2,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //6
          name_sub: "Sangat sesuai",
          description:
            "Program yang dikategorikan sebagai sangat sesuai adalah program yang secara langsung dan jelas menjawab kebutuhan mendesak masyarakat. Program ini dihasilkan dari analisis mendalam terhadap isu-isu yang dihadapi oleh masyarakat dan dapat memberikan solusi yang tepat",
          id_kriteria: 3,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //7
          name_sub: "Cukup sesuai",
          description:
            "Program dengan kategori cukup sesuai menunjukkan bahwa meskipun program tersebut relevan, ada beberapa aspek yang mungkin tidak sepenuhnya memenuhi kebutuhan masyarakat. Program ini mungkin mencakup beberapa elemen yang bermanfaat, tetapi tidak sepenuhnya menjawab semua tantangan yang ada.",
          id_kriteria: 3,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //8
          name_sub: "Kurang sesuai",
          description:
            "Program yang dikategorikan kurang sesuai memiliki relevansi yang rendah terhadap kebutuhan masyarakat saat ini. Meskipun program ini mungkin berorientasi pada tujuan tertentu, tidak ada jaminan bahwa pelaksanaannya akan memberikan dampak yang signifikan.",
          id_kriteria: 3,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //9
          name_sub: "Nasional",
          description:
            "Program yang memiliki skala implementasi nasional dirancang untuk diterapkan di seluruh negeri. Program ini umumnya terkait dengan kebijakan atau agenda strategis nasional yang bertujuan mengatasi isu-isu besar yang mempengaruhi seluruh populasi.",
          id_kriteria: 4,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //10
          name_sub: "Regional",
          description:
            "Program dengan skala implementasi regional mencakup beberapa wilayah yang lebih luas, seperti provinsi atau kelompok kota/kabupaten",
          id_kriteria: 4,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //11
          name_sub: "Lokal",
          description:
            "Program dengan skala implementasi lokal berarti program ini dirancang untuk diterapkan di wilayah yang lebih kecil, seperti desa, kecamatan, atau kota. Fokusnya adalah menangani masalah yang spesifik pada komunitas atau area tertentu",
          id_kriteria: 4,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //12
          name_sub: "Tinggi",
          description:
            "Program ini menghadapi potensi hambatan operasional yang besar, seperti keterbatasan sumber daya, regulasi yang rumit, atau kondisi lingkungan yang tidak mendukung. Hambatan ini bisa memperlambat atau bahkan menghentikan implementasi program jika tidak diatasi dengan segera. Program dengan potensi hambatan tinggi memerlukan perencanaan dan mitigasi risiko yang matang agar dapat dijalankan.",
          id_kriteria: 5,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //13
          name_sub: "Sedang",
          description:
            "Program menghadapi beberapa hambatan operasional, tetapi masih dapat diatasi dengan upaya tambahan atau penyesuaian dalam proses pelaksanaannya. Hambatan ini mungkin mencakup masalah koordinasi antar lembaga, ketersediaan sumber daya manusia, atau kendala logistik yang dapat memperlambat jalannya program, namun tidak sampai menghentikannya.",
          id_kriteria: 5,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //14
          name_sub: "Rendah",
          description:
            "Program ini menghadapi sedikit atau  ancer tidak ada hambatan operasional yang signifikan. Semua aspek operasional, seperti sumber daya, regulasi, dan infrastruktur, tersedia dengan baik sehingga program dapat dilaksanakan dengan  ancer. Potensi hambatan yang muncul dapat diatasi dengan mudah tanpa mempengaruhi kelangsungan program secara keseluruhan.",
          id_kriteria: 5,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //15
          name_sub: "Tinggi",
          description:
            "Lingkungan sekitar program memiliki tingkat kompleksitas yang sangat tinggi, seperti tantangan geografis, infrastruktur yang kurang memadai, atau faktor sosial-politik yang tidak stabil. Kompleksitas ini dapat menghambat pelaksanaan program dan memerlukan strategi mitigasi risiko yang cermat. Program yang dijalankan dalam kondisi lingkungan ini membutuhkan sumber daya ekstra, termasuk tenaga kerja khusus dan biaya tambahan, serta fleksibilitas dalam menghadapi berbagai ketidakpastian. Contoh lingkungan yang kompleks adalah wilayah konflik atau area dengan kondisi cuaca ekstrem",
          id_kriteria: 6,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //16
          name_sub: "Sedang",
          description:
            "Lingkungan sekitar program memiliki beberapa tingkat kompleksitas, tetapi masih dapat diatasi dengan perencanaan dan penyesuaian yang baik. Tantangan mungkin muncul dari keterbatasan infrastruktur, kondisi geografis yang menantang, atau beberapa faktor sosial, tetapi dengan manajemen yang tepat, hambatan ini tidak akan menghentikan program. Misalnya, program di daerah pedesaan yang infrastrukturnya belum sepenuhnya memadai namun dapat diatasi dengan penyesuaian logistik.",
          id_kriteria: 6,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //17
          name_sub: "Rendah",
          description:
            "Lingkungan sekitar program memiliki kompleksitas yang rendah, dengan kondisi yang mendukung pelaksanaan program. Infrastruktur tersedia dengan baik, situasi sosial-politik stabil, dan tidak ada faktor geografis atau lingkungan yang signifikan yang dapat menghambat jalannya program. Lingkungan ini sangat ideal untuk pelaksanaan program, dengan risiko minimal dalam hal kendala eksternal. Contohnya adalah pelaksanaan program di daerah perkotaan dengan infrastruktur dan dukungan masyarakat yang kuat.",
          id_kriteria: 6,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //18
          name_sub: "Inovatif",
          description:
            "Program ini memperkenalkan konsep baru yang sangat inovatif, menawarkan pendekatan atau metode yang belum pernah diterapkan sebelumnya di wilayah atau sektor tersebut. Konsep ini membawa solusi kreatif dan segar untuk masalah yang ada, berpotensi menghasilkan perubahan yang signifikan dan membawa dampak jangka panjang. Inovasi yang ditawarkan dapat mencakup penggunaan teknologi baru, pendekatan manajemen yang berbeda, atau model operasional yang lebih efisien. Program semacam ini memiliki potensi untuk menjadi pelopor di bidangnya.",
          id_kriteria: 7,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //19
          name_sub: "Adaptif",
          description:
            "Program ini memperkenalkan konsep baru yang adaptif, yaitu mengambil inspirasi dari pendekatan yang telah berhasil di tempat lain dan menyesuaikannya dengan konteks lokal. Meskipun tidak sepenuhnya orisinal, konsep ini tetap baru dalam penerapannya di wilayah atau situasi tertentu, dan membawa perbaikan yang relevan bagi penerima manfaat. Program adaptif biasanya lebih mudah diterapkan karena konsepnya sudah teruji, namun tetap membawa nilai baru bagi masyarakat yang belum pernah merasakan manfaatnya.",
          id_kriteria: 7,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //20
          name_sub: "Konservatif",
          description:
            " Program ini menerapkan konsep yang sebagian besar konvensional atau umum, dengan sedikit pembaruan atau penyesuaian untuk meningkatkan efisiensi atau efektivitasnya. Meskipun tidak sepenuhnya baru, program ini tetap relevan karena memanfaatkan praktik-praktik terbaik yang sudah dikenal dan terbukti berhasil. Fokus program ini lebih kepada memastikan stabilitas dan keberlanjutan daripada mendorong perubahan radikal. Program dengan pendekatan konservatif sering kali aman dan memiliki risiko implementasi yang lebih rendah.",
          id_kriteria: 7,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //21
          name_sub: "Sangat Tinggi",
          description:
            "Program ini memiliki peluang kolaborasi yang sangat besar dengan berbagai pihak eksternal, seperti lembaga pemerintah, organisasi non-pemerintah, sektor swasta, atau komunitas internasional. Kolaborasi ini dapat meningkatkan efektivitas, memperluas cakupan program, dan memberikan akses tambahan terhadap sumber daya, baik finansial maupun teknis. Program yang didukung oleh banyak pihak memiliki potensi keberlanjutan yang lebih tinggi serta dampak yang lebih luas karena sinergi antarorganisasi. Misalnya, program lingkungan yang melibatkan kolaborasi dengan LSM dan korporasi untuk pendanaan dan teknologi.",
          id_kriteria: 8,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //22
          name_sub: "Sedang",
          description:
            "Program ini memiliki peluang kolaborasi dengan beberapa pihak eksternal yang relevan, seperti organisasi lokal atau sektor swasta tertentu. Meskipun kolaborasi ini tidak seluas program dengan peluang besar, adanya kolaborasi tetap dapat membantu dalam menyediakan sumber daya tambahan atau meningkatkan efisiensi operasional. Contoh kolaborasi ini adalah proyek pendidikan yang bekerja sama dengan komunitas lokal atau lembaga pendidikan untuk pelatihan tenaga pengajar dan penyediaan fasilitas.",
          id_kriteria: 8,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          //23
          name_sub: "Rendah",
          description:
            "Program ini memiliki peluang kolaborasi yang terbatas, di mana kemungkinan besar program ini akan dijalankan secara mandiri atau hanya dengan sedikit dukungan dari pihak eksternal. Faktor-faktor seperti keterbatasan relevansi atau kesulitan dalam menemukan mitra yang sesuai membuat program ini lebih sulit untuk mendapatkan kolaborasi yang signifikan. Meskipun demikian, program ini tetap dapat berjalan, tetapi mungkin dengan jangkauan yang lebih terbatas atau membutuhkan waktu lebih lama untuk menyelesaikan tujuan. Contohnya adalah program yang ",
          id_kriteria: 8,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_subkriteria", null, {});
  },
};
