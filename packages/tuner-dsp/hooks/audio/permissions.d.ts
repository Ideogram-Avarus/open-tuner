export declare const usePermissions: () => {
    hasPermission: boolean;
    requestMicPermission: () => Promise<boolean>;
};
