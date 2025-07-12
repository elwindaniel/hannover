import axiosInstance from "./axios";

export function createEventUser(body) {
    return axiosInstance.post(`event-user`, body)
}
export function createEventUserCart(body) {
    return axiosInstance.post(`cart`, body)
}
export function getCartByUserId(body) {
    return axiosInstance.get(`cart/${body}`, )
}
export function getTicketByUserId(body) {
    return axiosInstance.get(`ticket/${body}`, )
}
export function getAllTicketByUserId(body) {
    return axiosInstance.get(`tickets/${body}`, )
}
export function getEventPricing() {
    return axiosInstance.get(`price-group`)
}
export function buyEventTicket(body) {
    return axiosInstance.post(`ticket`,body)
}
export function updateTicketPayment(id,body) {
    return axiosInstance.put(`ticket/${id}`,body )
}