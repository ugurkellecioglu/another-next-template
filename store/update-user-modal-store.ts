import { create } from "zustand"

interface User {
  createdAt: string
  name: string
  avatar: string
  id: string
}

interface IUpdateUserModalStore {
  isUpdateUserModalOpen: boolean
  isDeleteUserModalOpen: boolean
  selectedUser: User | null
  setSelectedUser: (user: User) => void
  setIsUpdateUserModalOpen: (isOpen: boolean) => void
  setIsDeleteUserModalOpen: (isOpen: boolean) => void
}

export const useUpdateUserModalStore = create<IUpdateUserModalStore>((set) => ({
  isUpdateUserModalOpen: false,
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  setIsUpdateUserModalOpen: (isOpen) => set({ isUpdateUserModalOpen: isOpen }),

  isDeleteUserModalOpen: false,
  setIsDeleteUserModalOpen: (isOpen) => set({ isDeleteUserModalOpen: isOpen }),
}))
