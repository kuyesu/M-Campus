import React, { useCallback, useContext, useEffect, useState } from "react";
import Storage from "@react-native-async-storage/async-storage";

import {
  IArticle,
  ICategory,
  IProduct,
  IUser,
  IUseData,
  ITheme,
} from "../constants/types";

export const DataContext = React.createContext({});

export const useData = () => useContext(DataContext) as IUseData;
