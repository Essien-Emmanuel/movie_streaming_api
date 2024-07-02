export const OTPStatus = {
    PENDING: 'pending',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired'
} as const;

export type OTPStatusType = (typeof OTPStatus)[keyof typeof OTPStatus];