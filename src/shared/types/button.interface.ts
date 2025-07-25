export interface BaseButton {
    label: string;
    type?: 'primary' | 'secondary' | 'danger' | "movies"
    disabled?: boolean
    onClick?: () => void;
    asLink?: boolean
    href?: string

}