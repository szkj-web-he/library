const getLanguageByGeolocation = () => {
    return new Promise<"cn" | "en" | null>((resolve, reject) => {
        const status = 0;
        const geolocation = window.navigator.geolocation;
        if (!geolocation) {
            reject(null);
        }

        window.addEventListener(
            "load",
            () => {
                if (status === 0) {
                    resolve(getLanguageByBrowser());
                } else {
                    reject(null);
                }
            },
            {
                once: true,
            },
        );
    });
};

const getLanguageByBrowser = (): "cn" | "en" => {
    const languageAndArea = window.navigator.language;
    const language = languageAndArea.split("-")[0];
    switch (language) {
        case "zh":
            return "cn";
        case "en":
            return "en";
        default:
            return "en";
    }
};

export const getLanguage = () => {
    return getLanguageByGeolocation();
};
