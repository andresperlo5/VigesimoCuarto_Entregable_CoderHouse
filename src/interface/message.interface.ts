export interface Message {
    readonly author: {
        id: string,
        name: String,
        lastname: string,
        age: number,
        alias: string,
        avatar: string,
    },
    readonly text: string
}
