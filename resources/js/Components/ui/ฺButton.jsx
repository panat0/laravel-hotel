// components/ui/button.jsx
import React from "react";

const buttonVariants = {
  default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90",
  outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
};

const Button = ({ type, children, className }) => {
    return (
        <button type={type} className={`${className} px-4 py-2 rounded-md`}>
            {children}
        </button>
    );
};

Button.displayName = "Button";

export { Button };
