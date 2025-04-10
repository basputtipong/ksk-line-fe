export interface CardRes {
    cards: Card[]
}
export interface Card{
    cardId: string;
    userId: string;
    name: string;
    issuer: string;
    number: string;
    status: string;
    color: string;
    borderColor: string;
}