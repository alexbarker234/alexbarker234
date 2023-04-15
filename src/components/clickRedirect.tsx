import React from "react";

interface RedirectProp {
    link: string;
}

export const clickRedirect: React.FC<RedirectProp> = ({
    link,
}: RedirectProp) => {
    return <meta httpEquiv="refresh" content={`0; url=${link}`} />;
};
