/// <reference types="react" />
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'danger' | 'warning';
export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps;
}
export declare const Icon: React.FC<IconProps>;
export default Icon;