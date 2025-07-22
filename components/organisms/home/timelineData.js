const timelineData = {
  importantDates: [
    // date hari penting
    new Date("2025-08-01"),
    new Date("2025-08-14"),
    new Date("2025-08-23"),
    new Date("2025-08-25"),
    new Date("2025-08-30"),
    new Date("2025-09-07"),
    new Date("2025-09-08"),
    new Date("2025-09-15"),
    new Date("2025-09-25"),
    new Date("2025-09-27"),
  ],
  modalContent: {
    "2025-08-01": {
      date: new Date("2025-08-01").toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      title: "Pendaftaran",
      description: "Pendaftaran gelombang 1 IITC & pendaftaran webinar",
    },
    "2025-08-14": {
      date: new Date("2025-08-14").toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      title: "Pendaftaran",
      description: "Pendaftaran gelombang 2 IITC",
    },
    "2025-08-23": {
      date: new Date("2025-08-23").toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      title: "Teknikal Meeting",
      description: "Menjelaskan rubrik penilaian dan S&K",
    },
    // "2025-08-25": {
    //   date: new Date("2025-08-25").toLocaleString("id-ID", {
    //     weekday: "long",
    //     day: "numeric",
    //     month: "long",
    //     year: "numeric",
    //   }),
    //   title: "Pendaftaran & Submit",
    //   description: "Extra time daftar & awal pengumpulan submission",
    // },
    "2025-08-25": {
      date: new Date("2025-08-25").toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      title: "Pengumpulan Submit",
      description: "Awal pengumpulan submission",
    },
    "2025-08-30": {
      date: new Date("2025-08-30").toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      title: "Penutupan Pendaftaran",
      description: "Tahap akhir pendaftaran IITC",
    },
    "2025-09-07": {
      date: new Date("2025-09-07").toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      title: "Pengumpulan Terakhir",
      description: "Tahap akhir pengumpulan submission",
    },
    "2025-09-08": {
      date: new Date("2025-09-08").toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      title: "Penjurian",
      description: "Penjurian setiap divisi lomba",
    },
    "2025-09-15": {
      date: new Date("2025-09-15").toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      title: "Pengumuman 3 Besar Pemenang",
      description: "Setiap divisi lomba",
    },
    "2025-09-25": {
      date: new Date("2025-09-25").toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      title: "Teknikal Meeting",
      description: "Bagi pemenang 3 besar setiap divisi lomba",
    },
    "2025-09-27": {
      date: new Date("2025-09-27").toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      title: "Seminar & Awarding",
      description: "Pengumuman pemenang & seminar",
    },
  },
};

// start day & finish

export const startDate = new Date("2025-07-25");
export const endDate = new Date("2025-10-05");

export default timelineData;
