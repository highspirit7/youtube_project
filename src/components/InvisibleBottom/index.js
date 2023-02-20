import React, { forwardRef } from "react";

import "./invisibleBottom.scss";

const InvisibleBottom = forwardRef((props, ref) => (
  <div className="invisible-bottom" ref={ref}></div>
));

InvisibleBottom.displayName = "InvisibleBottom";

export default InvisibleBottom;
