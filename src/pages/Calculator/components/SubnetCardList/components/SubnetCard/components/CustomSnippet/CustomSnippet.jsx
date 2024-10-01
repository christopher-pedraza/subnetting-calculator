import { Snippet } from "@nextui-org/react";

export default function CustomSnippet({ children }) {
    return (
        <Snippet size="sm" hideSymbol variant="bordered">
            {children}
        </Snippet>
    );
}
