import React from 'react';

type SgdsEl = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'sgds-masthead': SgdsEl & { fluid?: boolean };
      'sgds-mainnav': SgdsEl & { fluid?: boolean; brandHref?: string; expand?: string };
      'sgds-mainnav-item': SgdsEl & { active?: boolean; disabled?: boolean; slot?: string };
      'sgds-mainnav-dropdown': SgdsEl & { active?: boolean; slot?: string };
      'sgds-dropdown-item': SgdsEl & { slot?: string };
      'sgds-footer': SgdsEl & { fluid?: boolean };
      'sgds-button': SgdsEl & {
        variant?: string;
        size?: string;
        type?: string;
        disabled?: boolean;
        form?: string;
        href?: string;
        slot?: string;
        tone?: string;
      };
      'sgds-icon-button': SgdsEl & {
        name?: string;
        variant?: string;
        size?: string;
        tone?: string;
        slot?: string;
      };
      'sgds-badge': SgdsEl & { variant?: string };
      'sgds-card': SgdsEl & {
        orientation?: string;
        stretchedLink?: boolean;
        disabled?: boolean;
        hideBorder?: boolean;
        tinted?: boolean;
        imageAdjustment?: string;
      };
      'sgds-icon': SgdsEl & { name?: string; size?: string; slot?: string };
      'sgds-link': SgdsEl & { slot?: string };
      'sgds-input': SgdsEl & {
        label?: string;
        name?: string;
        type?: string;
        placeholder?: string;
        required?: boolean;
        hasFeedback?: boolean;
        hint?: string;
        value?: string;
        disabled?: boolean;
        readonly?: boolean;
        slot?: string;
        class?: string;
      };
      'sgds-select': SgdsEl & {
        label?: string;
        name?: string;
        placeholder?: string;
        required?: boolean;
        hasFeedback?: boolean;
        hint?: string;
        disabled?: boolean;
        class?: string;
        slot?: string;
        onSgdsChange?: (e: Event) => void;
      };
      'sgds-select-option': SgdsEl & { value?: string; disabled?: boolean };
      'sgds-textarea': SgdsEl & {
        label?: string;
        name?: string;
        rows?: string | number;
        maxlength?: string | number;
        characterCount?: boolean;
        hint?: string;
        required?: boolean;
        hasFeedback?: boolean;
        placeholder?: string;
        class?: string;
      };
      'sgds-pagination': SgdsEl & {
        dataLength?: string | number;
        itemsPerPage?: string | number;
        currentPage?: string | number;
        limit?: string | number;
      };
      'sgds-alert': SgdsEl & { variant?: string; dismissible?: boolean; show?: boolean };
      'sgds-divider': SgdsEl;
      'sgds-breadcrumb': SgdsEl;
      'sgds-breadcrumb-item': SgdsEl & { href?: string };
      'sgds-spinner': SgdsEl & { size?: string };
      'sgds-checkbox': SgdsEl & {
        label?: string;
        name?: string;
        value?: string;
        checked?: boolean;
        disabled?: boolean;
      };
      'sgds-radio': SgdsEl & {
        label?: string;
        name?: string;
        value?: string;
        checked?: boolean;
        disabled?: boolean;
      };
      'sgds-modal': SgdsEl & { size?: string };
    }
  }
}
