export const FILE_UPLOAD_SERVICES = {
    HOSTNAME: process.env.FILE_UPLOAD_SERVICES_HOST || 'http://file-upload-service:5001',
    PORT: process.env.FILE_UPLOAD_SERVICES_PORT || 5001
}

export const USER_SERVICES = {
    HOSTNAME: process.env.USER_SERVICES_HOST || 'http://user-service:5000',
    PORT: process.env.USER_SERVICES_PORT || 5000
}