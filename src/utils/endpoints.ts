export const EP = {
  // 日記一覧取得
  list_diaries: () => "/me/diaries",

  // 日記新規作成
  create_diary: () => "/me/diaries",

  // 日記取得（日付指定）
  get_diary: (date: string) => `/me/diaries/${date}`,

  // 日記更新（日付指定）
  update_diary: (date: string) => `/me/diaries/${date}`,

  // 日記削除（日付指定）
  delete_diary: (date: string) => `/me/diaries/${date}`,

  // 期間指定日記取得
  range_diaries: (start_date: string, end_date: string) => `/me/diaries/range?start_date=${start_date}&end_date=${end_date}`,

  // ゲストログイン
  guest_login: () => "guest-login",

  // トークンリフレッシュ
  refresh_token: () => "refresh-token",
};