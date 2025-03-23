// Define TypeScript types
type NavigationItem = {
    name: string;
    href: string;
    hasDropdown?: boolean;
};

type NavigationData = {
    logo: {
        text: string;
        href: string;
    };
    menuItems: NavigationItem[];
    icons: {
        cart: {
            cartCount: number;
            icon: string,
            href: string,
        };
    };
};

export type NavbarProps = {
    navigation: NavigationData;
};
