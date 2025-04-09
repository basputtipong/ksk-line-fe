export interface VerifyRes {
    name: string;
    greetingMsg: string;
}

export interface AccountRes {
    accounts: Account[];
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