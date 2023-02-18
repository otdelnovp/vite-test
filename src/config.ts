console.log(1111, import.meta.env);
export const Configuration = {
    API_URL: import.meta.env.API_URL || '',
    SIGN: import.meta.env.API_SIGN || '',
    FROM: import.meta.env.FROM || '',
    OSM_ROUTING: import.meta.env.OSM_ROUTING || '',
    OSM_API: 'http://router.project-osrm.org/',
    HIDE_MENU: import.meta.env.HIDE_MENU ? import.meta.env.HIDE_MENU.toLowerCase() === 'true' : false,
};
