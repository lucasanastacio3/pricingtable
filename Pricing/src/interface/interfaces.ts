export interface GetPlan {
    plan: {
        id: number;
        name: string;
        description: string;
        price: string;
        order: number;
        created_at: Date;
        features: [
      { 
        id: number;
        planId: number;
        description: string;
        order: number;
        created_at: Date;
      }
    ]
  }
}
