export interface VerseDefinition {
    ref: string
    text: string
}

export interface StationDefinition {
    number: number
    name: string
    name_kanji: string
    description?: string
    song?: string
    verses?: VerseDefinition[]
    prayer_points?: string[]
}
