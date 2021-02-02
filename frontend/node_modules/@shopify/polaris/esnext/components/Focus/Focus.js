import React, { memo, useEffect } from 'react';
import { focusFirstFocusableNode } from '@shopify/javascript-utilities/focus';
export const Focus = memo(function Focus({ children, disabled, root, }) {
    useEffect(() => {
        if (disabled || !root) {
            return;
        }
        const node = isRef(root) ? root.current : root;
        if (!node || node.querySelector('[autofocus]')) {
            return;
        }
        focusFirstFocusableNode(node, false);
    }, [disabled, root]);
    return <React.Fragment>{children}</React.Fragment>;
});
function isRef(ref) {
    return ref.current !== undefined;
}
