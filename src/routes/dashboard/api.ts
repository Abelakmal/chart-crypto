import type { coin, crypto } from "./type";

/**
 * url api untuk data crypto
 * @type {string}
 */
const api_url:string  = 'http://localhost:3000/api/crypto'



/**
 * mengambil data semua coin dari api 
 * @returns {Promise<coin[] |undefined>}
 */
export const getAllCoin = async ():Promise<crypto | undefined> => {
    try {
        const crypto_result = await fetch(api_url + '/coin');
        const crypto = await crypto_result.json();

        return crypto
    } catch (error) {
        console.log(error);
    }
}


/**
 * mengambil data crypto berdasarkan params id
 * @returns {Promise<crypto |undefined>}
 */
export const getCryptoById = async (id:number):Promise<crypto | undefined> => {
    try {
        const crypto_result = await fetch(api_url +'/price/' + id);
        const crypto = await crypto_result.json();

        return crypto
    } catch (error) {
        console.error(error)
    }
}

/**
 * menambahkan data ke table price_coin.
 * dengan price_now diambil dengan nilai acak  Math.Random() range 1 - 1000.
 * dengan data state antara buy atau sell.
 * dengan coin_id berdasarkan yg ada di table coin
 * @param state 
 * @returns {Promise<void>}
 */
export const addCrypto = async (state:string,id: number) => {
    try {

        const crypto_result = await fetch(api_url + '/price', {
            method: "POST",
            headers : {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                price_now: Math.floor(Math.random() * 1001),
                coin_id: id,
                state
            })
        });
        await crypto_result.json();
    } catch (error) {
        console.error(error)
    }
}