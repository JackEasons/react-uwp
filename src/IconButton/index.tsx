import * as React from "react";
import * as PropTypes from "prop-types";

import RevealEffect, { RevealEffectProps } from "../RevealEffect";
import Icon from "../Icon";

export interface DataProps {
  /**
   * The IconButton `onMouseEnter` will applied to `rootElm.style`.
   */
  hoverStyle?: React.CSSProperties;
  /**
   * The IconButton `onMouseDown` will applied to `rootElm.style`.
   */
  activeStyle?: React.CSSProperties;
  /**
   * The control IconButton size.
   */
  size?: number;
  /**
   * The control IconButton disabled.
   */
  disabled?: boolean;
  /**
   * Set RevealEffect, check the styles/reveal-effect.
   */
  revealConfig?: RevealEffectProps;
}

export interface IconButtonProps extends DataProps, React.HTMLAttributes<HTMLButtonElement> {}

export class IconButton extends React.Component<IconButtonProps> {
  static defaultProps: IconButtonProps = {
    size: 48,
    revealConfig: {
      effectEnable: "disabled"
    }
  };
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const {
      style,
      hoverStyle,
      activeStyle,
      children,
      size,
      disabled,
      revealConfig,
      ...attributes
    } = this.props;
    const { theme } = this.context;

    return (
      <Icon
        {...attributes}
        style={{
          position: "relative",
          display: "inline-block",
          fontFamily: theme.fonts.segoeMDL2Assets,
          verticalAlign: "middle",
          textAlign: "center",
          userSelect: "none",
          background: disabled ? theme.baseLow : "none",
          border: "none",
          outline: "none",
          fontSize: size / 2,
          width: size,
          height: size,
          cursor: "pointer",
          color: disabled ? theme.baseMedium : theme.baseHigh,
          padding: 0,
          flexShrink: 0,
          lineHeight: `${size}px`,
          transition: "background .25s ease-in-out",
          ...style
        }}
        hoverStyle={disabled ? void 0 : hoverStyle || {
          background: theme.listLow
        }}
        activeStyle={
          disabled ? void 0 : activeStyle || {
            background: theme.baseLow
          }
        }
      >
        {children}
        <RevealEffect {...revealConfig} />
      </Icon>
    );
  }
}

export default IconButton;
