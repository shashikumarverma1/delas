import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FormData {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  isCompleted?: boolean;
}

interface FormStore {
  dataList: FormData[];
  addData: (data: FormData) => void;
  removeData: (index: number) => void;
  clearData: () => void;
  editData: (index: number, newData: FormData) => void;
  toggleCompleted: (index: number) => void;
}

const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      dataList: [],

      addData: (data) =>
        set((state) => ({
          dataList: [data, ...state.dataList],
        })),

      removeData: (index) =>
        set((state) => ({
          dataList: state.dataList.filter((_, i) => i !== index),
        })),

      clearData: () => set({ dataList: [] }),

      editData: (index, newData) =>
        set((state) => {
          const updated = [...state.dataList];
          updated[index] = newData;
          return { dataList: updated };
        }),

      toggleCompleted: (index) =>
        set((state) => {
          const updated = [...state.dataList];
          updated[index].isCompleted = !updated[index].isCompleted;
          return { dataList: updated };
        }),
    }),
    {
      name: 'form-store',         
      storage: AsyncStorage,    
      version: 1,                 
    }
  )
);

export default useFormStore;
