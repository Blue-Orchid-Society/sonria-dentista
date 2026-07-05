"use client";

import { useRef } from "react";
import type { FormHTMLAttributes, ReactNode } from "react";

type ToolAutoSubmitFormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
};

export function ToolAutoSubmitForm({ children, onChange, ...props }: ToolAutoSubmitFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      onChange={(event) => {
        onChange?.(event);
        window.clearTimeout(Number(formRef.current?.dataset.submitTimer ?? 0));
        const timer = window.setTimeout(() => {
          formRef.current?.requestSubmit();
        }, 120);
        if (formRef.current) formRef.current.dataset.submitTimer = String(timer);
      }}
      {...props}
    >
      {children}
    </form>
  );
}
