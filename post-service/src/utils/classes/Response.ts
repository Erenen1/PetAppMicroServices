class Response {
    constructor() { }
    successResponse(data?: any, message?: string) {
        if (data && !message) {
            return {
                success: true,
                data
            }
        }
        else if (message && !data) {
            return {
                success: true,
                message
            }
        }
        else if (!data && !message) {    // Dipnot: sadece message göndermek istediginde ilk elemanı null ya da undefined gönderirsen onu jsona eklemez...
            return {
                success: true
            }
        }
        return {
            success: true,
            message,
            data
        }

    }
    errorResponse(error: any) {
        return {
            success: false,
            error: {
                message: error.message,
                description: error.description
            }
        }
    }
}

export default new Response();