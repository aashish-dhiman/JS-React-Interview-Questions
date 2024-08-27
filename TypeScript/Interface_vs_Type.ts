// Interface vs Type in TypeScript

// 1. Interfaces
// Interfaces are a way to define the structure of an object. They are primarily used to define the shape of an object.

interface User {
    id: number;
    name: string;
    email: string;
}

const user: User = {
    id: 1,
    name: "Aashish Dhiman",
    email: "aashishdhiman88@gmail.com",
};

// Extending Interfaces
interface Admin extends User {
    role: string;
}

const admin: Admin = {
    id: 1,
    name: "Prashant",
    email: "prashant@gmail.com",
    role: "superadmin",
};

// 2. Type Aliases
// Type allows you to create a new name for any type, including primitive types, union types, tuples, and more complex objects.

type UserType = {
    id: number;
    name: string;
    email: string;
};

type AdminType = UserType & {
    role: string;
};

const adminType: AdminType = {
    id: 1,
    name: "Prashant",
    email: "prashant@gmail.com",
    role: "superadmin",
};

// Differences Between Interface and Type
// 1. Extending:
// Interface: Can be extended using 'extends'.
// Type: Can be extended using intersections ('&').

// 2. Merging:
// Interface: Can be merged with the same name, meaning you can declare an interface multiple times, and TypeScript will combine them.
// Type: Cannot be merged. Declaring a 'type' with the same name will result in an error.

// Interface merging
interface UserMerge {
    id: number;
}

interface UserMerge {
    name: string;
}

const userMerge: UserMerge = {
    id: 1,
    name: "Aashish Dhiman",
};

// Type alias won't merge
type UserTypeMerge = {
    id: number;
};

type UserTypeMerge = {
    name: string;
}; // Error: Duplicate identifier 'UserTypeMerge'.

// Use Cases
// Interface: Best used when you need to define the shape of an object that will be used throughout your codebase.
// Type: Best used for defining more complex types, such as unions or tuples.

// Real-Case Scenario in a Codebase
// Scenario: A large codebase with a combination of object-oriented and functional programming paradigms.

// Use `interface`
interface Product {
    id: number;
    name: string;
    price: number;
}

interface DiscountedProduct extends Product {
    discountPercentage: number;
}

// Use `type`
type ApiResponse<T> = {
    status: "success" | "error";
    data?: T;
    error?: string;
};

type ProductResponse = ApiResponse<Product>;
