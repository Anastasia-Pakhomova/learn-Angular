export interface UserInterface {
    id: number
    firstName: string
    lastName: string
}

export interface UserInfo {
    login: string
    token: string
    email: string
}

export interface SavedUserInfo extends UserInfo{
  id: number
}
