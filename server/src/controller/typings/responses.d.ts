export type ErrorResponse = {
  errors: string[];
};

export type IndexResponse<TData> = {
  data: TData[];
};

export type CreateResponse<TData> =
  | {
      data: TData;
    }
  | ErrorResponse;

export type UpdateResponse<TData> =
  | {
      data: TData;
    }
  | ErrorResponse;

export type DeleteResponse =
  | {
      success: boolean;
    }
  | ErrorResponse;
