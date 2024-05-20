export interface Database {
    tracking: Tracking[]
}

export interface Tracking {
    user: number;
    event: string;
  };