export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenReq {
  code: string;
  client_id: string;
  client_secret: string;
}