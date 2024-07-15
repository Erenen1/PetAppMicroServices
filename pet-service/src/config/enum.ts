export const FILE_UPLOAD_SERVICES = {
    HOSTNAME: process.env.FILE_UPLOAD_SERVICE_HOST || 'http://file-upload-service',
    PORT: process.env.FILE_UPLOAD_SERVICE_PORT || 5001
}

export const USER_SERVICES = {
    HOSTNAME: process.env.USER_SERVICE_HOST || 'http://user-service',
    PORT: process.env.USER_SERVICE_PORT || 5000
}

export const POST_SERVICES = {
    HOSTNAME: process.env.POST_SERVICE_HOST || 'http://post-service',
    PORT: process.env.POST_SERVICE_PORT || 5002

}
