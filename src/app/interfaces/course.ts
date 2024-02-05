export interface CourseInterface {
    id: number
    title: string
    dateCreation: Date
    duration: number
    description: string
    topRated: boolean
}

export interface IBreadcrumbsItems {
    icon?: string
    text: string
    link?: string 
}
