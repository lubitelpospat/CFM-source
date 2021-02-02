/// <reference types="react" />
export interface VideoThumbnailProps {
    /** URL source for thumbnail image. */
    thumbnailUrl: string;
    /** Length of video in seconds. */
    videoLength?: number;
    /** Custom ARIA label for play button.
     * @default 'Play video of length {human readable duration}'
     */
    accessibilityLabel?: string;
    /** Callback on click or keypress of thumbnail. Use to trigger render of the video player in your chosen format, for example within a modal or fullscreen container. */
    onClick(): void;
    /** Callback on mouse enter, focus, or touch start of thumbnail. Use to trigger video preload. */
    onBeforeStartPlaying?(): void;
}
export declare function VideoThumbnail({ thumbnailUrl, videoLength, accessibilityLabel, onClick, onBeforeStartPlaying, }: VideoThumbnailProps): JSX.Element;
