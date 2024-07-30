/**
 * @file progress util
 * @date 2022-05-05
 * @author mingzhou.zhang
 * @lastModify  2022-05-05
 */

/**
 * Verify valid progress value
 * @param progress {number} progress value
 */
export function validProgress(progress: number | undefined) {
    if (!progress || progress < 0) {
        return 0;
    }
    if (progress > 100) {
        return 100;
    }
    return progress;
}
