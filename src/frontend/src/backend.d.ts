import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface Order {
    id: string;
    status: string;
    userId: string;
    downloadCount: bigint;
    amount: bigint;
    eBookId: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ContactFormSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface eBook {
    id: string;
    title: string;
    pdfFile?: ExternalBlob;
    description: string;
    coverImage?: ExternalBlob;
    price: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addOrUpdateeBook(id: string, title: string, description: string, price: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkAdminStatus(): Promise<boolean>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(id: string, userId: string, eBookId: string, amount: bigint): Promise<void>;
    deleteContactSubmission(id: bigint): Promise<void>;
    getAllContactSubmissions(): Promise<Array<ContactFormSubmission>>;
    getAllNewsletterEmails(): Promise<Array<string>>;
    getAllOrders(): Promise<Array<Order>>;
    getAlleBooks(): Promise<Array<eBook>>;
    getBusinessEmail(): Promise<string>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactSubmissionsByEmail(email: string): Promise<Array<ContactFormSubmission>>;
    getOrder(id: string): Promise<Order | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    geteBook(id: string): Promise<eBook | null>;
    grantAdminRole(newAdmin: Principal): Promise<void>;
    grantUserRole(user: Principal): Promise<void>;
    incrementDownloadCount(orderId: string): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    submitNewsletter(email: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateBusinessEmail(email: string): Promise<void>;
    updateOrderStatus(id: string, status: string): Promise<void>;
    updateseBookAsset(id: string, assetType: string, blob: ExternalBlob): Promise<void>;
}
