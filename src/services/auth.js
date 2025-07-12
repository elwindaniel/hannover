import axiosInstance from "./axios";

export function adminTickets() {
    return axiosInstance.get(`admin-tickets` )
}
export function updateTicketPaymentWithTicketNoAdmin(body) {
    return axiosInstance.post(`admin-tickets`, body)
}
export function deleteTicketByTicketNo(body) {
    return axiosInstance.delete(`ticket/${body}`)
}
export function getUsers() {
    return axiosInstance.get(`event-user`)
}