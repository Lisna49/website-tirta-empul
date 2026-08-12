 // Data konten
        const dataKonten = {
            1: {
                judul: "Penjelasan Gambar 1",
                teks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            2: {
                judul: "Penjelasan Gambar 2",
                teks: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            3: {
                judul: "Penjelasan Gambar 3",
                teks: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper."
            },
            4: {
                judul: "Penjelasan Gambar 4",
                teks: "Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi."
            }
        };

        let currentMainId = 1; 

        // Fungsi untuk menggambar thumbnail pertama kali saat web dibuka
        function initThumbnails() {
            const container = document.getElementById("thumbContainer");
            const initialThumbs = [2, 3, 4];
            
            initialThumbs.forEach(id => {
                const thumb = document.createElement("div");
                thumb.className = "thumbnail";
                thumb.innerText = "Gambar " + id;
                thumb.onclick = function() { swapContent(this, id); };
                container.appendChild(thumb);
            });
        }

        // Fungsi dengan animasi pergeseran halus (FLIP Animation)
        function swapContent(clickedThumb, newId) {
            const container = document.getElementById("thumbContainer");
            const mainImg = document.getElementById("mainImage");
            const mainDesc = document.getElementById("mainDesc");
            const thumbnails = Array.from(container.children);

            // 1. Rekam posisi X dan Y awal dari semua kotak kecil
            const firstPositions = thumbnails.map(t => t.getBoundingClientRect());

            // 2. Animasi Gambar Utama Keluar (Mengecil)
            mainImg.style.transform = "scale(0.8)";
            mainImg.style.opacity = "0";
            mainDesc.style.opacity = "0";

            // Simpan ID utama yang lama, lalu perbarui ke yang baru
            const oldMainId = currentMainId;
            currentMainId = newId;

            // 3. Ubah kotak yang diklik menjadi Gambar yang lama, lalu pindahkan ke urutan paling belakang
            clickedThumb.innerText = "Gambar " + oldMainId;
            clickedThumb.onclick = function() { swapContent(this, oldMainId); };
            container.appendChild(clickedThumb); // Ini akan memindahkannya di dalam susunan HTML

            // 4. Rekam posisi akhir setelah HTML diubah posisinya
            const lastPositions = thumbnails.map(t => t.getBoundingClientRect());

            // 5. Hitung selisih dan buat efek gesernya
            thumbnails.forEach((t, i) => {
                const deltaX = firstPositions[i].left - lastPositions[i].left;
                const deltaY = firstPositions[i].top - lastPositions[i].top;

                if (deltaX !== 0 || deltaY !== 0) {
                    // Paksa kotak mundur ke posisi lama secara instan tanpa animasi
                    t.style.transition = 'none';
                    t.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

                    // Minta peramban (browser) untuk meluncurkannya ke posisi baru
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            t.style.transition = 'transform 0.4s ease-in-out';
                            t.style.transform = 'translate(0, 0)'; // Kembali normal (meluncur)
                        });
                    });

                    // Bersihkan inline style setelah animasi selesai agar efek hover tetap jalan
                    setTimeout(() => {
                        t.style.transition = '';
                        t.style.transform = '';
                    }, 400);
                }
            });

            // 6. Tampilkan Gambar Utama Baru setelah jeda waktu agar sinkron
            setTimeout(() => {
                mainImg.innerText = "Gambar " + currentMainId;
                document.getElementById("mainTitle").innerText = dataKonten[currentMainId].judul;
                document.getElementById("mainText").innerText = dataKonten[currentMainId].teks;

                // Animasi Gambar Utama Masuk
                mainImg.style.transform = "scale(1)";
                mainImg.style.opacity = "1";
                mainDesc.style.opacity = "1";
            }, 400);
        }

        // Jalankan fungsi awal saat halaman dimuat
        initThumbnails();