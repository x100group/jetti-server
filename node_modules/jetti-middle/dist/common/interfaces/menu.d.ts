export interface MenuItems {
    type: string;
    icon: string;
    label: string;
    items?: MenuItem[];
    routerLink?: string[];
}
export interface MenuItem {
    type: string;
    description: string;
    icon: string;
    menu: string;
}
