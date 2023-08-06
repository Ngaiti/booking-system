import { useContext, createContext, useEffect, useState } from "react";

const TwitchAuthContext = createContext(null);

export function TwitchAuth() {
    return useContext(TwitchAuthContext);
}

export function TwitchAuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const fetchAccessToken = async () => {
            const clientId = 'uhzvimbnutu8x6ccq3tbpgkvo61b17';
            const clientSecret = 'esbtjtpsq2ajxc8iihn14bxliuddw5';
            const grantType = 'client_credentials';

            try {
                const response = await fetch(
                    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`,
                    {
                        method: 'POST'
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setAccessToken(data.access_token);
                } else {
                    console.error('Error fetching access token:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching access token:', error);
            }
        };

        fetchAccessToken();
    }, []);

    return (
        <TwitchAuthContext.Provider value={accessToken}>
            {children}
        </TwitchAuthContext.Provider>
    );
}