export interface VerifyRes {
    name: string;
    greetingMsg: string;
}

export interface AccountRes {
    accounts: Account[];
    totalBalance: number;
  }
  
export interface Account {
    accountId: string;
    type: string;
    currency: string;
    accountNumber: string;
    issuer: string;
    amount: number;
    color: string;
    isMainAccount: boolean;
    progress: number;
    flags: Flag[];
}

export interface Flag {
    flagId: number;
    flagType: string;
    flagValue: string;
}

export interface CardRes{
    cardId: string;
    userId: string;
    name: string;
    issuer: string;
    number: string;
    status: string;
    color: string;
    borderColor: string;
}