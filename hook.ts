// hooks.ts
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../utils/redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
