// panggil fungsi readline 
const readline = require('./readline');
//  panggil fungsi untuk menyimpan database sementara
const databaseKontak = require('./storage');


// buat object kosong untuk menampung inputan 
let objectKontak = {
    nama: '',
    nomorHp: ''
}


function viewMenu() { //fungsi untuk menampilkan halaman menu
    console.log("Selamat Datang Di Aplikasi Kontak !");
    console.log("====================================\n");
    console.log("Main Menu :\n");
    console.log("1.Tambah Data \n");
    console.log("2.Lihat Data \n");
    console.log("3.Reset Data \n");
    console.log("4.Pencarian Data \n");
    console.log("5.Hapus Satu Data \n");
    console.log("99.Exit \n")
    console.log("====================================\n");
    readline.question(`Silahkan Masukan Pilihan Anda  :`, input => {
        mainMenu(Number(input))
    });
}



function mainMenu(pilihan) { // fungsi untuk mengatur pilihan menu
    switch (pilihan) {
        case 1:
            simpan()
            break;
        case 2:
            lihatData()
            break;
        case 3:
            resetData()
            break;
        case 4:
            pencarianData()
            break;
        case 5:
            hapusData()
            break;
        case 99:
            readline.close();
            break;
        // lanjutkan menu pilihanya disini secara urut
        default:
            console.log("Pilihan Tidak Valid !");
            readline.close()
            break;
    }
}

function simpan() { // fungsi untuk menyimpan data
    console.log("Silahkan Masukan Data ! : ");
    readline.question("Nama :", (nama) => {
        if (/^[A-Za-z\s]+$/.test(nama)) {
            objectKontak.nama = nama;
            console.log(`Input nama berhasil ! : ${nama}`);
            readline.question("Nomor :", (nomor) => {
                if (/^\d+$/.test(nomor)) {
                    const parsedNomor = parseInt(nomor, 10);
                    if (isNomorSudahAda(parsedNomor)) {
                        console.log('Nomor sudah ada dalam data!');
                        kembali();
                    } else {
                        objectKontak.nomorHp = parsedNomor;
                        databaseKontak.push(Object.assign({}, objectKontak)); // insert data kedalam array databseKontak
                        console.log('Input nomor berhasil ! : ' + parsedNomor);
                        kembali();
                    }
                } else {
                    console.log('Input nomor tidak valid!');
                    kembali();
                }
            });
        } else {
            console.log('Input nama tidak valid!');
            kembali();
        }
    });
}


function isNomorSudahAda(nomor) { //fungsi yang digunakan untuk memeriksa apakah nomor yang dimasukkan sudah ada dalam database kontak atau belum
    return databaseKontak.some((kontak) => kontak.nomorHp === nomor);
}


/*const ambilInputanNomor = () => { // fungsi untuk mengambil inputan nomor
    readline.question("Nomor :", (nomor) => {
        const parsedNomor = parseFloat(nomor);
        if (!isNaN(parsedNomor)) {
            objectKontak.nomorHp = parsedNomor;
            databaseKontak.push(Object.assign({}, objectKontak)); // insert data kedalam array databseKOntak
            console.log(`Input nomor berhasil ! : ${parsedNomor}`);
            kembali();
        } else {
            console.log('Input nomor tidak valid!');
            kembali();
        }
    });
} */

const kembali = () => { // fungsi untuk navigasi kembali
    readline.question("Apakah Anda Ingin Kembali ? (y/n) :", (pilihan) => {
        if (pilihan === "y") {
            viewMenu()
        } else {
            readline.close()
        }

    })
}

function lihatData() { // fungsi untuk melihat list data
    console.table(databaseKontak);
    kembali()
}

function resetData() { // fungsi untuk Menghapus Semua Data
    console.log("Anda yakin ingin mereset data? (y/n)");
    readline.question("", (jawaban) => {
        if (jawaban === "y") {
            databaseKontak.length = 0;
            console.log("Data berhasil direset.");
        } else {
            console.log("Pengaturan data dibatalkan.");
        }
        kembali();
    });
}

function pencarianData() { // fungsi untuk Mencari Data
    console.log("Masukkan nama yang akan dicari:");
    readline.question("", (namaCari) => {
        const hasilPencarian = databaseKontak.filter((kontak) => // MemFilter data berdasarkan karakter yang dicari dalam nama
            kontak.nama.toLowerCase().includes(namaCari.toLowerCase())
        );

        if (hasilPencarian.length === 0) {
            console.log("Data tidak ditemukan.");
        } else {
            console.table(hasilPencarian);
        }

        kembali();
    });
}

function hapusData() { // fungsi untuk Menghapus Data
    console.log("Masukkan nama yang akan dihapus:");
    readline.question("", (namaHapus) => {
        const indeksHapus = databaseKontak.findIndex((kontak) =>
            kontak.nama.toLowerCase() === namaHapus.toLowerCase()
        );

        if (indeksHapus !== -1) {
            const kontakHapus = databaseKontak.splice(indeksHapus, 1);
            console.log(`Data ${kontakHapus[0].nama} telah dihapus.`);
        } else {
            console.log("Data tidak ditemukan.");
        }

        kembali();
    });
}


viewMenu() // panggil fungsi view menu untuk pertama kali