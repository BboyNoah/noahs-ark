import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'danger' |'warning'

export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps;
}

export const Icon: React.FC<IconProps> = (props) => {
    const { theme, className, ...restProps } = props
    const classes = classNames('ark-icon', className, {
        [`icon-${theme}`]: theme
    })

    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}

export default Icon