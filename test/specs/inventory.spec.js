import { browser, $, expect} from '@wdio/globals'
import { isDescending } from '../../helpers/checkSorting.js'
import inventoryPage from '../pageobjects/inventory.page.js'

// Jika ingin menggunakannya harus sudah register
describe('FITUR INVENTORY SPECIAL ONE', function(){
    before('User harus login menggunakan nomor HP yang sudah terdaftar', async function(){
        await browser.url('https://www.ruparupa.com/acestore/auth/login') // Harus daftar terlebih dahulu

        const inputNoHp = await $('input[name="identifier"]')
        await inputNoHp.setValue('856XXXX4942') //No hp menyesuaikan

        const submitButton = await $('button[type="submit"]')
        await submitButton.click()

        await browser.pause(3000)

    })

    it('User harus login menggunakan password yang benar', async function(){
        const inputNoHp = await $('input[name="password"]')
        await inputNoHp.setValue('T*************') //Password menyesuaikan

        const submitButton = await $('button[type="submit"]')
        await submitButton.click()

        await browser.pause(3000)

    })

    it('User membuka tab Spesial Online', async function(){
        await inventoryPage.bukaTabSpesialOnline()

        const url = await browser.getUrl()
        expect(url).toContain('https://www.ruparupa.com/acestore/')
    })

    // Produk sewaktu-waktu bisa berubah
    it('User menampilkan detail produk Krisbow Lentera Led Rechargeable 10 Watt - Putih/hijau', async function () {
        await inventoryPage.bukaTabSpesialOnline()
        await inventoryPage.bukaDetailProdukKrisbow()

        const titleProduct = await inventoryPage.getJudulProduk()
        expect(titleProduct).toContain('Krisbow Lentera Led Rechargeable 10 Watt - Putih/hijau')

        const hargaProduct = await inventoryPage.getHargaProduk()
        expect(hargaProduct).toContain('Rp49.900')
    })

    it('User dapat membuka Lihat Semua Ulasan setelah membuka detail produk Krisbow', async function () {
        const titleProduct = await inventoryPage.getJudulProduk()
        expect(titleProduct).toContain('Krisbow Lentera Led Rechargeable 10 Watt - Putih/hijau')
    
        await inventoryPage.lihatSemuaUlasan()

    })

    it('User ingin menambahkan Quantity pada produk dengan cara mengisi', async function () {
        await inventoryPage.setQuantity(3)
    })

    it('User ingin mengurangi Quantity pada produk dengan cara klik tombol (-)', async function () {
        await inventoryPage.decreaseQuantity();
    })

    //it('User ingin mengurangi Quantity pada produk dengan cara klik tombol (+)', async function () {
        //await inventoryPage.increaseQuantity();
    //})

    it('User ingin menambahkan produk ke whislist', async function () {
        await inventoryPage.addToWishlist()
    })
    

    it('User menambahkan produk ke keranjang dan membuka keranjang', async function () {
        await inventoryPage.tambahKeKeranjang()
        await inventoryPage.lihatKeranjang()

        const url = await browser.getUrl()
        expect(url).toContain('https://www.ruparupa.com/acestore/cart')
    })

    it('User menambahkan produk ke wishlist', async function () {
        await inventoryPage.buttonlanjutBayar()
    })
})