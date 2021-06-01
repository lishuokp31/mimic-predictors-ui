export interface FavoritePayload {
  username : string;
  id : string;
  fav_type : string;
  remark : string;
  value: string;
}

export interface DeleteFavoritePayload{
  username : string;
  id : string;
}
