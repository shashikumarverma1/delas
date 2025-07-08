import { is } from './../node_modules/acorn/dist/acorn.d';
import { create } from 'zustand';

// 1️⃣ Define type for a single item
export interface FormData {
  title: string;
  description: string;
  priority: string;
   dueDate: string;
   isCompleted?: boolean; // Optional property to track completion status
  
}

// 2️⃣ Define type for the Zustand store
interface FormStore {
  dataList: FormData[];
  addData: (data: FormData) => void;
  removeData: (index: number) => void;
  clearData: () => void;
  editData:(index: number, newData: FormData) => void;
}

// 3️⃣ Create the store
const useFormStore = create<FormStore>((set) => ({
  dataList: [],

  addData: (data) =>
    set((state) => ({
      dataList: [data , ...state.dataList],
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
}));

export default useFormStore;
