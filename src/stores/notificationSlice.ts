import { StateCreator } from "zustand";
import { FavoritesSliceType } from "./favoritesSlice";

type Notification = {
    text: string
    error: boolean
    show: boolean
}

export type NotificationSliceType = {
    notification: Notification,
    showNotification: (payload: Omit<Notification, "show">) => void
    hideNotification: () => void
}

export const createNotificationSlice: StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> = (set, get) => ({
    notification: {
        text: "",
        error: false,
        show: false
    },
    showNotification: (payload) => {
        set({
            notification: {
                ...payload,
                show: true
            }
        })
        setTimeout(() => {
            get().hideNotification()
        }, 3000)
    },
    hideNotification : () => {
        set({
            notification: {
                ...get().notification,
                show: false
            }
        })
        setTimeout(() => {
            set({
                notification : {
                    text: '',
                    error: false,
                    show: false
                }
            })
        }, 100)
    }
})