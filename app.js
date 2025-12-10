document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('myVideo');
    const initialOverlay = document.getElementById('initial-overlay');
    const initialPlayButton = document.getElementById('initialPlayButton');
    const pausePlayBtn = document.getElementById('pausePlayBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const stopBtn = document.getElementById('stopBtn');
    const playlistUl = document.getElementById('playlist');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const youtubeLinkInput = document.getElementById('youtubeLinkInput');
    const addYoutubeBtn = document.getElementById('addYoutubeBtn');

    let currentSongIndex = 0;
    let isPlaying = false;
    let playlist = Array.from(playlistUl.children).map(li => ({
        src: li.dataset.src,
        title: li.textContent
    }));

    // --- TEMEL OYNATMA FONKSİYONLARI ---

    // 1. Oynat/Duraklat (Toggle)
    const togglePlay = () => {
        if (isPlaying) {
            video.pause();
            pausePlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            video.play().catch(error => {
                console.error("Oynatma engellendi. Sesli oynatma için kullanıcı etkileşimi şarttır.", error);
            });
            pausePlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    };

    // 2. Şarkıyı Yükle ve Başlat
    const loadSong = (index) => {
        currentSongIndex = index;
        const song = playlist[currentSongIndex];
        
        // Playlist vurgusunu güncelle
        Array.from(playlistUl.children).forEach((li, i) => {
            li.classList.toggle('active', i === currentSongIndex);
        });

        // Yeni kaynağı yükle
        video.src = song.src;
        video.load();
        
        if (isPlaying) {
            // Eğer daha önce çalıyorsa, yeni şarkıyı otomatik başlat
            video.play().catch(error => console.error("Oynatma hatası:", error));
        }
    };

    // 3. İleri/Geri/Durdur
    const playNext = () => {
        const nextIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(nextIndex);
    };

    const playPrev = () => {
        const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(prevIndex);
    };
    
    const stopPlayback = () => {
        video.pause();
        video.currentTime = 0; // Başa sar
        isPlaying = false;
        pausePlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    };

    // --- ETKİNLİK DİNLEYİCİLERİ ---
    
    // 1. Başlangıç Butonu (Tarayıcı Kısıtlamasını Aşma)
    initialPlayButton.addEventListener('click', () => {
        video.play()
            .then(() => {
                initialOverlay.style.display = 'none'; // Overlay'i kaldır
                video.style.display = 'block';         // Video alanını göster
                isPlaying = true;
                pausePlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
            })
            .catch(error => {
                console.error("Başlangıç oynatma hatası:", error);
                alert("Müzik otomatik başlatılamadı. Lütfen tekrar deneyin.");
            });
    });

    // 2. Kontrol Butonları
    pausePlayBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', playNext);
    prevBtn.addEventListener('click', playPrev);
    stopBtn.addEventListener('click', stopPlayback);
    video.addEventListener('ended', playNext); // Şarkı bitince otomatik ileri

    // 3. Çalma Listesi Tıklamaları
    playlistUl.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const index = Array.from(playlistUl.children).indexOf(e.target);
            loadSong(index);
            if (!isPlaying) togglePlay(); // Eğer duruyorsa başlat
        }
    });

    // 4. YouTube ve Arama İşlevleri (Mantık Simülasyonu)

    // NOT: Gerçek proxy ve YouTube çevirme işlemleri için bir sunucuya ihtiyacınız vardır.
    // Bu JS kodu sadece arayüzü hazırlar.

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value;
        if (!query) return;
        
        // r.jina.ai proxy simülasyonu (gerçek kod sunucunuzda çalışmalıdır)
        console.log(`🔍 r.jina.ai üzerinden arama simüle ediliyor: "${query}"`);
        alert(`Arama yapıldı: "${query}". Gerçek sonuçlar için sunucu gereklidir.`);
        searchInput.value = '';
    });

    addYoutubeBtn.addEventListener('click', () => {
        const youtubeLink = youtubeLinkInput.value;
        if (!youtubeLink) return;

        // YouTube link çevirme simülasyonu
        console.log(`▶️ YouTube linki ekleme simüle ediliyor: "${youtubeLink}"`);
        
        // Eğer link geçerliyse, sahte bir şarkı ekleyelim:
        const newTitle = `YouTube Parçası (${playlist.length + 1})`;
        const newSrc = 'yeni-youtube-parcasi.mp4'; // Buraya dönüştürülmüş MP4 linki gelmeli

        // Arayüzü güncelle
        const newLi = document.createElement('li');
        newLi.textContent = newTitle;
        newLi.dataset.src = newSrc;
        playlistUl.appendChild(newLi);

        // Playlist dizisini güncelle
        playlist.push({ src: newSrc, title: newTitle });
        
        alert(`YouTube Linki simülasyon olarak eklendi: ${newTitle}`);
        youtubeLinkInput.value = '';
    });

    // Başlangıçta ilk şarkıyı yükle (çalmasın)
    loadSong(currentSongIndex);
});
