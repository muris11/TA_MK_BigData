# Final Export Harga Pangan Indonesia

Dibuat pada: 2026-05-18 13:16:53

Isi penting:

- model/model_bundle.pkl -> file model utama untuk Python Function/Vercel.
- model/model_metadata.json -> metadata proyek.
- model/encoder_mapping.json -> mapping dropdown komoditas/provinsi.
- public/data/* -> data JSON/CSV untuk dashboard Next.js.
- data_clean/* -> dataset hasil preprocessing.
- output/tabel/* -> tabel hasil analisis dan evaluasi model.

Catatan:
- Jika is_demo_data=True pada metadata, berarti notebook memakai data demo sintetis karena dataset resmi belum cukup.
- Untuk tugas akhir final, gunakan dataset resmi Bapanas/SiPangan.
- Jangan load model_bundle.pkl dari sumber tidak terpercaya.