export interface TNominationOrder {
  userId: number,
  userFrom: number,
  nominationId: number,
  textRu: string,
  textEn: string,
  public: boolean,
  isSelected: boolean,
  isNew: boolean,
  step2: boolean,
  step3: boolean,
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
  step2?: boolean,
  step3?: boolean,
}
