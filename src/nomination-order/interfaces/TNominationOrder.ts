export interface TNominationOrder {
  userId: number,
  userFrom: number,
  nominationId: number,
  textRu: string,
  textEn: string,
  public: boolean,
  isSelected: boolean,
  isNew: boolean,
}

export interface TNominationOrderBody {
  userId?: number,
  userFrom?: number,
  nominationId?: number,
  textRu?: string,
  textEn?: string,
  public?: boolean,
  isSelected?: boolean,
  isNew?: boolean,
}