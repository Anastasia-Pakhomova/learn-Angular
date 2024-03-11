export interface CourseInterface {
    id: number
    title: string
    dateCreation: Date
    duration: number
    description: string
    topRated: boolean
    authors: IAuthor[]
}

export interface IBreadcrumbsItems {
    icon?: string
    text: string
    link?: string
}

export interface IAuthor {
    id: number
    name: string
}
