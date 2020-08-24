export interface IDynamicDropdownProps {
    onSelect: (event: React.FormEvent<HTMLSelectElement>) => void;
    default: string
    values: Array<string | boolean | number>
}
