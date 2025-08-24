'use client'

import { type HTMLAttributes } from "react";
import { spotifyURLs } from "@/utils/constants";

interface SpotifyProps extends HTMLAttributes<HTMLIFrameElement> {
    [key: string]: any
    link: string
    width?: number | string
    height?: number | string
    frameBorder?: number | string
    allow?: string
}

const Spotify = ({
    link,
    style = {},
    wide = false,
    width = "100%",
    height = 80,
    frameBorder = 0,
    allow = "encrypted-media",
    ...props
}: SpotifyProps) => {
    const url = new URL(link);
    url.pathname = url.pathname.replace(/\/intl-\w+\//, "/");
    return (
        <iframe
            title="Spotify Web Player"
            src={`https://open.spotify.com/embed${url.pathname}`}
            width={width}
            height={height}
            allow={allow}
            style={{
                border: "none",
                backgroundColor: "transparent",
                borderRadius: 15,
                ...style
            }}
            {...props}
        />
    );
};

export const SpotifyEmbed = () => {

    const currentLink = spotifyURLs[Math.floor(Math.random() * spotifyURLs.length)];

    return (
        <Spotify wide link={currentLink} />
    );
}