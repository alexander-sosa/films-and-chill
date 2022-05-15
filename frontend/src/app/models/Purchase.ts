export interface Purchase{
    purchaseid: number,
    userid: number,
    totalcost: number,
    purchasedate: Date,
    address: string,
}

export interface PurchaseShow{
    purchaseid: number,
    user: string,
    totalcost: number,
    purchasedate: string,
    address: string,
}