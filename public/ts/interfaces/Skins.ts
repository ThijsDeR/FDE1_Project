interface Skins {
    bicycleSkin: BicycleSkin
    staminaSkin: StaminaSkin
}

interface BicycleSkin {
    id: string
    name: string,
    src: string,
}

interface StaminaSkin {
    id: string
    name: string,
    src: string,
    baseStamina: string
}