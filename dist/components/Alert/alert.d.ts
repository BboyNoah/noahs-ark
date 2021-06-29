import React from 'react';
export interface BaseAlertProps {
    title: string;
    type?: 'success' | 'default' | 'danger' | 'warning';
    description?: string;
    closable?: boolean;
    style?: React.CSSProperties;
    onClose?: () => void;
}
export declare const Alert: React.FC<BaseAlertProps>;
export default Alert;
