export interface crypto {
    coin : coin[],
    price_coin?: price_coin[]
}

type coin = {
    id: number,
    name: string,
    price_now: number,
    realise_date: string
}

type price_coin = {
    id: number,
    coin_id: number,
    price_now: number,
    date: string
}