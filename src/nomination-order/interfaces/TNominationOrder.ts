export interface TNominationOrder {
  userId: number,
  userFromId: number,
  nominationId: number,
  textRu: string,
  textEn: string,
  public: boolean,
}

export interface TNominationOrderBody {
  userId?: number,
  userFromId?: number,
  nominationId?: number,
  textRu?: string,
  textEn?: string,
  public?: boolean,
}