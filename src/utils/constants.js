export const LOGO = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR = "https://cdn-icons-png.flaticon.com/512/5951/5951752.png";

export const API_OPTIONS = {
    method: 'GET',
    headers: {
        Authorization: 'Bearer '+ process.env.REACT_APP_TMDB_KEY,
        accept: 'application/json'
    },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const BG_URL ="https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web/IN-en-20250421-TRIFECTA-perspective_dc5bcfdf-88a5-4972-8ffe-b28ff942f76e_large.jpg";

export const SUPPORTED_LANGUAGES = [
    { identifier: "en", name:"English"},
    { identifier: "hindi", name:"Hindi"},
    { identifier: "kannada", name:"Kannada"}
]

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
