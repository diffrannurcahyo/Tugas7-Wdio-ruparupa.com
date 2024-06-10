import {$, browser} from '@wdio/globals'

// Produk sewaktu-waktu bisa berubah
class InventoryPage {
    //element locators
    get tabSpesialOnline() { return $('button[name="promoMajorSpesialOnlineButton"]'); }
    get produkKrisbowPowerlite() { return $('span.product__name#homepagePromoBrandProductName'); }
    get lihatSemuaUlasanButton() { return $('button.button.margin-top-xl.button--full.button__primary-border.button__primary-border-ace'); }
    get closeUlasanButton() { return $('img.cursor-pointer[src="https://assets.ruparupa.io/v3/static/homepage/desktop/icon/close.svg"]'); }
    get quantityInput() { return $('input.product-quantity__input.ui-text-3'); }
    get titleProduct() { return $('div.main-pdp_title__mS56o'); }
    get hargaProduct() { return $('div.col-xs-12.price__real.main-pdp_price__real__SlcDy'); }
    get tambahKeKeranjangButton() { return $('button.button.button--full.button__primary.button__primary-ace[style="width:100%"]'); }
    get quantityDecreaseButton() { return $('button svg.color-grey-100[viewBox="0 0 16 16"]:nth-of-type(1)'); }
    //get quantityIncreaseButton() { return $('button svg.color-grey-100[viewBox="0 0 16 16"]:nth-of-type(2)'); }
    get wishlistButton() { return $('div.col-xs-6.cursor-pointer'); }
    get lihatKeranjangButton() { return $('button.button.button--big.button__primary.button__primary-ace[style="width: 100%;"]'); }
    get lanjutBayarButton() { return $('button.tw-font-semibold.tw-w-full'); }
    get tambahAlamatButton() { return $('button.bg-rr-orange-50.text-white.w-full.p-2.mt-3.rounded-lg'); }

    
    async bukaTabSpesialOnline() {
        await this.tabSpesialOnline.click()
    }

    async bukaDetailProdukKrisbow() {
        await this.produkKrisbowPowerlite.click()
    }

    async lihatSemuaUlasan() {
        await this.lihatSemuaUlasanButton.scrollIntoView({ block: 'center', inline: 'center' });
        await this.lihatSemuaUlasanButton.click()
        await browser.pause(2000)

        await this.closeUlasanButton.waitForExist()
        await this.closeUlasanButton.click()
        await browser.pause(2000)
    }

    async setQuantity(quantity) {
        await this.quantityInput.waitForExist()
        await this.quantityInput.scrollIntoView()
        await browser.execute(() => {
            document.querySelector('input.product-quantity__input.ui-text-3').value = '';
        })
        await browser.pause(1000)
        await this.quantityInput.setValue(quantity)
        await browser.pause(1000)
    }

    async decreaseQuantity() {
        await this.quantityDecreaseButton.waitForExist();
        //await this.quantityDecreaseButton.scrollIntoView();
        await this.quantityDecreaseButton.click();
        await browser.pause(1000);
    }

    //async increaseQuantity() {
        //await this.quantityIncreaseButton.waitForExist();
        //await this.quantityIncreaseButton.scrollIntoView();
        //await this.quantityIncreaseButton.click();
        //await browser.pause(1000);
    //}

    async addToWishlist() {
        await this.wishlistButton.waitForExist();
        //await this.wishlistButton.scrollIntoView();
        await this.wishlistButton.click();
        await browser.pause(2000);
    }

    async getJudulProduk() {
        return await this.titleProduct.getText()
    }

    async getHargaProduk() {
        await this.hargaProduct.waitForExist()
        return await this.hargaProduct.getText()
    }

    async tambahKeKeranjang() {
        await this.tambahKeKeranjangButton.waitForExist();
        await this.tambahKeKeranjangButton.scrollIntoView();
        await this.tambahKeKeranjangButton.click()
        await browser.pause(2000)
    }

    async lihatKeranjang() {
        await this.lihatKeranjangButton.waitForExist()
        await this.lihatKeranjangButton.click()
        await browser.pause(2000)
    }

    async buttonlanjutBayar() {
        await this.lanjutBayarButton.waitForExist({ timeout: 20000 })
        await this.lanjutBayarButton.click()
        await browser.pause(2000)
    }
}

export default new InventoryPage()