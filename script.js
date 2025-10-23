document.addEventListener("DOMContentLoaded", function() {

    // 1. MAHSULOTLAR BAZASI
    const mahsulotlarBazasi = [
        { id: 1, nom: "Osh", narx: 30000, rasm: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2940&auto=format&fit=crop", toifa: "milliy" },
        { id: 2, nom: "Lag'mon", narx: 28000, rasm: "https://png.klev.club/uploads/posts/2024-03/png-klev-club-p-lagman-png-9.png" },
        { id: 3, nom: "Manti", narx: 25000, rasm: "—Pngtree—uzbekistan food manti_17418618.png" },
        { id: 4, nom: "Lavash", narx: 22000, rasm: "—Pngtree—shawarma roll in lavash with_19001173.png" },
        { id: 5, nom: "Gamburger", narx: 26000, rasm: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2799&auto=format&fit=crop", toifa: "fast-food" },
        { id: 6, nom: "Pitsa", narx: 65000, rasm: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2881&auto=format&fit=crop", toifa: "fast-food" },
        { id: 7, nom: "Gretsiya Salati", narx: 35000, rasm: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2787&auto=format&fit=crop", toifa: "salat" },
        { id: 8, nom: "Sezar Salati", narx: 40000, rasm: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2787&auto=format=fit&crop", toifa: "salat" },
        { id: 9, nom: "Coca-Cola", narx: 15000, rasm: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2940&auto=format&fit=crop", toifa: "ichimlik" },
        { id: 10, nom: "Apelsin Sharbat", narx: 12000, rasm: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=2787&auto=format&fit=crop", toifa: "ichimlik" }
    ];

    // 2. KERAKLI ELEMENTLARNI TOPISH
    let savat = JSON.parse(localStorage.getItem('savat')) || [];
    const savatSoniElementi = document.getElementById("savat-soni");
    const mahsulotlarRoyxatiDiv = document.getElementById("mahsulotlar-royxati");
    const toifalarMenyusiDiv = document.getElementById("toifalar-menyusi");
    const savatMazmuniDiv = document.getElementById("savat-mazmuni");
    const savatBoshXabar = document.getElementById("savat-bosh-xabar");
    const buyurtmaFormasi = document.getElementById("buyurtma-formasi");
    const buyurtmaYuborishFormasi = document.getElementById("buyurtma-yuborish-formasi");
    const rasmiylashtirishTugmaKonteyneri = document.getElementById("rasmiylashtirish-tugma-konteyneri");

    // 3. ASOSIY FUNKSIYALAR

    function savatniYangilash() {
        localStorage.setItem('savat', JSON.stringify(savat));
        const umumiySoni = savat.reduce((sum, mahsulot) => sum + mahsulot.soni, 0);
        if (savatSoniElementi) savatSoniElementi.textContent = umumiySoni;
    }

    function mahsulotlarniChizish(korsatiladiganMahsulotlar) {
        if (!mahsulotlarRoyxatiDiv) return;
        mahsulotlarRoyxatiDiv.innerHTML = '';
        korsatiladiganMahsulotlar.forEach(mahsulot => {
            mahsulotlarRoyxatiDiv.innerHTML += `
                <div class="mahsulot-kartasi" data-id="${mahsulot.id}">
                    <img src="${mahsulot.rasm}" alt="${mahsulot.nom}">
                    <h3>${mahsulot.nom}</h3>
                    <p class="narx">${mahsulot.narx.toLocaleString('uz-UZ')} so'm</p>
                    <button class="savatga-qoshish">Savatga qo'shish</button>
                </div>
            `;
        });
        savatgaQoshishTinglovchilariniQoshish();
    }

    function mahsulotQoshish(id) {
        const mahsulot = mahsulotlarBazasi.find(m => m.id == id);
        if (!mahsulot) return;
        const mavjudMahsulot = savat.find(m => m.id == id);
        if (mavjudMahsulot) {
            mavjudMahsulot.soni++;
        } else {
            savat.push({ ...mahsulot, soni: 1 });
        }
        savatniYangilash();
        alert(`"${mahsulot.nom}" savatga qo'shildi!`);
    }
    
    function savatgaQoshishTinglovchilariniQoshish() {
        document.querySelectorAll(".mahsulot-kartasi").forEach(karta => {
            karta.addEventListener("click", function() {
                const id = this.getAttribute('data-id');
                mahsulotQoshish(id);
            });
        });
    }

    function savatniChizish() {
        if (!savatMazmuniDiv) return;
        if (savat.length === 0) {
            if (savatBoshXabar) savatBoshXabar.style.display = 'block';
            savatMazmuniDiv.innerHTML = '';
            if (rasmiylashtirishTugmaKonteyneri) rasmiylashtirishTugmaKonteyneri.innerHTML = '';
            if (buyurtmaFormasi) buyurtmaFormasi.style.display = 'none';
            return;
        }

        if (savatBoshXabar) savatBoshXabar.style.display = 'none';
        if (buyurtmaFormasi) buyurtmaFormasi.style.display = 'none';

        let umumiyNarx = 0;
        let jadvalBody = savat.map(mahsulot => {
            const jami = mahsulot.soni * mahsulot.narx;
            umumiyNarx += jami;
            return `<tr><td>${mahsulot.nom}</td><td>${mahsulot.soni}</td><td>${mahsulot.narx.toLocaleString('uz-UZ')} so'm</td><td>${jami.toLocaleString('uz-UZ')} so'm</td><td><button class="ochirish-tugmasi" data-id="${mahsulot.id}">X</button></td></tr>`;
        }).join('');

        savatMazmuniDiv.innerHTML = `<table class="savat-jadvali"><thead><tr><th>Nomi</th><th>Soni</th><th>Narxi</th><th>Umumiy</th><th>O'chirish</th></tr></thead><tbody>${jadvalBody}</tbody></table><div class="umumiy-narx-qutisi">Jami: ${umumiyNarx.toLocaleString('uz-UZ')} so'm</div>`;

        if (rasmiylashtirishTugmaKonteyneri) {
            rasmiylashtirishTugmaKonteyneri.innerHTML = `<button id="formani-ochish-tugmasi" class="buyurtma-tugmasi">Rasmiylashtirishga o'tish</button>`;
            document.getElementById('formani-ochish-tugmasi').addEventListener('click', function() {
                if (buyurtmaFormasi) buyurtmaFormasi.style.display = 'block';
                this.style.display = 'none';
            });
        }
        
        document.querySelectorAll('.ochirish-tugmasi').forEach(tugma => {
            tugma.addEventListener('click', function() {
                const mahsulotId = this.getAttribute('data-id');
                savat = savat.filter(m => m.id != mahsulotId);
                savatniYangilash();
                savatniChizish();
            });
        });
    }

    // 4. HODISALARNI ISHGA TUSHIRISH
    if (mahsulotlarRoyxatiDiv) {
        mahsulotlarniChizish(mahsulotlarBazasi);
        if(toifalarMenyusiDiv) {
            toifalarMenyusiDiv.addEventListener('click', function(e) {
                if (e.target.classList.contains('toifa-tugmasi')) {
                    this.querySelector('.aktiv').classList.remove('aktiv');
                    e.target.classList.add('aktiv');
                    const tanlanganToifa = e.target.getAttribute('data-toifa');
                    const filtranganMahsulotlar = (tanlanganToifa === 'barchasi') ? mahsulotlarBazasi : mahsulotlarBazasi.filter(m => m.toifa === tanlanganToifa);
                    mahsulotlarniChizish(filtranganMahsulotlar);
                }
            });
        }
    }

    if (savatMazmuniDiv) {
        savatniChizish();
    }
    
    if(buyurtmaYuborishFormasi) {
        buyurtmaYuborishFormasi.addEventListener('submit', function(e) {
            e.preventDefault();
            const ism = document.getElementById('ism').value;
            const telefon = document.getElementById('telefon').value;
            const manzil = document.getElementById('manzil').value;
            
            if (savat.length > 0) {
                alert(`Hurmatli ${ism}, sizning buyurtmangiz qabul qilindi!\nTez orada operatorimiz siz bilan bog'lanadi.\nManzil: ${manzil}`);
                savat = [];
                savatniYangilash();
                savatniChizish();
                buyurtmaYuborishFormasi.reset();
            } else {
                alert("Buyurtma berish uchun avval savatga mahsulot qo'shing!");
            }
        });
    }
    savatniYangilash();

      // "ALOQA" SAHIFASIDAGI FORMA UCHUN
    const xabarYuborishFormasi = document.getElementById("xabar-yuborish-formasi");
    if(xabarYuborishFormasi) {
        xabarYuborishFormasi.addEventListener('submit', function(e) {
            e.preventDefault(); // Sahifani yangilab yubormaslik uchun
            const ism = document.getElementById('aloqa-ism').value;
            alert(`Hurmatli ${ism}, xabaringiz qabul qilindi! Tez orada javob beramiz.`);
            xabarYuborishFormasi.reset(); // Formani tozalash
        });
    }

});