import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useBoardStore = create(
  persist(
    (set) => ({
      // 보드의 배열 저장, 초기값은 빈 배열
      data: [],

      // Add
      addBoard: (board) => {
        set((state) => ({ data: [...state.data, board] }));
      },

      // Remove
      removeBoard: (boardId) => {
        set((state) => ({
          data: state.data.filter((board) => board.id !== boardId),
        }));
      },

      // Update
      updateBoard: (update) => {
        set((state) => ({
          data: state.data.map((board) => (board.id === update.id ? { ...board, ...update } : board)),
        }));
      },
    }),

    // localStorage
    {
      name: 'board-storage', // localStorage의 key 값
      storage: createJSONStorage(() => localStorage),
    }
  )
);
