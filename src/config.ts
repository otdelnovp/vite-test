export const Configuration = {
    API_URL: import.meta.env.VITE_API_URL || '',
    SIGN: import.meta.env.VITE_API_SIGN || '',
    FROM: import.meta.env.VITE_FROM || '',
    OSM_ROUTING: import.meta.env.OSM_ROUTING || '',
    OSM_API: 'http://router.project-osrm.org/',
    HIDE_MENU: import.meta.env.VITE_HIDE_MENU ? import.meta.env.VITE_HIDE_MENU.toLowerCase() === 'true' : false,
};
