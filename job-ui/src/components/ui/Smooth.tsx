"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SmoothImageProps = ImageProps & {
    wrapperClassName?: string;
};

export const SmoothImage = ({
    className,
    wrapperClassName,
    alt,
    onLoad,
    ...props
}: SmoothImageProps) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={cn("relative overflow-hidden", wrapperClassName)}>
            {isLoading && (
                <div className="absolute inset-0 animate-pulse bg-gray-200" />
            )}
            <Image
                className={cn(
                    "transition-opacity duration-700 ease-in-out",
                    isLoading ? "opacity-0" : "opacity-100",
                    className
                )}
                alt={alt}
                onLoad={(e) => {
                    setIsLoading(false);
                    onLoad?.(e);
                }}
                {...props}
            />
        </div>
    );
};